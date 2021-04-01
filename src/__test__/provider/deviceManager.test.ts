import { DeviceManager } from "../../provider/deviceManager";
import { MessageSender } from "../../provider/messageSender";


jest.mock("../../provider/messageSender");

describe("Filter function", () => {
  test("it should filter by a search term (link)", () => {
 
    const mocked = MessageSender as jest.MockedClass<typeof MessageSender>;
    const instance = mocked.mock.instances[0];

    var target = new DeviceManager(
      [{ DeviceId: "1", DeviceIPAddress: "https://jsonplaceholder.typicode.com/todos/1", StartIndex: 1, 
      FetchSize: 2 }], instance);

      target.getDataFromDevice();

  });
});
