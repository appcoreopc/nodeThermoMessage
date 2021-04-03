import { IMessageSender } from "./messageSender";
import axios from "axios";

export class DeviceManager {

    constructor(private deviceList: DeviceInfo[], private messageProvider: IMessageSender) {
    }

    async getDataFromDevice() {

        const deviceList = this.deviceList;

        for (const device of deviceList) {

            const thermoData = await axios.get(device.DeviceIPAddress);

            if (thermoData) {

                const data = thermoData.data as User;

                const result = await this.messageProvider.sendMessage(JSON.stringify(data));
                
                console.log(result);
            }
        }
    }
}