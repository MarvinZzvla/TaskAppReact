import express from "express";
import { PORT } from "./config.js";
import indexRoutes from "./routes/index.routes.js";
import taskRoutes from "./routes/task.routes.js";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
//console.log(__dirname);

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(indexRoutes);
app.use(taskRoutes);
app.use(express.static(join(__dirname, "../client/dist")));

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);
