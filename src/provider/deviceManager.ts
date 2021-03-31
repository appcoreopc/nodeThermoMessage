import axios from "axios";
import { IMessageSender } from "./messageSender";

export class DeviceManager {

    constructor(private deviceList: DeviceInfo[], private sender: IMessageSender) {
    }

    async getDataFromDevice() {

        const deviceList = this.deviceList;

        for (const key in deviceList) {

            const thermoData = await axios.get("https://jsonplaceholder.typicode.com/todos/1");

            if (thermoData) {
                const data = thermoData.data as User;
                console.log(data.userId);
            }
        }
    }
}