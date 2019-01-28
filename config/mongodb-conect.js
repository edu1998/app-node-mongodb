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

// search all records in a collection
let selectAll = async (collection, filter = {}) => {
    try {
        await connect();
        let result = await db.collection(collection).find(filter).toArray();
        client.close();
        return resp.OK_SERVER(result)
    } catch (error) {
        return resp.E_SERVER(error);
    }
}

// search one records in a collection 
let selectOne = async (collection, filter = {}) => {
    try {
        await connect();
        let result = await db.collection(collection).findOne(filter);
        client.close();
        return resp.OK_SERVER(result)
    } catch (error) {
        return resp.E_SERVER(error);
    }
}

let updateOne = async (collection, filter = {}, operation = {}) => {
    try {
        await connect();
        let result = await db.collection(collection).updateOne(filter,operation);
        client.close();
        return resp.OK_SERVER(result)
    } catch (error) {
        return resp.E_SERVER(error)
    }
}

let updateMany = async (collection, filter = {}, operation = {}) => {
    try {
        await connect();
        let result = await db.collection(collection).updateMany(filter,operation);
        client.close();
        return resp.OK_SERVER(result)
    } catch (error) {
        return resp.E_SERVER(error)
    }
}

module.exports = {
    connect,
    insertMany,
    insertOne,
    insert,
    selectOne,
    selectAll,
    updateOne,
    updateMany,
}