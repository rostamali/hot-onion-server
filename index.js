const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()


// mongoDB connection

const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.urhyn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// interaction with mongoDB

async function runServer() {
    try{
        await client.connect();
        const database = client.db('hotOnion');
        const productCollection = database.collection("products");

        // send all the product the UI
        app.get('/products', async (req, res)=>{
            const products = productCollection.find({});
            const result = await products.toArray();
            res.send(result);
        })

    }finally{
        // await client.close();
    }
}
runServer().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(uri)
})