const express  = require("express");
const bodyparser = require("body-parser");
const axios  = require("axios");
const cors = require("cors");


// middleware functions
const app = express();
app.use(bodyparser.json());
app.use(cors());


let commentValue = [];
// get incomming comments
// just store the comment with the post id
app.post("/",async(req,res)=>{

    const {postid,comment} = req.body;

    commentValue.push({postid:postid,comment:comment})

    // once you store in the database
    // send the push event
    let event={

        type:"commentHandler",
        data:{
            postid:postid,
            comment:comment
        }
    }


    await axios.post("http://event-srv:4004",event);

    res.send(JSON.stringify({msg:"success"}));

})



app.post("/events",(req,res)=>{

    res.send({status:"ok"})
})


// define port
app.listen(4000,()=>{
    console.log("comment service is listen on port no 4000")
})
