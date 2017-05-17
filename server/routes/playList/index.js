const express = require('express');
const router = express.Router();
const Album = require('../../database/model/album');
const bodyParser = require('body-parser');



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));



router.post("/deletePlayList",(req,res)=>{


    let { deleteList,albumId }= req.body;

    let deleteVideoIdList = convertObjToArr(deleteList,"_id");
    let deleteDurationList= convertObjToArr(deleteList,"duration");
    let deleteTotalDuration = deleteDurationList.reduce((pre,post)=>{
            return pre + post;
    },0);

    console.log(deleteVideoIdList);

    //console.log("body",req.body);

    Album.find({_id:albumId}, (err, doc)=> {
        if (err) {
            console.log("err", err);
            return res.status(500).send(err);
        }
        let totalDuration = doc[0].totalDuration - deleteTotalDuration;
        Album.update({_id: albumId}, {$pull: {playList: {_id: {$in: deleteVideoIdList}}}, totalDuration:totalDuration}, (err, doc) => {
            if (err) return res.status(500).send(err);
            res.status(200).send();
        });
    });

});


function convertObjToArr(arr,key){
    return arr.map((val)=>{
        return val[key];
    });
}



router.post("/videos", (req, res)=>{
  let { albumId, selectedVideoArr, totalDuration } = req.body;

  Album.find({_id:albumId}, (err, doc)=>{
    if(err) {
      console.log("err",err);
      return res.status(500).send(err);
    }

    let totalDurationSum = doc[0].totalDuration + totalDuration;
    Album.update(
      {_id:albumId}, {$push:{playList:{$each:selectedVideoArr}}, totalDuration:totalDurationSum }, (err, doc)=>{
        if(err) {
          console.log("err",err);
          return res.status(500).send(err);
        }
        res.status(200).send();
      }
    )

  })
});



function createObjectId(id){
    return mongoose.Types.ObjectId(id);
}

module.exports = router;
