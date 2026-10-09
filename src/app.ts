import express, {Application, Request, Response} from "express" ;

const PORT = process.env.PORT || 3000;


const app: Application = express();

app.use(express.json());

app.use((req, _res, next) => {  
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});


app.get("/api/people", async (_req : Request, res: Response) => {
    res.status(200).json({});
});


app.listen(PORT, () => {console.log("Server is running on port", PORT)});
