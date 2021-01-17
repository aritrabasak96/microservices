const express  = require("express");
const bodyparser = require("body-parser");
const axios  = require("axios");
const cors = require("cors");


// in memory database table
// database = [{id:"",messgae:""}]

let database = []

// middleware functions
const app = express();
app.use(bodyparser.json());
app.use(cors());



// handle response
app.post("/",async(req,res)=>{

    // store in the database
    let {msg} = req.body;

    let random_value = randomValue();

    database.push({id:random_value,post:msg});

    // push an event on the event bus
    let event = {
        type:"postcreated",
        data:{
            id:random_value,
            post:msg
        }
    }

    await axios.post("http://event-srv:4004",event)

    res.send(JSON.stringify({msg:"success"}))

})

// response event
app.post("/events",(req,res)=>{


    const {type} = req.body

    res.send({status:"ok"})


})

// create a function which is responsible to generate a random
// value
function randomValue(){

   let name = "bnUY672AXpoqw";
   let value  = "";

   for(let i=0;i<6;i++){

    value += name[Math.floor(Math.random() * name.length)]

   }

   return value;

}

// define port
app.listen(4002,()=>{
    console.log("post service is listen on port no 4002")
})
