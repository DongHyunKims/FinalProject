const express = require('express');
const router = express.Router();
const Album = require('../../database/model/album');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require("multer");

router.use(express.static('public'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));

const DEFAULT_IMG_URL = "http://localhost:3001";
const DEFAULT_URL = "http://localhost:3000/";

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/images/uploads/coverImg');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname+ '-' + Date.now() + "." +file.mimetype.split("/")[1])
    }
});

const upload = multer({ storage: storage });





// 자동화 라우팅
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


function getAllAlbumJsonData(){
    return new Promise((resolve, reject)=>{
        fs.readFile(path.join(__dirname,"../../public/json/albumListData.json"), 'utf8',(err,data)=>{
            if(err) reject(err);
            let jsonData = JSON.parse(data);
            resolve(jsonData);
        });

    })
}

router.get("/insertAllAlbum",(req,res)=>{
    getAllAlbumJsonData().then((jsonData)=>{
        return jsonData.map((data)=>{
            return new Album(data);
        });
    }).catch((err)=>{
        console.log(err);
    }).then((jsonArr)=>{
        Album.insertMany(jsonArr,(err,doc)=>{
            if(err) return res.status(500).send(err);
            res.send(doc);
        });
    });

});

// 실제 사용 라우팅
// 전체 AlbumList 가져오는 라우터
router.get("/getAllAlbumList",(req,res)=>{
    Album.find((err,albums)=>{
        if(err)           return res.status(500).send(err);
        if(!albums.length) return res.status(404).send({ err: "Album not found" });
        //console.log(albums);
        //let jsonAlbums = JSON.parse(albums);
        res.json(albums);
    });

});





router.get("/getAlbum",(req,res)=>{
    // Album.find((err,albums)=>{
    //     if(err)           return res.status(500).send(err);
    //     if(!albums.length) return res.status(404).send({ err: "Album not found" });
    //     res.send("Albums find successfully:\n" + albums);
    // })
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


router.get("/deleteAlbum/:albumId",(req,res)=>{
    let { albumId }   = req.params;
    //console.log("albumId",albumId)
    //let objectAlbumId = createObjectId(albumId);
    Album.findByIdAndRemove( albumId,(err,doc)=>{
        if(err)  return res.status(500).send(err);
        //console.log("album",album);
        res.json(doc);
    })
});







router.post("/addAlbum",upload.single('coverImgUrl'),(req,res)=>{

    // console.log("ffffffffff");
    let {title,category} = req.body;
    // // 전송된 파일 데이터 확인
    let {path} = req.file;


    if(path === null || path === undefined){
        path = DEFAULT_IMG_URL+"/images/default/default-thumbnail.jpg";
        console.log("inputFileUrl1",path);
    }
    path = DEFAULT_IMG_URL+ path.slice(path.indexOf("/"));


    // console.log("data",JSON.parse(category));
    // console.log("inputFileUrl2",path);


    let album = new Album({
        title: title,
        coverImgUrl: path,
        totalDuration: 0,
        category: JSON.parse(category),
        playList: []
    });


    album.save((err,doc)=>{
        if(err) return res.status(500).send(err);
        res.redirect(DEFAULT_URL);
    });




});




module.exports = router;




