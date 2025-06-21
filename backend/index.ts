import express from "express";
import cors from "cors";
import estruturaRoutes from "./routes/estrutura";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/estrutura", estruturaRoutes);

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});