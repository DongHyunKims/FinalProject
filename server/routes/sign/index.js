const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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



router.get("/updateUser",(req,res)=>{
    User.update({ _id: mongoose.Types.ObjectId("590623623c00af647703a0ba") }, { $set: { albumList: [mongoose.Types.ObjectId("5907f898f91d33f1d974f254")]}}, (err,doc)=>{
        if(err) return res.status(500).send(err);
        res.send(doc);
    });

});


module.exports = router;