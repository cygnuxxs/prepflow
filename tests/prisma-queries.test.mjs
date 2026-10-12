import "dotenv/config";
import assert from "node:assert/strict";
import { after, before, describe, test } from "node:test";
import pg from "pg";

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;
assert.ok(connectionString, "DATABASE_URL is not set");

const pool = new Pool({
  connectionString,
  connectionTimeoutMillis: 10_000,
  max: 10,
  ssl: { rejectUnauthorized: false },
});

const count = async (table) => {
  const result = await pool.query(`SELECT COUNT(*)::int AS count FROM "${table}"`);
  return result.rows[0].count;
};

describe("database read queries", { concurrency: false }, () => {
  before(() => pool.query("SELECT 1"));
  after(() => pool.end().catch(() => {}));

  test("executes a read-only transaction", async () => {
    const transactionClient = await pool.connect();
    try {
      await transactionClient.query("BEGIN READ ONLY");
      const result = await transactionClient.query(
        "SELECT current_database() AS database, NOW() AS current_time",
      );
      assert.ok(result.rows[0].database);
      assert.ok(result.rows[0].current_time);
    } finally {
      await transactionClient.query("ROLLBACK");
      transactionClient.release();
    }
  });

  test("counts every application table", async () => {
    const tables = [
      "user",
      "session",
      "account",
      "verification",
      "SimilarProblem",
      "ProblemTopic",
      "ProblemCompany",
      "ProblemMainTopic",
      "UserProgress",
      "Sheets",
      "SheetCategory",
      "Problem",
      "Jobs",
      "internships",
      "Roadmap",
      "Node",
      "Edge",
    ];

    const counts = await Promise.all(tables.map(async (table) => [table, await count(table)]));
    for (const [table, value] of counts) {
      assert.equal(typeof value, "number", `${table} count should be numeric`);
      assert.ok(value >= 0, `${table} count should not be negative`);
    }
  });

  test("reads users and their authentication relationships", async () => {
    const result = await pool.query(`
      SELECT u.id, u.email, u.role,
        (SELECT COUNT(*) FROM "account" a WHERE a."userId" = u.id)::int AS accounts,
        (SELECT COUNT(*) FROM "session" s WHERE s."userId" = u.id)::int AS sessions,
        (SELECT COUNT(*) FROM "UserProgress" p WHERE p."userId" = u.id)::int AS progress
      FROM "user" u
      ORDER BY u."createdAt" DESC
      LIMIT 20
    `);

    for (const row of result.rows) {
      assert.ok(row.id);
      assert.ok(row.email);
      assert.ok(["USER", "ADMIN"].includes(row.role));
      assert.ok(row.accounts >= 0 && row.sessions >= 0 && row.progress >= 0);
    }
  });

  test("reads auth token tables", async () => {
    const [sessions, accounts, verifications] = await Promise.all([
      pool.query('SELECT id, "userId", "expiresAt" FROM "session" LIMIT 20'),
      pool.query('SELECT id, "userId", "providerId" FROM "account" LIMIT 20'),
      pool.query('SELECT id, identifier, "expiresAt" FROM "verification" LIMIT 20'),
    ]);

    assert.ok(Array.isArray(sessions.rows));
    assert.ok(Array.isArray(accounts.rows));
    assert.ok(Array.isArray(verifications.rows));
  });

  test("filters and aggregates problems", async () => {
    const [difficulty, search, aggregate] = await Promise.all([
      pool.query(`
        SELECT difficulty, COUNT(*)::int AS count
        FROM "Problem"
        GROUP BY difficulty
        ORDER BY difficulty
      `),
      pool.query(`
        SELECT id, title, slug
        FROM "Problem"
        WHERE title ILIKE $1 OR slug ILIKE $1
        ORDER BY id
        LIMIT 20
      `, ["%array%"]),
      pool.query(`
        SELECT COUNT(*)::int AS count, COALESCE(AVG("acceptanceRate"), 0) AS average_acceptance
        FROM "Problem"
        WHERE "acceptanceRate" >= 0
      `),
    ]);

    assert.ok(Array.isArray(difficulty.rows));
    assert.ok(Array.isArray(search.rows));
    assert.ok(aggregate.rows[0].count >= 0);
    assert.ok(Number(aggregate.rows[0].average_acceptance) >= 0);
  });

  test("joins problems to topics, companies, and progress", async () => {
    const result = await pool.query(`
      SELECT p.id, p.title, p.slug, p.difficulty, p.platform,
        COUNT(DISTINCT pt."B")::int AS topic_count,
        COUNT(DISTINCT pc."B")::int AS company_count,
        COUNT(DISTINCT up.id)::int AS progress_count
      FROM "Problem" p
      LEFT JOIN "_ProblemTopicProblems" pt ON pt."A" = p.id
      LEFT JOIN "_ProblemCompanyProblems" pc ON pc."A" = p.id
      LEFT JOIN "UserProgress" up ON up."problemId" = p.id
      GROUP BY p.id
      ORDER BY p.id
      LIMIT 20
    `);

    for (const row of result.rows) {
      assert.ok(row.id > 0);
      assert.ok(row.title);
      assert.ok(row.slug);
      assert.ok(row.topic_count >= 0);
      assert.ok(row.company_count >= 0);
      assert.ok(row.progress_count >= 0);
    }
  });

  test("reads taxonomy and sheet relationships", async () => {
    const [topics, companies, mainTopics, sheets] = await Promise.all([
      pool.query(`
        SELECT t.id, t.name, COUNT(j."B")::int AS problem_count
        FROM "ProblemTopic" t
        LEFT JOIN "_ProblemTopicProblems" j ON j."A" = t.id
        GROUP BY t.id
        LIMIT 20
      `),
      pool.query(`
        SELECT c.id, c.name, c.slug, COUNT(j."B")::int AS problem_count
        FROM "ProblemCompany" c
        LEFT JOIN "_ProblemCompanyProblems" j ON j."A" = c.id
        GROUP BY c.id
        LIMIT 20
      `),
      pool.query(`
        SELECT t.id, t.name, COUNT(j."B")::int AS problem_count
        FROM "ProblemMainTopic" t
        LEFT JOIN "_ProblemMainTopicProblems" j ON j."A" = t.id
        GROUP BY t.id
        LIMIT 20
      `),
      pool.query(`
        SELECT s.id, s.name, COUNT(sc.id)::int AS category_count
        FROM "Sheets" s
        LEFT JOIN "SheetCategory" sc ON sc."sheetId" = s.id
        GROUP BY s.id
        ORDER BY s.id
        LIMIT 20
      `),
    ]);

    for (const collection of [topics, companies, mainTopics, sheets]) {
      assert.ok(Array.isArray(collection.rows));
      for (const row of collection.rows) {
        assert.ok(row.id > 0);
      }
    }
  });

  test("reads sheet categories and linked problems", async () => {
    const result = await pool.query(`
      SELECT sc.id, sc.name, sc.slug, s.name AS sheet_name,
        COUNT(j."B")::int AS problem_count
      FROM "SheetCategory" sc
      JOIN "Sheets" s ON s.id = sc."sheetId"
      LEFT JOIN "_SheetCategoryProblems" j ON j."A" = sc.id
      GROUP BY sc.id, s.name
      ORDER BY sc.id
      LIMIT 20
    `);

    for (const row of result.rows) {
      assert.ok(row.id > 0);
      assert.ok(row.sheet_name);
      assert.ok(row.problem_count >= 0);
    }
  });

  test("reads user progress with user and problem details", async () => {
    const result = await pool.query(`
      SELECT up.id, up."isCompleted", u.id AS user_id,
        p.id AS problem_id, p.title
      FROM "UserProgress" up
      JOIN "user" u ON u.id = up."userId"
      JOIN "Problem" p ON p.id = up."problemId"
      ORDER BY up."updatedAt" DESC
      LIMIT 20
    `);

    for (const row of result.rows) {
      assert.ok(row.id > 0);
      assert.equal(typeof row.isCompleted, "boolean");
      assert.ok(row.user_id);
      assert.ok(row.problem_id > 0);
      assert.ok(row.title);
    }
  });

  test("reads jobs and internships with array fields", async () => {
    const [jobs, internships] = await Promise.all([
      pool.query(`
        SELECT id, company, title, jobtype, responsibilities, requirements, skills, benefits
        FROM "Jobs"
        ORDER BY "createdAt" DESC
        LIMIT 20
      `),
      pool.query(`
        SELECT id, company, title, "internType", requirements, skills, benefits
        FROM internships
        ORDER BY "createdAt" DESC
        LIMIT 20
      `),
    ]);

    for (const row of [...jobs.rows, ...internships.rows]) {
      assert.ok(row.id);
      assert.ok(row.company);
      assert.ok(row.title);
      assert.ok(Array.isArray(row.requirements));
      assert.ok(Array.isArray(row.skills));
      assert.ok(Array.isArray(row.benefits));
    }
  });

  test("reads roadmaps, nodes, and edges", async () => {
    const result = await pool.query(`
      SELECT r.id, r.title,
        COUNT(DISTINCT n.id)::int AS node_count,
        COUNT(DISTINCT e.id)::int AS edge_count
      FROM "Roadmap" r
      LEFT JOIN "Node" n ON n."roadmapId" = r.id
      LEFT JOIN "Edge" e ON e."roadmapId" = r.id
      GROUP BY r.id
      ORDER BY r."createdAt" DESC
      LIMIT 20
    `);

    for (const row of result.rows) {
      assert.ok(row.id);
      assert.ok(row.title);
      assert.ok(row.node_count >= 0);
      assert.ok(row.edge_count >= 0);
    }
  });

  test("validates node and edge endpoints", async () => {
    const [nodes, edges] = await Promise.all([
      pool.query(`
        SELECT n.id, n."roadmapId", r.id AS joined_roadmap_id, n.label
        FROM "Node" n
        JOIN "Roadmap" r ON r.id = n."roadmapId"
        LIMIT 20
      `),
      pool.query(`
        SELECT e.id, e."roadmapId", e."sourceNodeId", e."targetNodeId",
          r.id AS joined_roadmap_id, source.id AS source_id, target.id AS target_id
        FROM "Edge" e
        JOIN "Roadmap" r ON r.id = e."roadmapId"
        JOIN "Node" source ON source.id = e."sourceNodeId"
        JOIN "Node" target ON target.id = e."targetNodeId"
        LIMIT 20
      `),
    ]);

    for (const row of nodes.rows) {
      assert.equal(row.roadmapId, row.joined_roadmap_id);
      assert.ok(row.label);
    }
    for (const row of edges.rows) {
      assert.equal(row.roadmapId, row.joined_roadmap_id);
      assert.equal(row.sourceNodeId, row.source_id);
      assert.equal(row.targetNodeId, row.target_id);
    }
  });
});
