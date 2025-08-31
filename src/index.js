import express from "express";
import { userRoutes } from "./controller/user/route.js";
const app = express();

const PORT = 3000;

app.use("/user", userRoutes);
app.get("/", (req, res) => {
  res.send("Servidor Express funcionando!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
