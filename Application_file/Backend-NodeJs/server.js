const express = require("express");
const {MongoClient, ObjectId} = require("mongodb");
const cors = require("cors");


const app = express();
const todoRoutes = express.Router();
app.use(cors());
app.use(express.json());
app.use("/todos", todoRoutes);

// Configuration of Mongo
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
let db;

// endpoints/ routes

// Create Todo
todoRoutes.post("/", async (req, res) => { // validation can be added
    let data = await db.collection("todos").insertOne(req.body);
    res.status(201).send(req.body);
});

// Get all todo
todoRoutes.get("/", async (req, res) => {
    let todos = await db.collection("todos").find({}).toArray();
    res.status(200).send(todos)
});

// Get specific Todo
todoRoutes.get("/:id", async (req, res) => {
    let id = new ObjectId(req.params.id);
    let todo = await db.collection("todos").find({_id: id}).toArray();
    res.status(200).send(todo);
});

// Update Todo
todoRoutes.put("/:id", async (req, res) => {
    let id = new ObjectId(req.params.id);
    let todo = await db.collection("todos").findOneAndUpdate({
        _id: id
    }, {
        $set: {
            description: req.body.description,
            responsible: req.body.responsible,
            priority: req.body.priority,
            isCompleted: req.body.isCompleted
        }
    }, {returnDocument: 'after'});
    res.send(todo);
});

// Delete
todoRoutes.delete("/:id", async (req, res) => {
    let id = new ObjectId(req.params.id);
    await db.collection("todos").deleteOne({_id: id});
    res.send("Todo Deleted Successfully");
});

async function connectToMongoAndStartServer() {
    await client.connect();
    db = client.db("todoApp"); // USE DATABASE
    console.log("Connected to mongoDatabase");

    app.listen(3000, () => {
        console.log("Server is listening on port 3000");
    })
}

connectToMongoAndStartServer().then(() => console.log("Connected")).catch(console.error);