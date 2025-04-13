import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import dotenv from 'dotenv';

dotenv.config();

const sqs = new SQSClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export const sendMessageToQueue = async (message: any) => {
    const params = {
        QueueUrl: process.env.SQS_URL!,
        MessageBody: JSON.stringify(message),
    };

    try {
        const command = new SendMessageCommand(params);
        const result = await sqs.send(command);
        console.log('Message sent successfully:', result.MessageId);
        return result;
    } catch (error) {
        console.error('Error sending message to SQS:', error);
        throw error;
    }
};
