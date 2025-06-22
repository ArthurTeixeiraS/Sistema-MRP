import express, { Request, Response } from "express";
import { pool } from "../db";
import { Estrutura } from "../types/estrutura";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Recebido:", req.body);
  const estrutura: Estrutura = req.body;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query(
      `INSERT INTO "Estrutura" (id_estrutura, nome) VALUES ($1, $2)`,
      [estrutura.id, estrutura.nome]
    );

    for (const [, item] of estrutura.itens.entries()) {
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


router.get("/:id", async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  const client = await pool.connect();

  try {
    const estruturaResult = await client.query(
      `SELECT id_estrutura, nome FROM "Estrutura" WHERE id_estrutura = $1`,
      [id]
    );

    if (estruturaResult.rowCount === 0) {
      res.status(404).send("Estrutura não encontrada.");
      return;
    }

    const estrutura = estruturaResult.rows[0];

    const itensResult = await client.query(
      `SELECT ei.id_material, m.nome AS nome_material, ei.quantidade_material
      FROM "EstruturaItem" ei
      JOIN "Material" m ON ei.id_material = m.id_material
      WHERE ei.id_estrutura = $1`,
      [id]
    );


    const itens = itensResult.rows.map((item) => ({
      idMaterial: item.id_material,
      nomeMaterial: item.nome_material,
      quantidade: item.quantidade_material,
    }));

    res.json({
      id: estrutura.id_estrutura,
      nome: estrutura.nome,
      itens,
    });
  } catch (error) {
    console.error("Erro ao buscar estrutura:", error);
    res.status(500).send("Erro ao buscar estrutura.");
  } finally {
    client.release();
  }
});

router.put("/", async (req: Request, res: Response) => {
  const estrutura: Estrutura = req.body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `UPDATE "Estrutura" SET nome = $1 WHERE id_estrutura = $2`,
      [estrutura.nome, estrutura.id]
    );

    await client.query(
      `DELETE FROM "EstruturaItem" WHERE id_estrutura = $1`,
      [estrutura.id]
    );

    for (const item of estrutura.itens) {
      await client.query(
        `INSERT INTO "EstruturaItem" ("id_material", "id_estrutura", "quantidade_material")
         VALUES ($1, $2, $3)`,
        [item.idMaterial, estrutura.id, item.quantidade]
      );
    }

    await client.query("COMMIT");
    res.status(200).send("Estrutura atualizada com sucesso.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Erro ao atualizar estrutura:", error);
    res.status(500).send("Erro ao atualizar estrutura.");
  } finally {
    client.release();
  }
});

router.get("/material/:id", async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    res.status(400).json({ error: "ID inválido" });
    return;
  }

  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT nome FROM "Material" WHERE id_material = $1`,
      [id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ error: "Material não encontrado" });
      return;
    }

    const material = result.rows[0];
    res.json({ nome: material.nome });
  } catch (error) {
    console.error("Erro ao buscar material:", error);
    res.status(500).json({ error: "Erro ao buscar material" });
  } finally {
    client.release();
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(`DELETE FROM "EstruturaItem" WHERE id_estrutura = $1`, [id]);
    await client.query(`DELETE FROM "Estrutura" WHERE id_estrutura = $1`, [id]);

    await client.query("COMMIT");
    res.status(200).send("Estrutura excluída com sucesso.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Erro ao excluir estrutura:", error);
    res.status(500).send("Erro ao excluir estrutura.");
  } finally {
    client.release();
  }
});



export default router;
