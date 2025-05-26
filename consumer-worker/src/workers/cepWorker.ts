import SqsService from "../services/sqsService";
import CepService from "../services/cepService";

function extractId(body: string): string {
  try {
    const parsed = JSON.parse(body);
    if (typeof parsed === "string") {
      return parsed;
    } else if (typeof parsed === "object" && parsed.id) {
      return parsed.id;
    } else {
      throw new Error("Unexpected message format");
    }
  } catch {
    return body;
  }
}

export const CepWorker = async (
  sqsService: SqsService = new SqsService(),
  cepService: CepService = new CepService()
): Promise<void> => {
  const sqsMessage = await sqsService.receiveMessages();

  if (!sqsMessage || sqsMessage.length === 0) {
    return;
  }

  for (const message of sqsMessage) {
    const id = extractId(message.Body!);

    await cepService.consultCep(id);

    await sqsService.deleteMessage(message.ReceiptHandle!);
  }
};
