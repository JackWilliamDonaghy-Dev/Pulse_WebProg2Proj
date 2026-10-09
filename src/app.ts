import express, {Application, Request, Response} from "express" ;
import peopleRoutes from "./routes/people";
import { env } from "./config/env";
import { connectDB } from "./config/database";
const port = env.port



const app: Application = express();
app.use(express.json());
app.use('/api/people',peopleRoutes);


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

