import { Application } from "express";
import { apiRouter } from "./api.router";


export default (app: Application) => {
    app.use("/api/v1", apiRouter);
};
