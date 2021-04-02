import { IMessageSender } from "./messageSender";
import axios from "axios";

export class DeviceManager {

    constructor(private deviceList: DeviceInfo[], private messageProvider: IMessageSender) {
    }

    async getDataFromDevice(): Promise<DeviceDataType> {

        const deviceList = this.deviceList;

        for (const device of deviceList) {

            const thermoData = await axios.get(device.DeviceIPAddress);

            if (thermoData) {
                const data = thermoData.data as User;
                console.log(data.userId);

                await this.messageProvider.sendMessage(`testing testing ${new Date().toLocaleString()}`);
                console.log("sent!!");
            }
        }
    }
}