const express = require("express");
const app = express();
const mongodb = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");
//const url = "mongodb://localhost:27017";
const url=`mongodb+srv://admin:admin123@cluster0.sln75.mongodb.net/todo?retryWrites=true&w=majority`;

app.use(bodyParser());
app.use(cors());

//Get all the todo tasks


app.get("/tasks", async (req, res) => {
  try {
    let client = await mongodb.connect(url);
    let db = client.db("todo");
    let data = await db.collection("tasks").find().toArray();
    res.send(data);
    console.log(data);
    client.close();
  } catch (err) {
    alert("Something went wrong");
  }
});
app.post("/add", async (req, res) => {
    
    console.log(req.body);
    try{
        let client=await mongodb.connect(url);
        let db=client.db("todo");
        let data=await db.collection("tasks").insertOne({
            "_id":req.body.id,
            "title":req.body.title
        });
        res.send(data);
        client.close();
    }catch(err){
        alert("Could not add task to database");
    }
});
//Delete A Todo Task

app.post("/delete/:id", async(req,res)=>{
    console.log(req.params);
    try{
        let client=await mongodb.connect(url);
        let db=client.db("todo");
        let data=await db.collection("tasks").deleteOne({
            "_id":+req.params.id
            
        });
        res.send(data);
        
        client.close();
    }catch(err){
        alert("Could not delete task from database");
    }

})

app.listen(process.env.PORT || 4040, () => {
  console.log("listening");
});
