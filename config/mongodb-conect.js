const MongoClient = require('mongodb').MongoClient;
const resp = require('./response')

// Connection URL
const url = 'mongodb://192.168.2.7:27016/';

// Database Name
const dbName = 'persona';

// dbConection
let db = null;

//cliente
let client;


// Use connect method to connect to the Server
let connect = async () => {
    try {
        client = await MongoClient.connect(url, {
            useNewUrlParser: true
        });
        db = client.db(dbName);
        console.log("Server connect");
    } catch (error) {
        console.log("ERROR Server connect");
        return resp.E_SERVER(error)
    }
}

//use insert in case of any occasion Many/One
let insert = async (collection, document) => {
    if (document.length) {
        return await insertMany(collection, document);
    } else {
        return await insertOne(collection, document)
    }
}


//use insertOne method to insert one document in the collection
let insertOne = async (collection, document) => {
    await connect();
    try {
        let result = await db.collection(collection).insertOne(document);
        client.close();
        return resp.OK_SERVER(result);
    } catch (error) {
        return resp.E_SERVER(error)
    }


}


//use insertMany method to insert many document in the collection
let insertMany = async (collection, documents) => {
    await connect();
    try {
        let result = await db.collection(collection).insertMany(documents);
        client.close();
        return resp.OK_SERVER(result);
    } catch (error) {
        return resp.E_SERVER(error);
    }

}


module.exports = {
    insertMany,
    insertOne,
    connect,
    insert
}