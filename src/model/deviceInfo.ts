interface DeviceInfo {

    DeviceId: string;

    DeviceIPAddress: string;

    StartIndex: number;

    FetchSize: number;
}

interface DeviceData {
    
    DeviceId : string; 
 
    Temperature: number; 

    Image: string; 

    EmployeeId: string;
}

type DeviceDataType = DeviceInfo | void; 
