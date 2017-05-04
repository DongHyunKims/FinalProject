const express = require('express');
const router = express.Router();
const Album = require('../../database/model/album');
const bodyParser = require('body-parser');



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));



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
