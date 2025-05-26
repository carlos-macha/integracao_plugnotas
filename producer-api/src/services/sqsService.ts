import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import dotenv from 'dotenv';
import { getEnvVar } from "../config/env";

dotenv.config();

const sqs = new SQSClient({
    region: getEnvVar("AWS_REGION"),
    credentials: {
        accessKeyId: getEnvVar("AWS_ACCESS_KEY_ID"),
        secretAccessKey: getEnvVar("AWS_SECRET_ACCESS_KEY"),
    },
});

export const sendMessageToQueue = async (message: any) => {
    const params = {
        QueueUrl: getEnvVar("SQS_URL"),
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
