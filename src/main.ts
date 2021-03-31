import { DefaultAzureCredential } from "@azure/identity";
import { QueueServiceClient } from "@azure/storage-queue";
import { MessageSender } from "./provider/messageSender";
import { setLogLevel } from "@azure/logger";
import schedule from "node-schedule";
import { DeviceManager } from "./provider/deviceManager";
import axios from "axios";

//setLogLevel("info");

export async function main() {

    const job = schedule.scheduleJob('5 * * * * *', async () => {

        const account = "thermoappsadev";
        const credential = new DefaultAzureCredential();
        const queueServiceClient = new QueueServiceClient(`https://${account}.queue.core.windows.net`,
            credential
        );

        const queueName = "testmessage";
        const messageProvider = new MessageSender(queueServiceClient, queueName);

        const deviceManager = new
            DeviceManager([{ DeviceId: "1", DeviceIPAddress: "100", StartIndex: 1, FetchSize: 2 }], messageProvider);
        deviceManager.getDataFromDevice();

        const thermoData = await axios.get("https://jsonplaceholder.typicode.com/todos/1");

        if (thermoData) {

            const data = thermoData.data as User;
            console.log(data.userId);

            const queueName = "testmessage";
            const messageProvider = new MessageSender(queueServiceClient, queueName);
            await messageProvider.sendMessage(`testing testing ${new Date().toLocaleString()}`);
        }

        console.log('Scheduler stops')
    });
}

