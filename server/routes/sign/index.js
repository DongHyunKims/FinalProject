const express = require('express');
const router = express.Router();

//collection
const User = require('../../database/model/user');


/*
email : {type: String, required: true},
pwd : {type: String, require: true},
gender : {type: Number},
nickname : {type: String},
albumList: [Schema.Types.ObjectId],

*/
router.get("/insertUser",(req, res)=>{
    let user = new User({
        email : "dhkim.ce@gmail.com",
        pwd : "1234",
    });

    user.save((err,doc)=>{
        if(err) return res.status(500).send(err);
        res.send(doc);
    })

});

router.get("/getUser",(req, res)=>{

    User.find((err,users)=>{
        if(err)           return res.status(500).send(err);
        if(!users.length) return res.status(404).send({ err: "User not found" });
        res.send("User find successfully:\n" + users);
    })

});


module.exports = router;