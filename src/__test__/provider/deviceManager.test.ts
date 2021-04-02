import { DeviceManager } from "../../provider/deviceManager";
import { MessageSender } from "../../provider/messageSender";
import axios from 'axios';

jest.mock('axios');
jest.mock("../../provider/messageSender");

describe("Device manager test", () => {
  
  test("it should filter by a search term (link)", async () => {
 
    const mocked = MessageSender as jest.MockedClass<typeof MessageSender>;
    
    const mockedSender = jest.fn();
    mocked.prototype.sendMessage = mockedSender;
    mockedSender.mockResolvedValue(Promise.resolve(true));

    const messageSenderInstance =  mocked.prototype;
    const users = [{name: 'Bob'}];

    (axios.get as jest.Mock).mockImplementation(() => users);

    var target = new DeviceManager(
      [{ DeviceId: "1", DeviceIPAddress: "https://jsonplaceholder.typicode.com/todos/1", StartIndex: 1, 
      FetchSize: 2 }], messageSenderInstance);

      await target.getDataFromDevice();
      expect(mockedSender).toBeCalled();
      expect(mockedSender).toBeCalledTimes(1);

  });
});
