import { DefaultAzureCredential } from "@azure/identity";
import { QueueServiceClient } from "@azure/storage-queue";
import { MessageSender } from "./provider/messageSender";
import { setLogLevel } from "@azure/logger";
import schedule from "node-schedule";
import { DeviceManager } from "./provider/deviceManager";
import axios from "axios";
import { ConfigProvider } from "./provider/configProvider";

//setLogLevel("info");

export async function main() {

    //const job = schedule.scheduleJob('5 * * * * *', async () => {

        const account = "thermoappsadev";
        const credential = new DefaultAzureCredential();
        const queueServiceClient = new QueueServiceClient(`https://${account}.queue.core.windows.net`,
            credential
        );

        const configFileName = "./src/config." + process.env.nodeEnv + ".json";
        console.log(configFileName);
        const settings = new ConfigProvider().getConfig(configFileName);

        const queueName = "testmessage";
        const messageProvider = new MessageSender(queueServiceClient, queueName);

        const deviceManager = new
            DeviceManager([{ DeviceId: "1", DeviceIPAddress: "https://jsonplaceholder.typicode.com/todos/1", StartIndex: 1, FetchSize: 2 }], messageProvider);
        
        await deviceManager.getDataFromDevice();

        
        console.log('Scheduler stops')
    //});
}

