import axios from "axios";
import Cep from "../model/cepModel";
import { HttpError } from "../errors/HttpError";
import { CepData, CepResponse, CepStatus } from "../types/CepData";

class CepService {
  async consultCep(id: string): Promise<void> {
    try {
      const findCep = await Cep.findById(id) as CepData;
      if (!findCep) {
        throw new HttpError(404, "CEP not found in the bank.");
      }

      const response = await axios.get<CepResponse>(
        `https://viacep.com.br/ws/${findCep.cep}/json/`
      );
      const data = response.data;

      if (data.erro) {
        await Cep.findByIdAndUpdate(id, { status: "REJEITADO" as CepStatus });

        throw new HttpError(400, "CEP invalid.");
      }

      await Cep.findByIdAndUpdate(id, {
        data,
        status: "CONCLUIDO" as CepStatus,
      });

    } catch (error: any) {
      console.error("Error when querying CEP:", error);

      if (error instanceof HttpError) {
        throw error;
      }

      throw new HttpError(500, "Internal error when querying the CEP.");
    }
  }
}

export default CepService;
