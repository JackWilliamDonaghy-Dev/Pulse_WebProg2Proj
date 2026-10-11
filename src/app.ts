import express, {Application, Request, Response} from "express" ;
import { env } from "./config/env";
import { connectDB } from "./config/database";
import personRoutes from "./routes/people";
import interactionRoutes from "./routes/interactions";
const port = env.port



const app: Application = express();
app.use(express.json());

app.use("/api/v1/people", personRoutes);
app.use("/api/v1/interactions", interactionRoutes);


app.use((req, _res, next) => {  
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});


app.get("/api/people", async (_req : Request, res: Response) => {
    res.status(200).json({});
});


const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

};

startServer();

