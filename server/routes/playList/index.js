const express = require('express');
const router = express.Router();
const Album = require('../../database/model/album');
const bodyParser = require('body-parser');



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));



router.delete("/videos",(req,res)=>{


    let { deleteList,albumId }= req.body;

    let deleteVideoIdList = convertObjToArr(deleteList,"_id");
    let deleteDurationList= convertObjToArr(deleteList,"duration");
    let deleteTotalDuration = deleteDurationList.reduce((pre,post)=>{
            return pre + post;
    },0);

    Album.find({_id:albumId}).exec()
        .then((doc)=>{
            let totalDuration = doc[0].totalDuration - deleteTotalDuration;
            return  Album.update({_id: albumId}, {$pull: {playList: {_id: {$in: deleteVideoIdList}}}, totalDuration:totalDuration}).exec();
        })
        .catch((err)=>{
            if (err) return res.status(500).send(err);
        })
        .then(()=>{
            res.status(200).send();
        })
        .catch((err)=>{
            if (err) return res.status(500).send(err);
        });



});


function convertObjToArr(arr,key){
    return arr.map((val)=>{
        return val[key];
    });
}



router.post("/videos", (req, res)=>{
  if(req.body.albumId === null){
    console.log("err",err);
    return res.status(500).send(err);
  }

  let { albumId, selectedVideoArr, totalDuration } = req.body;

    Album.find({_id:albumId}).exec()
        .then((doc)=>{
            let totalDurationSum = doc[0].totalDuration + totalDuration;
            return Album.update({_id:albumId}, {$push:{playList:{$each:selectedVideoArr}}, totalDuration:totalDurationSum }).exec();
        })
        .catch((err)=>{

            if(err) return res.status(500).send(err);
        })
        .then(()=>{
            res.status(200).send();
        })
        .catch((err)=>{
            if(err) return res.status(500).send(err);
        });


});




module.exports = router;
