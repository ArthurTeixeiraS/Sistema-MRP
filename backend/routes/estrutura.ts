import express from "express";
import { pool } from "../db";
import { Estrutura } from "../types/estrutura";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Recebido:", req.body);
  const estrutura: Estrutura = req.body;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Inserir estrutura
    await client.query(
      `INSERT INTO "Estrutura" (id_estrutura, nome) VALUES ($1, $2)`,
      [estrutura.id, estrutura.nome]
    );

    // Inserir itens da estrutura
    for (const [,item] of estrutura.itens.entries()) {
      await client.query(
        `INSERT INTO "EstruturaItem" ("id_material", "id_estrutura", "quantidade_material")
        VALUES ($1, $2, $3)`,
        [item.idMaterial, estrutura.id, item.quantidade]
      );
    }

    await client.query("COMMIT");
    res.status(201).send("Estrutura gravada com sucesso.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Erro ao gravar estrutura:", error);
    res.status(500).send("Erro ao gravar estrutura.");
  } finally {
    client.release();
  }
});

export default router;