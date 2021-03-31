export interface AppConfig {

    storageAccountName: string;

    queueName: string;
    
    deviceTargetDataUrl: string;

    startIndex: number; 

    fetchSize: number; 

    cronJobPattern: string;
    
    waitTimeInSecond: number;
}