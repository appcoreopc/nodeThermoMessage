
import { QueueServiceClient, StorageSharedKeyCredential }   from "@azure/storage-queue";

export class MessageSender 
{
    constructor(private queueClient:QueueServiceClient, private queueName: string)
    {

    }

    public sendMessage(content:string):boolean 
    {
        const sendClient = this.queueClient.getQueueClient(this.queueName);
        const result = sendClient.sendMessage(content).then(() =>
            console.log("done!")
        );

        return true; 
    }

}

