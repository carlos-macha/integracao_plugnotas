import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand, Message } from "@aws-sdk/client-sqs";
import 'dotenv/config';
import { getEnvVar } from "../config/env";

const sqs = new SQSClient({
    region: getEnvVar("AWS_REGION"),
    credentials: {
        accessKeyId: getEnvVar("AWS_ACCESS_KEY_ID"),
        secretAccessKey: getEnvVar("AWS_SECRET_ACCESS_KEY"),
    },
});

const SQS_URL = getEnvVar("SQS_URL");

class SqsService {
    async receiveMessages(): Promise<Message[]> {
        const command = new ReceiveMessageCommand({
            QueueUrl: SQS_URL,
            MaxNumberOfMessages: 1,
            WaitTimeSeconds: 10,
        });

        const response = await sqs.send(command);

        return response.Messages || [];
    };

    async deleteMessage(receiptHandle: string): Promise<void> {
        const command = new DeleteMessageCommand({
            QueueUrl: SQS_URL,
            ReceiptHandle: receiptHandle,
        });

        await sqs.send(command);
    };

};

export default SqsService;