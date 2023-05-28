import express from 'express';
import { accountRouter } from './account.router';


const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
    res.send("Web Game API v.1.0");
});

apiRouter.use("/account", accountRouter);

export { apiRouter };
