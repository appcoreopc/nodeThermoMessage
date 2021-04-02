import { DeviceManager } from "../../provider/deviceManager";
import { MessageSender } from "../../provider/messageSender";
import axios from 'axios';

jest.mock('axios');
jest.mock("../../provider/messageSender");

describe("Device manager test", () => {
  
  test("given device return data, message gets send", async () => {
 
    const mocked = MessageSender as jest.MockedClass<typeof MessageSender>;
    
    const mockSendFunction = jest.fn();
    mocked.prototype.sendMessage = mockSendFunction;
    mockSendFunction.mockResolvedValue(Promise.resolve(true));

    const messageSenderInstance =  mocked.prototype;
    const users = [{id: 'Bob'}];

    (axios.get as jest.Mock).mockImplementation(() => users);

    var target = new DeviceManager(
      [{ DeviceId: "1", DeviceIPAddress: "https://jsonplaceholder.typicode.com/todos/1", StartIndex: 1, 
      FetchSize: 2 }], messageSenderInstance);

      await target.getDataFromDevice();

      expect(mockSendFunction).toHaveBeenCalled();

  });
});
