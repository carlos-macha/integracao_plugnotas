import Cep from "../models/cepModel";
import { sendMessageToQueue } from "./sqsService";

class CepService {
    async saveCep(cep: string) {
        const formattedCep = cep.replace(/\D/g, '');
            if (formattedCep.length !== 8) {
                return {status: 500, error: "This Cep is invalid"};
            }

        try {
            const existingCep = await Cep.findOne({cep: formattedCep });

            if (existingCep) {
                return {status: 500, error: "This CEP already exists"};
            };

            const newCep = await Cep.create({cep: formattedCep});

            const cepId = newCep.id;

            const sqs = await sendMessageToQueue(cepId);

            return {status: 201, message: newCep};
        } catch(error) {
            return {status: 500, error: error};
        }
    }
}

export default CepService;