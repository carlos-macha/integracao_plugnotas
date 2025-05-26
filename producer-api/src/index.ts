import  express  from "express";
import cepRouter from "./routes/cepRouter";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

app.use("/cep", cepRouter);

app.use(errorHandler);

export default app;