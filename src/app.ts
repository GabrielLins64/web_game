import express, { Application } from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import addRoutes from './routes';
import { connectToDatabase } from "./database";


dotenv.config();

const PORT = process.env.WP_PORT;
const DB_CONN_URI = process.env.DB_CONN_URI;

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

addRoutes(app);
connectToDatabase(DB_CONN_URI);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
