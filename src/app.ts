import express, { Application } from "express";
import dotenv from 'dotenv';


dotenv.config();

const PORT = process.env.WP_PORT;

const app: Application = express();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
