import { DefaultAzureCredential } from "@azure/identity";
import { QueueServiceClient }   from "@azure/storage-queue";
import { MessageSender } from "./messaging/messageSender";
import { setLogLevel } from "@azure/logger";

const account = "thermoappsadev";
const credential = new DefaultAzureCredential();
const queueName = "testmessage";

const queueServiceClient = new QueueServiceClient(`https://${account}.queue.core.windows.net`,
  credential
);

setLogLevel("info");

// scheduling starts here //

const sender =  new MessageSender(queueServiceClient, queueName);
