import { Request, Response } from "express";
import CepService from "../services/cepService";

const cepService = new CepService();

class CepController {
    public sendMessage = async (req: Request, res: Response) => {
        const { cep } = req.body;
        
        const response = await cepService.saveCep(cep);

        if (response.status == 201) {
            res.status(201).json(response.message);
        } else {
            res.status(500).json(response.error);
        }
    };
};

export default CepController;