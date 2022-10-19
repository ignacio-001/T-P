const { MongoClient } = require('mongodb');
const database = 'Student-Details';
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);


async function getData()
{
    let result = await client.connect();
    db= result.db(database);
    collection = db.collection('Detail');
}

getData();