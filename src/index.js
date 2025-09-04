import express from "express";
import { userRoutes } from "./controller/user/route.js";
import { activityRoutes } from "./controller/activity/route.js";
const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/user", userRoutes);
app.use("/activity", activityRoutes);
app.get("/", (req, res) => {
  res.send("Servidor Express funcionando!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
