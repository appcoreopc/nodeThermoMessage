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
    const configProvider = new ConfigProvider();
    const settings = await configProvider.getConfig(configFileName);
    
    console.log(settings);
    
    const queueName = settings.queueName;
    const messageProvider = new MessageSender(queueServiceClient, queueName);
    
    const deviceManager = new
    DeviceManager([{ DeviceId: "1", DeviceIPAddress: settings.deviceTargetDataUrl, StartIndex: settings.startIndex, FetchSize: settings.fetchSize }], messageProvider);

    const job = schedule.scheduleJob(settings.cronJobPattern, async () => {
        
        await deviceManager.getDataFromDevice();
        
        console.log(`Application run count : ${appRunCount}`);
        
        appRunCount++;

        settings.startIndex++;

        // save the settings // 
        configProvider.saveConfig(settings);
   
    });
}

