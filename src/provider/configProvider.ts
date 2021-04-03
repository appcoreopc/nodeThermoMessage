import { AppConfig } from "../model/appConfig";
import  nconfig  from "nconf";

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
       
        return appConfig;
    }
    
    
    async saveConfig(settings : AppConfig)
    {
        nconfig.set("startIndex", settings.startIndex)
        nconfig.set("fetchSize", settings.fetchSize);
        nconfig.save(settings);
    }
}