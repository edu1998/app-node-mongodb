const MongoClient = require('mongodb').MongoClient;
const resp = require('./response')

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
    } catch (error) {
        console.log("ERROR Server connect");
    }
}

let insertOne = async (collection, document) => {

    if (await connect()) { // verify if the connection to the serves was carried out
        try {
            let resp = await db.collection(collection).insertOne(document);
            console.log('insert one succes');
            return resp;
        } catch (error) {
            // console.error(error.message);
            
            return resp.E_SERVER(error)
        }
    }


}


//use insertMany method to insert many document in the collection
let insertMany = async (collection, documents) => {

    await connect();

    try {
        let result = await db.collection(collection).
        insertMany(documents);
        console.log(`succes insert many, count ${result.result.n} `);
        // falta cerrar la coneccion
        return result;
    } catch (error) {

    }

}

let closeConnect = () => {
    db.close()

}


module.exports = {
    insertMany,
    insertOne
}