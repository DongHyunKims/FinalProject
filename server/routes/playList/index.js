const express = require('express');
const router = express.Router();
const Album = require('../../database/model/album');
const bodyParser = require('body-parser');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));


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

router.get("/getAlbum/:albumId",(req,res)=>{
    let { albumId }   = req.params;
    //let objectAlbumId = createObjectId(albumId);
    Album.findOne({ _id: albumId },(err,album)=>{
        if(err)  return res.status(500).send(err);
        //console.log("album",album);
        res.json(album);
    })
});


router.post("/deletePlayList",(req,res)=>{


    let { deleteList,albumId }= req.body;

    //console.log("body",req.body);


    Album.update({ _id: albumId }, { $pull: { playList:{videoId:{ $in: deleteList }}}}, (err,doc)=>{
        if(err) return res.status(500).send(err);
        res.status(200).send();
    });

});

router.post("/videos", (req, res)=>{
  let { albumId, selectedVideoArr } = req.body;
  Album.update(
    {_id:albumId}, {$push:{playList:{$each:selectedVideoArr}}}, (err, doc) => {
      if(err) {
        console.log("err",err);
        return res.status(500).send(err);
      }
      res.status(200).send();
    }
  )
});



function createObjectId(id){
    return mongoose.Types.ObjectId(id);
}

module.exports = router;
