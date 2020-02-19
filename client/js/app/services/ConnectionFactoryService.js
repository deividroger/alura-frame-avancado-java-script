'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, stores, version, dbName, connection, close, ConnectionFactoryService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            stores = ['negociacoes'];
            version = 4;
            dbName = 'aluraFrame';
            connection = null;
            close = null;

            _export('ConnectionFactoryService', ConnectionFactoryService = function () {
                function ConnectionFactoryService() {
                    _classCallCheck(this, ConnectionFactoryService);

                    throw new Error('Não é possível criar instâncias de ConnectionFactoryService ');
                }

                _createClass(ConnectionFactoryService, null, [{
                    key: 'getConnection',
                    value: function getConnection() {

                        return new Promise(function (resolve, reject) {

                            var OpenRequest = window.indexedDB.open(dbName, version);

                            OpenRequest.onupgradeneeded = function (e) {
                                ConnectionFactoryService._createStores(e.target.result);
                            };

                            OpenRequest.onsuccess = function (e) {

                                if (!connection) {
                                    connection = e.target.result;

                                    close = connection.close.bind(connection);

                                    connection.close = function () {
                                        throw new Error('Você não pode fecha diretamente a conexão');
                                    };
                                }

                                resolve(connection);
                            };

                            OpenRequest.onerror = function (e) {
                                console.log(e.target.error);
                                reject(e.target.error.name);
                            };
                        });
                    }
                }, {
                    key: '_createStores',
                    value: function _createStores(connection) {
                        stores.forEach(function (store) {
                            if (connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);

                            connection.createObjectStore(store, { autoIncrement: true });
                        });
                    }
                }, {
                    key: 'closeConnection',
                    value: function closeConnection() {
                        if (connection) {
                            close();
                            connection = null;
                        }
                    }
                }]);

                return ConnectionFactoryService;
            }());

            _export('ConnectionFactoryService', ConnectionFactoryService);
        }
    };
});
//# sourceMappingURL=ConnectionFactoryService.js.map