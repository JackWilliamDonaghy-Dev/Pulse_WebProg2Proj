
import express, { Application, Request, Response } from "express";
import personRoutes from "./routes/people";
import interactionRoutes from "./routes/interactions";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

export const app: Application = express();

app.use(express.json());

app.use((req, _res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/people", personRoutes);
app.use("/api/v1/interactions", interactionRoutes);

app.get("/api/people", async (_req: Request, res: Response) => {
    res.status(200).json({});
});

app.get("/ping", async (_req: Request, res: Response) => {
    res.status(200).json({ message: "hello from Pulse" });
});
