let azure = require('azure-storage');

class DataStorage {
    constructor() {
    }

    connect(connectionString) {
        return new Promise((resolve, reject) => {
            try {
                this.blobService = azure.createBlobService(connectionString);
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }

    saveCapture(containerName, fileName, filePath) {
        return new Promise((resolve, reject) => {
            this.blobService.createBlockBlobFromLocalFile(containerName, fileName, filePath, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }

    loadCapture(containerName, fileName, stream) {
        return new Promise((resolve, reject) => {
            this.blobService.getBlobToStream(containerName, fileName, stream, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            })
        });
    }

}

module.exports = new DataStorage();
