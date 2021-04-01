import axios from "axios";
import { IMessageSender } from "./messageSender";

export class DeviceManager {

    constructor(private deviceList: DeviceInfo[], private messageProvider: IMessageSender) {
    }

    async getDataFromDevice(): Promise<DeviceDataType> {

        const deviceList = this.deviceList;

        for (const key in deviceList) {

            const thermoData = await axios.get("https://jsonplaceholder.typicode.com/todos/1");

            if (thermoData) {
                const data = thermoData.data as User;
                console.log(data.userId);

                await this.messageProvider.sendMessage(`testing testing ${new Date().toLocaleString()}`);
                console.log("sent!!");
            }
        }
    }
}