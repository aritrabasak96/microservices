const express  = require("express");
const bodyparser = require("body-parser");
const axios  = require("axios");
const cors = require("cors");


// middleware functions
const app = express();
app.use(bodyparser.json());
app.use(cors());

let storeEvent = []; // store the event

app.post("/",(req,res)=>{


    const event = req.body

    // anytime the user does anything we have to store the event
    storeEvent.push(event);

    console.log("storeEvent---------------------",storeEvent)


    axios.post("http://post-srv-cluster:4002/events",event);
    axios.post("http://like-srv:4001/events",event);
    axios.post("http://comment-srv:4000/events",event);
    axios.post("http://query-srv:4003/events",event);

    res.send({status:"ok"})

});

app.get("/",(req,res)=>{

    // send the event
    res.send(storeEvent);
})

// define port
app.listen(4004,()=>{
    console.log("event service is listen on port no 4004")
})
