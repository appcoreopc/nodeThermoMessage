import { AppConfig } from "../model/appConfig";
import  nconfig  from "nconf";
import { fileURLToPath } from "node:url";
import { config } from "node:process";

class ConfigProvider { 

    async getConfig(configFilePath:string): Promise<AppConfig> {
        nconfig.use('file', { file : configFilePath })
        nconfig.load();

        return {

            storageAccountName: nconfig.get("storageAccountName"),
            queueName: nconfig.get("queueName"),
            deviceTargetDataUrl: nconfig.get("deviceTargetDataUrl"), 
            startIndex : nconfig.get("startIndex"), 
            fetchSize: nconfig.get("fetchSize"), 
            cronJobPattern: nconfig.get("cronJobPattern"),
            waitTimeInSecond: nconfig.get("waitTimeInSecond")
        };
    }
}