export default class BluetoothSyncAPIService {
    static BLUETOOTH_SYNC_API = 'https://randomuser.me/api/?results=1000';

    static sync = (async function f() {
        if (typeof f.numberOfRetries !== 'number') {
            f.numberOfRetries = 0;
        }
        if (f.numberOfRetries > 2) {
            throw new Error('Failed to sync data');
        }
        try {
            const res = await fetch(this.BLUETOOTH_SYNC_API);
            return await res.json();
        } catch (err) {
            f.numberOfRetries++; 
            f();
        }
    });
}
