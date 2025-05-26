import { NextFunction } from "express";
import CepService from "../services/cepService";
import { CepRequest, CepResponse } from "../types/cep";

class CepController {
  constructor(private cepService: CepService = new CepService()) {}

  public sendMessage = async (req: CepRequest, res: CepResponse, next: NextFunction) => {
    try {
      const { cep } = req.body;
      const response = await this.cepService.saveCep(cep);
      res.status(201).json({ message: "CEP created successfully", data: response.message });
    } catch (error) {
      next(error);
    }
  };
}

export default CepController;
