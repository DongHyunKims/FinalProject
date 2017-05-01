/**
 * Created by donghyunkim on 2017. 5. 1..
 */
/**
 * Created by donghyunkim on 2017. 5. 1..
 */


const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//ES6 bulitin promise 사용
mongoose.Promise = global.Promise;


const videoSchema = new Schema({
    title : {type: String, required: true},
    duration : {type: Number, require: true},
    videoId : {type: String, require: true},
    publishedAt : {type: Date, require: true} ,
    thumnail :  {type: String, require: true},
});


const albumSchema = new Schema({
    title : {type: String, required: true},
    coverImgUrl: {type: String, default: "./images/default.png"},
    totalDuration : {type: Number},
    category : [{type: Number}],
    playList: [videoSchema],
});

module.exports = mongoose.model("albums", albumSchema);