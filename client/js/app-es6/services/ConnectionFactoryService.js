const stores = ['negociacoes'];
const version = 4;
const dbName = 'aluraFrame';

let connection = null;
let close = null;

export class ConnectionFactoryService {

    constructor() {
        throw new Error('Não é possível criar instâncias de ConnectionFactoryService ')
    }

    static getConnection() {

        return new Promise((resolve, reject) => {

            let OpenRequest = window.indexedDB.open(dbName, version);

            OpenRequest.onupgradeneeded = e => {
                ConnectionFactoryService._createStores(e.target.result);
            };

            OpenRequest.onsuccess = e => {

                if (!connection) {
                    connection = e.target.result;

                    close = connection.close.bind(connection);

                    connection.close = function(){
                        throw new Error('Você não pode fecha diretamente a conexão');
                    }

                }

                resolve(connection);
            };

            OpenRequest.onerror = e => {
                console.log(e.target.error);
                reject(e.target.error.name);
            };

        });
    }
    static _createStores(connection) {
        stores.forEach(store => {
            if (connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);

            connection.createObjectStore(store, { autoIncrement: true });

        });
    }

    static closeConnection(){
        if(connection){
            close();
            connection = null;
        }
    }
}