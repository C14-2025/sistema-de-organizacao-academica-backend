import express from "express";
import { userRoutes } from "./controller/user/route.js";
import { taskRoutes } from "./controller/task/route.js";
import { examRoutes } from "./controller/exam/route.js";
import { subjectRoutes } from "./controller/subject/route.js";
import { workRoutes } from "./controller/work/route.js";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = 8080;

app.use(express.json());

app.use("/user", userRoutes);
app.use("/task", taskRoutes);
app.use("/exam", examRoutes);
app.use("/subject", subjectRoutes);
app.use("/work", workRoutes);

app.get("/", (req, res) => {
  res.send("Servidor Express funcionando!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
