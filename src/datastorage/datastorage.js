let azure = require('azure-storage');

class DataStorage {
    constructor() {
        this.container = "capture";
    }

    connect(connectionString) {
        return new Promise((resolve, reject) => {
            try {
                this.blobService = azure.createBlobService(connectionString);
                this.blobService.createContainerIfNotExists(this.container, (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    saveCapture(fileName, filePath) {
        return new Promise((resolve, reject) => {
            this.blobService.createBlockBlobFromLocalFile(this.container, fileName, filePath, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }

    loadCapture(fileName, stream) {
        return new Promise((resolve, reject) => {
            this.blobService.getBlobToStream(this.container, fileName, stream, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            })
        });
    }

}

module.exports = new DataStorage();
