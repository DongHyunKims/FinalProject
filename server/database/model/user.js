/**
 * Created by donghyunkim on 2017. 5. 1..
 */


const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//ES6 bulitin promise 사용
mongoose.Promise = global.Promise;


const userSchema = new Schema({
    email : {type: String, required: true},
    password : {type: String, require: true},
    gender : {type: Number},
    nickname : {type: String},
    albumList: [Schema.Types.ObjectId],
});

module.exports = mongoose.model("users", userSchema);
