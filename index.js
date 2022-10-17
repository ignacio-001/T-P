const { MongoClient } = require('mongodb');
const database = 'Student-Details';
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
import { getPort } from 'get-port';

console.log(await getPort({port: 3000}));


async function getData()
{
    let result = await client.connect();
    db= result.db(database);
    collection = db.collection('Detail');
    let data = await collection.find({}).toArray();
    console.log(data)


}

getData();