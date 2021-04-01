import { AppConfig } from "../model/appConfig";
import  nconfig  from "nconf";
import { fileURLToPath } from "node:url";
import { config } from "node:process";

export class ConfigProvider { 

    async getConfig(configFilePath:string): Promise<AppConfig> {

        nconfig.use('file', { file : configFilePath })
        nconfig.load();

        const appConfig = {

            storageAccountName: nconfig.get("storageAccountName"),
            queueName: nconfig.get("queueName"),
            deviceTargetDataUrl: nconfig.get("deviceTargetDataUrl"), 
            startIndex : nconfig.get("startIndex"), 
            fetchSize: nconfig.get("fetchSize"), 
            cronJobPattern: nconfig.get("cronJobPattern"),
            waitTimeInSecond: nconfig.get("waitTimeInSecond")
        };

        console.log(appConfig);

        return appConfig;
    }
}