const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://smartdbUser:V9fNeqq9RZWpzK9j@cluster0.bnkmq1v.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();


    const db = client.db('smart_db');
    const productsCollection = db.collection('products');

    app.post('/products', async (req, res) => {
      const newProduct = req.body;
      const result = await productsCollection.insertOne(newProduct)
      res.send(result)
    })


    app.delete('/products/:id', (req, res) =>{
      const id = req.params.id;
    })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Smart server is running");
});



app.listen(port, () => {
  console.log(`Smart server is running on post: ${port}`);
});
