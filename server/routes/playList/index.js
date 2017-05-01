const express = require('express');
const router = express.Router();
const Album = require('../../database/model/album');
/*
 title : {type: String, required: true},
 coverImgUrl: {type: String, default: "./images/default.png"},
 totalDuration : {type: Number},
 category : [{type: Number}],
 playList: [{type: videoSchema}],






 const videoSchema = new Schema({
 title : {type: String, required: true},
 duration : {type: Number, require: true},
 videoId : {type: String, require: true},
 publishedAt : {type: Date, require: true} ,
 thumnail :  {type: String, require: true},
 });
 */

router.get("/insertAlbum",(req,res)=>{


    let album = new Album({
        title: "OST",
        coverImgUrl: "./default/coverImg.png",
        totalDuration: 4,
        category: [1,2,3],
        playList: [
            {
                title:  "[MV] HIGH4, IU(하이포, 아이유) _ Not Spring, Love, or Cherry Blossoms(봄,사랑,벚꽃 말고)",
                thumnail  : "https://i.ytimg.com/vi/ouR4nn1G9r4/default.jpg",
                duration : 1,
                videoId: "ouR4nn1G9r4",
                publishedAt: new Date("2014-04-08T03:00:00.000Z"),
            },
            {
                title:  "[MV] IU(아이유) _ Through the Night(밤편지)",
                thumnail  : "https://i.ytimg.com/vi/BzYnNdJhZQw/default.jpg",
                duration : 3,
                videoId: "BzYnNdJhZQw",
                publishedAt: new Date("2017-03-24T09:00:00.000Z"),
            }
        ]



    });


    album.save((err,doc)=>{
        if(err) return res.status(500).send(err);
        res.send(doc);
    });


});

router.get("/getAlbum",(req,res)=>{

    Album.find((err,albums)=>{
        if(err)           return res.status(500).send(err);
        if(!albums.length) return res.status(404).send({ err: "Album not found" });
        res.send("Albums find successfully:\n" + albums);
    })
});

module.exports = router;


