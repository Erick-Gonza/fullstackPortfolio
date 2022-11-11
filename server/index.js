import express from "express";
import { PORT } from "./config.js";

//Rutas principales
import indexRoutes from "./routes/index.routes.js";
import projectRoutes from "./routes/projects.routes.js";

const app = express();

app.use(express.json());

//main routes
app.use(indexRoutes);
app.use(projectRoutes);

app.listen(PORT);
console.log(`Server is running on port ${PORT}`);
