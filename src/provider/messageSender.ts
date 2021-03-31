
import { QueueServiceClient, StorageSharedKeyCredential } from "@azure/storage-queue";

export interface IMessageSender {

    sendMessage(content: string): Promise<boolean>;
}

export class MessageSender implements IMessageSender {
    constructor(private queueClient: QueueServiceClient, private queueName: string) {

    }

    public async sendMessage(content: string): Promise<boolean> {
        const sendClient = this.queueClient.getQueueClient(this.queueName);
        const result = sendClient.sendMessage(content).then(() =>
            console.log("done!")
        );

        return true;
    }

}

