import "dotenv/config";
import assert from "node:assert/strict";
import { test } from "node:test";
import pg from "pg";

const { Client } = pg;

test("DATABASE_URL can connect to PostgreSQL", async () => {
  const connectionString = process.env.DATABASE_URL;
  assert.ok(connectionString, "DATABASE_URL is not set");

  const client = new Client({
    connectionString,
    connectionTimeoutMillis: 10_000,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    const result = await client.query("SELECT 1 AS connected");
    assert.equal(result.rows[0].connected, 1);
  } finally {
    await client.end().catch(() => {});
  }
});
