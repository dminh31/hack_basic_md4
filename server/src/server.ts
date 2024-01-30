import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import todoRoutes from "./routes/todo.routes";
import cors from "cors"
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

app.use("/api/v1/todo", todoRoutes);

const PORT: number = 8080;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});