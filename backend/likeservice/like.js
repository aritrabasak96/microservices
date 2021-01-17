const express  = require("express");
const bodyparser = require("body-parser");
const axios  = require("axios");
const cors = require("cors");


// middleware functions
const app = express();
app.use(bodyparser.json());
app.use(cors());

let likedb = []; // [{id:"",like:0}]

app.post("/",async(req,res)=>{

    const {postid} = req.body;
    let found = 0;
    let total_like = 0;
    // check that the product is available or not
    for(let i=0;i<likedb.length;i++){

        if(postid === likedb[i].id){

            let like_count = likedb[i].like;

            like_count = like_count + 1;


            likedb[i].like = like_count;

            found = 1;

            total_like = like_count;
        }

    }

    if(found === 0){

        likedb.push({id:postid,like:1});

        total_like = 1;
    }

    // once you have it send it to the event bus
    let event={
        type:"likeHandler",
        data:{
            postid:postid,
            likes:total_like
        }
    }

    await axios.post("http://event-srv:4004",event)

    res.send(JSON.stringify({msg:"success"}))

})

app.post("/events",(req,res)=>{


    res.send({status:"ok"})
})

// define port
app.listen(4001,()=>{
    console.log("like service is listen on port no 4001")
})
