import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Sistema_MRP",
  password: "123456",
  port: 5432,
});

async function testConnection() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Conexão bem-sucedida:", res.rows[0]);
  } catch (err) {
    console.error("Erro ao conectar:", err);
  } finally {
    await pool.end();
  }
}

testConnection();
