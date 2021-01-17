const express  = require("express");
const bodyparser = require("body-parser");
const axios  = require("axios");
const cors = require("cors");


// let database
let querydb = []

// middleware functions
const app = express();
app.use(bodyparser.json());
app.use(cors());


function handleReq(type,data){


    if(type === "postcreated"){

        let obj = {
            id:data.id,
            post:data.post,
            comment:[],
            likes:0
        }

        querydb.push(obj);
    }

    if(type === "commentHandler"){

        // store in the comment
        for(let i=0;i<querydb.length;i++){

            if(data.postid === querydb[i].id){

                querydb[i].comment.push(data.comment)
            }
        }
    }

    if(type === "likeHandler"){

        for(let i=0;i<querydb.length;i++){

            if(data.postid === querydb[i].id){

                querydb[i].likes = data.likes
            }
        }

    }
}

// get all the post
app.get("/",async(req,res)=>{

    res.send(JSON.stringify({msg:querydb}));
})

app.post("/events",async(req,res)=>{

    const {type,data} = req.body;

    handleReq(type,data)

    res.send({status:"ok"})
})

// define port
app.listen(4003,async ()=>{

    console.log("query service is listen on port no 4003")

    // send the event
    let value = await axios.get("http://event-srv:4004");

    for(val of value.data){

        handleReq(val.type,val.data)
    }

})
