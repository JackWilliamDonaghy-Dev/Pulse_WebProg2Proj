
import { app } from "./app";
import { env } from "./config/env";
import { connectDB } from "./config/database";

const port = env.port;

const startServer = async () => {
    await connectDB();

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

startServer();
