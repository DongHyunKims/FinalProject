/**
 * Created by donghyunkim on 2017. 5. 24..
 */
import playControllerEvents from "../events/playControllerEvents";
import utility from "../utility/utility";
const ACTION_CONFIG = {
    addPlayList : "addPlayList",
    deletePlayList : "deletePlayList",
    resetPlayList : "resetPlayList",
    deleteAlbum : "deleteAlbum",
    getAllAlbum : "getAllAlbum",
    addAlbum : "addAlbum",
    updateAlbum:"updateAlbum"
};
const privatePlayController = {
    _setDuration(player) {
        let {eventMap} = this.state;
        let time = Math.ceil(player.getDuration());
        this.setState({
            eventMap: Object.assign({}, eventMap, {
                totalTime: privatePlayController._toTimeString(time),
                maxProgressBar: time
            })
        }, privatePlayController._setCurrentTime.bind(null, player));
    },

    _setCurrentTime(player) {
        let {eventMap} = this.state;
        let ele = utility.$selector("#seekBar");
        if (eventMap.playing) {

            this.interverId = setInterval(() => {
                let time = Math.ceil(player.getCurrentTime());
                this.setState((state) => {

                    let {eventMap} = state;
                    let {soundOn} = eventMap;


                    let sound = false;
                    if (soundOn) {
                        sound = true;
                    }

                    
                    return {
                        eventMap: Object.assign({}, eventMap, {
                            curTime: privatePlayController._toTimeString(time),
                            curProgressBar: time,
                            sound: sound
                        })
                    }
                }, () => {
                    let {eventMap, playingState} = this.state;
                    let {curProgressBar, maxProgressBar} = eventMap;
                    privatePlayController._changeBarBackgroundSize(ele,curProgressBar);

                    //전부 삭제 되었으면
                    if (!playingState) {
                        clearInterval(this.interverId);
                        let resetEventMap = {
                            playing: false,
                            curTime: '00:00', // 현재 재생 시간
                            totalTime: '00:00', // 전체 비디오 재생 시간
                            curProgressBar: 0,
                            maxProgressBar: 0,
                            preVolume: 50, // 볼륨 조절
                            volume: 50, // 볼륨 조절
                            soundOn: true,
                        };


                        this.setState(() => {
                            return {eventMap: Object.assign({}, eventMap, resetEventMap)};
                        });
                    } else if (curProgressBar >= maxProgressBar) {
                        let {playingAlbum} = playingState;
                        let {playList} = playingAlbum;
                        clearInterval(this.interverId);
                        if (playList.length === 1) {
                            player.seekTo(0);
                        }
                        playControllerEvents.onChangeNextVideo();
                        /*
                         한곡 연속 재생일시 초기화 설정을 해주면 된다
                         */
                    } else {
                        return;
                    }

                });
            }, 1000);
        } else {
            clearInterval(this.interverId);
        }
    },

    //playController
    _toTimeString(seconds) {
        if(seconds) {
            let timeArr = (new Date(seconds * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/);
            let time = timeArr[0];
            time = time.replace(/00:/, "");
            return time;

        }
        return "00:00";



    },

    _changeBarBackgroundSize(ele,val){
        let max = ele.max,
            min = ele.min;
        ele.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
        ele.style.backgroundImage = "-webkit-gradient(linear, 0% 0%, 0% 0%, color-stop(0%, #d81c5c), color-stop(0%, #d81c5c))";
        ele.style.backgroundImage = "-moz-linear-gradient(#e91e63, #d81c5c)";
        ele.style.backgroundImage = "-o-linear-gradient(#e91e63, #d81c5c)";
        ele.style.backgroundImage = "linear-gradient(#e91e63, #d81c5c)";



    }

};

export default privatePlayController;