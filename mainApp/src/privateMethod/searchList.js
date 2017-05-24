/**
 * Created by donghyunkim on 2017. 5. 24..
 */
import utility from '../utility/utility';
import config from '../utility/config';
import moment from 'moment'
const privateSearchList = {
    _promiseSearch(url){
        return new Promise(function (resolve, reject) {
            utility.runAjax(function (e) {
                let data = JSON.parse(e.target.responseText);
                this.nextPageToken = data.nextPageToken;
                let videoArr = data.items.map((item, index) => {
                    return {
                        videoId: item.id.videoId,
                        title: item.snippet.title,
                        publishedAt: item.snippet.publishedAt,
                        thumnail: item.snippet.thumbnails.default.url
                    }
                });
                if (typeof data !== "object") {
                    reject("wrong data")
                } else {
                    resolve(videoArr);
                }
            }.bind(this), "GET", url)
        }.bind(this))
    },

    _promiseGetViewCount(videoArr){
        let count = 0;
        return new Promise(function (resolve, reject) {
            videoArr.forEach((item, index) => {
                let statisticsUrl = config.DEFAULT_YOUTUBE_DATA_URL + "?part=statistics&id=" + item.videoId + "&key=" + config.YOUTUBE_KEY + "";
                utility.runAjax(function (e) {
                    let data = JSON.parse(e.target.responseText);
                    let items = data['items'][0];

                    if (typeof items === "undefined") {
                        videoArr[index].viewCount = 0;
                    } else {
                        let viewCount = items.statistics.viewCount;
                        videoArr[index].viewCount = viewCount;
                    }

                    count++;
                    if (count === videoArr.length) {
                        if (typeof videoArr !== "object") {
                            reject("wrong data")
                        } else {
                            resolve(videoArr);
                        }
                    }
                }.bind(this), "GET", statisticsUrl)
            })
        })
    },

    _promiseGetDuration(videoArr){

        let count = 0;
        return new Promise(function (resolve, reject) {
            videoArr.forEach((item, index) => {
                let contentDetailsUrl = config.DEFAULT_YOUTUBE_DATA_URL + "?part=contentDetails&id=" + item.videoId + "&key=" + config.YOUTUBE_KEY + "";
                utility.runAjax(function (e) {
                    let data = JSON.parse(e.target.responseText);

                    let duration = data.items[0].contentDetails.duration;
                    let changedDuration = moment.duration(duration, moment.ISO_8601)
                    videoArr[index].duration = changedDuration._milliseconds;

                    let items = data.items[0];

                    if (typeof items === "undefined") {
                        videoArr[index].duration = 0;
                    } else {
                        let duration = items.contentDetails.duration;
                        let changedDuration = "";
                        changedDuration = moment.duration(duration, moment.ISO_8601)
                        videoArr[index].duration = changedDuration._milliseconds;
                    }


                    count++;
                    if (count === videoArr.length) {
                        if (typeof videoArr !== "object") {
                            reject("wrong data")
                        } else {
                            resolve(videoArr);
                        }
                    }
                }.bind(this), "GET", contentDetailsUrl)
            })
        })
    },

    _getVideoInfo(url){
        privateSearchList._promiseSearch(url)
            .then(function (videoArr) {
                return privateSearchList._promiseGetViewCount(videoArr)
            }.bind(this))
            .then(function (videoArr) {
                return privateSearchList._promiseGetDuration(videoArr)
            }.bind(this))
            .then(function (videoArr) {
                this.setState({
                    items: this.state.items.concat(videoArr),
                    nextPageToken: this.nextPageToken
                })
            }.bind(this))
    },

}

export default privateSearchList;
