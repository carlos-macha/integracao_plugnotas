import SqsService from "../services/sqsService";
import CepService from "../services/cepService";

const sqsService = new SqsService();
const cepService = new CepService();

export const CepWorker = async () => {
    const sqsMessage = await sqsService.receiveMessages();

    if (!sqsMessage || sqsMessage.length === 0) {
        return;
      }

    for (const message of sqsMessage) {
        const id = JSON.parse(message.Body!);

        await cepService.consultCep(id);

        await sqsService.deleteMessage(message.ReceiptHandle!);
    }
}
