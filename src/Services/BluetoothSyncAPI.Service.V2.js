export default class BluetoothSyncAPIService {
  static BLUETOOTH_SYNC_API = 'https://randomuser.me/api/?results=1000';

  static sync = () => {return new Promise((resolve,reject) => {
     resolve({results:[]})
  })};
}
