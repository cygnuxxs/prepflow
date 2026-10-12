import "dotenv/config";
import assert from "node:assert/strict";
import { test } from "node:test";
import pg from "pg";

const { Client } = pg;

test("DIRECT_URL can connect to PostgreSQL", async () => {
  const connectionString = process.env.DIRECT_URL;
  assert.ok(connectionString, "DIRECT_URL is not set");

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
