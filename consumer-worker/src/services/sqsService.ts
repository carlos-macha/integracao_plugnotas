import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } from "@aws-sdk/client-sqs";
import 'dotenv/config';

const sqs = new SQSClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
});

const SQS_URL = process.env.SQS_URL!;

class SqsService {
    async receiveMessages() {
        const command = new ReceiveMessageCommand({
            QueueUrl: SQS_URL,
            MaxNumberOfMessages: 1,
            WaitTimeSeconds: 10,
        });

        const response = await sqs.send(command);

        return response.Messages || [];
    };

    async deleteMessage(receiptHandle: string) {
        const command = new DeleteMessageCommand({
            QueueUrl: SQS_URL,
            ReceiptHandle: receiptHandle,
        });

        await sqs.send(command);
    };

};

export default SqsService;