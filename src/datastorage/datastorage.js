let azure = require('azure-storage');

class DataStorage {
    connect(connectionString) {
        return new Promise((resolve, reject) => {
            try {
                this.blobService = azure.createBlobService(connectionString);
                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = new DataStorage();
