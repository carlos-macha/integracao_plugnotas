import { Router } from "express";
import CepController from "../controllers/cepController";

const cepController = new CepController();
const cepRouter = Router();

cepRouter.post("/send_message", cepController.sendMessage);

export default cepRouter;