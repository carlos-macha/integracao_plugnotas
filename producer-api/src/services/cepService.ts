import Cep from "../models/cepModel";
import { sendMessageToQueue } from "./sqsService";
import { HttpError } from "../errors/HttpError";

class CepService {
    async saveCep(cep: string) {
        if (typeof cep !== 'string') {
            throw new HttpError(422, "CEP must be a string");
        }

        const formattedCep = cep.replace(/\D/g, '');

        if (formattedCep.length !== 8) {
            throw new HttpError(422, "This CEP is invalid");
        }

        try {
            const existingCep = await Cep.findOne({ cep: formattedCep });

            if (existingCep) {
                throw new HttpError(409, "This CEP already exists");
            };

            const newCep = await Cep.create({ cep: formattedCep });

            const cepId = newCep.id;

            const sqs = await sendMessageToQueue(cepId);

            return { status: 201, message: newCep };
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }

            const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
            throw new HttpError(500, errorMessage);
        }
    }
}

export default CepService;