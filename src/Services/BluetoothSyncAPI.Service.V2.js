export default class BluetoothSyncAPIService {
    static BLUETOOTH_SYNC_API = 'https://randomuser.me/api/?results=1000';
    static URL_PATTERN = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
    static PHONE_PATTERN = /^[0-9 ()-]{8,14}$/;

    static sync = (async function f() {
        if (typeof f.numberOfRetries !== 'number') {
            f.numberOfRetries = 0;
        }
        if (f.numberOfRetries > 2) {
            throw new Error('Failed to sync data');
        }
        try {
            const res = await fetch(this.BLUETOOTH_SYNC_API);
            const data = await res.json();
            const users = [];

            data.results.forEach((result, index) => {
                const { picture, name, id, phone, email } = result;
                const user = {
                    id: `${id?.name}-${id?.value}`,
                    // Check if the thumbnail URL is valid, otherwise set it to null
                    thumbnail: this.URL_PATTERN.test(picture?.thumbnail) ? picture?.thumbnail : null,
                    // Truncate the name to a maximum of 20 characters
                    name: typeof name === 'object' && typeof name?.first === 'string' ? name.first.slice(0, 20) : null,
                    // Check if the phone number is valid, otherwise set it to null
                    phone: this.PHONE_PATTERN.test(phone) ? phone : null,
                    email,
                };

                // Add the user to the array if at least one of the properties (name, phone, picture) is present
                if (user.name || user.phone || user.thumbnail) {
                    users.push(user);
                }
            });
            return users;
        } catch (err) {
            f.numberOfRetries++;
            return f();
        }
    });
}
