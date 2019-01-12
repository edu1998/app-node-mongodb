const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'prueba';

// dbConection
let db = null;


// Use connect method to connect to the Server
let connect = async () => {
    try {
        client = await MongoClient.connect(url, {
            useNewUrlParser: true
        });
        db = client.db(dbName);

        console.log("Server connect");
        return client;
    } catch (error) {}
}

let insertManyM = async (document) => {

    await connect();

    try {
        let result = await db.collection('documents').
        insertMany(document);
        console.log(`succes insert many, count ${result.result.n} `);
        // falta cerrar la coneccion 
        return result;
    } catch (error) {

    }

}


module.exports = {
    insertManyM
}