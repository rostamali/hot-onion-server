const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient } = require('mongodb');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;

// cors connect
const cors = require('cors');
app.use(cors());
app.use(express.json());

// mongoDB connection

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.urhyn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// interaction with mongoDB

async function run() {
    try{
        await client.connect();
        const database = client.db('hotOnion');
        const productCollection = database.collection("products");

        // send all the product the UI
        app.get('/products', async (req, res)=>{
            const products = productCollection.find({});
            const result = await products.toArray();
            res.json(result);
        })
        // send all the product the UI
        app.get('/product/:productId', async (req, res)=>{
            const id = req.params.productId;
            const query = {_id: ObjectId(id)};
            const result = await productCollection.findOne(query);
            res.send(result);
        })

    }finally{
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(uri)
})