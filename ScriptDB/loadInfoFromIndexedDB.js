async function getTable(tableName) {

    return new Promise((resolve, reject) => {

        const request = indexedDB.open("MapsBoxDB");

        request.onsuccess = (e) => {

            const db = e.target.result;

            const store = db
                .transaction(tableName, "readonly")
                .objectStore(tableName);

            const req = store.get("data");

            req.onsuccess = () => {

                resolve(req.result ? req.result.rows : []);

            };

            req.onerror = () => reject(req.error);

        };

        request.onerror = () => reject(request.error);

    });

}
