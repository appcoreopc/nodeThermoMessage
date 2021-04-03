import { DefaultAzureCredential } from "@azure/identity";
import { QueueServiceClient } from "@azure/storage-queue";
import { MessageSender } from "./provider/messageSender";
import { setLogLevel } from "@azure/logger";
import schedule from "node-schedule";
import { DeviceManager } from "./provider/deviceManager";
import { ConfigProvider } from "./provider/configProvider";

//setLogLevel("info");

export async function main() {
    let appRunCount = 0;
    const account = "thermoappsadev";
    const credential = new DefaultAzureCredential();
    const queueServiceClient = new QueueServiceClient(`https://${account}.queue.core.windows.net`,
        credential
    );

    const configFileName = "./src/config." + process.env.nodeEnv + ".json";
    console.log(configFileName);
    const settings = new ConfigProvider().getConfig(configFileName);
        
    const queueName = (await settings).queueName;
    const messageProvider = new MessageSender(queueServiceClient, queueName);
    console.log(queueName);
    
    const deviceManager = new
    DeviceManager([{ DeviceId: "1", DeviceIPAddress: "https://jsonplaceholder.typicode.com/todos/1", StartIndex: 1, FetchSize: 2 }], messageProvider);

    const job = schedule.scheduleJob('5 * * * * *', async () => {
        await deviceManager.getDataFromDevice();
        console.log(`Application run count : ${appRunCount}`);
        appRunCount++;
    });

}

