import utility from '../utility/utility';


const ACTION_CONFIG = {
    addPlayList : "addPlayList",
    deletePlayList : "deletePlayList",
    resetPlayList : "resetPlayList",
    deleteAlbum : "deleteAlbum",
    getAllAlbum : "getAllAlbum",
    addAlbum : "addAlbum"
};

const playControllerEvents = {

    onPlayVideo(player) {

        if(player){

            let {eventMap} = this.state;
            let {playing} = eventMap;

            console.log("player",player);
            console.log("playing",playing);
            if(!playing) {
                this.setState((state)=>{
                    return {
                        eventMap: Object.assign({}, eventMap, {
                            playing: true ,
                            totalTime: '00:00', // 전체 비디오 재생 시간
                            maxProgressBar: 0,
                        }),
                    }
                },()=>{
                    player.playVideo();
                    this._setDuration(player);
                });
            }
        }
    },

    onPauseVideo(player) {
        if(player) {
            let {eventMap} = this.state;
            if (eventMap.playing) {
                this.setState((state) => {
                    return {
                        eventMap: Object.assign({}, eventMap, {playing: false}),
                    }
                }, () => {
                    player.pauseVideo(); //  이게 state를 바꾸고 2번으로 바꾸는 작업 계속 발생한다
                    this._setCurrentTime(player)
                });
            }

        }
        event.stopPropagation();
        event.preventDefault();
    },

    onChangeNextVideo() {
        // this.setState({ videoId: selectedVideo.id.next });


        let { player } = this.state;

        let prevKey = -1;
        let prevPlayingData = null;


        if(player) {

            let newEventMap = {
                playing: false,
                curTime: '00:00', // 현재 재생 시간
                totalTime: '00:00', // 전체 비디오 재생 시간
                curProgressBar: 0,
                maxProgressBar: 0,
            };

            let { playingState } = this.state;
            let { playingAlbum, playingKey, playingData } = playingState;
            prevKey = playingKey;
            prevPlayingData = playingData;
            let { playList } = playingAlbum;


            if(playList.length === 1){
                return ;
            }


            this.setState((state) => {
                let {playingState, currentAlbum, eventMap} = state;
                let {playingAlbum, playingKey} = playingState;

                let currentKey = playingKey + 1;
                let {playList} = playingAlbum;

                if (currentKey > playList.length - 1) {
                    currentKey = 0;
                }

                let newSelectedData = null;
                let newSelectedKey = -1;
                if (playingAlbum._id === currentAlbum._id) {
                    newSelectedData = playList[currentKey];
                    newSelectedKey = currentKey;
                }



                return {
                    playingState: Object.assign({}, playingState, {
                        playingData: playList[currentKey],
                        playingKey: currentKey,
                    }),
                    selectedData: newSelectedData,
                    selectedKey: newSelectedKey,
                    eventMap: Object.assign({}, eventMap, newEventMap),

                };
            }, () => {
                let {player,playingState,eventMap} = this.state;
                let {playingData,playingKey} = playingState;
                let {playing} = eventMap;

                if(prevPlayingData.videoId === playingData.videoId && playingKey !== prevKey){
                    clearInterval(this.interverId);
                    player.seekTo(0);
                    if(!playing){

                        playControllerEvents.onPlayVideo(player);
                        return;
                    }

                }

                if (player) {
                    clearInterval(this.interverId);
                    this._setDuration(player);
                }
            });

        }

    },

    onChangePrevVideo() {


        let { player } = this.state;
        let prevKey = -1;
        let prevPlayingData = null;

        if(player) {
            let newEventMap = {
                playing: false,
                curTime: '00:00', // 현재 재생 시간
                totalTime: '00:00', // 전체 비디오 재생 시간
                curProgressBar: 0,
                maxProgressBar: 0,
            };

            let {eventMap,playingState} = this.state;
            let { playingAlbum,playingKey, playingData } = playingState;
            prevKey = playingKey;
            prevPlayingData = playingData;
            let {playList} = playingAlbum;
            if(playList.length === 1){
                return ;
            }

            this.setState((state) => {
                let {playingState, currentAlbum} = state;
                let {playingAlbum, playingKey} = playingState;
                let currentKey = playingKey - 1;
                let {playList} = playingAlbum;
                if (currentKey < 0) {

                    currentKey = playList.length - 1;
                }
                let newSelectedData = null;
                let newSelectedKey = -1;
                if (playingAlbum._id === currentAlbum._id) {
                    newSelectedData = playList[currentKey];
                    newSelectedKey = currentKey;
                }
                return {
                    playingState: Object.assign({}, playingState, {
                        playingData: playList[currentKey],
                        playingKey: currentKey,
                    }),
                    selectedData: newSelectedData,
                    selectedKey: newSelectedKey,
                    eventMap: Object.assign({}, eventMap, newEventMap),
                };
            }, () => {
                let {player,playingState,eventMap} = this.state;
                let {playingData,playingKey} = playingState;
                let {playing} = eventMap;

                if(prevPlayingData.videoId === playingData.videoId && playingKey !== prevKey){
                    clearInterval(this.interverId);
                    player.seekTo(0);
                    if(!playing){

                        playControllerEvents.onPlayVideo(player);
                        return;
                    }

                }
                if (player) {
                    clearInterval(this.interverId);
                    this._setDuration(player);
                }
            });
        }

    },

    moveSeekBar(player){
        let bar = utility.$selector("#seekBar");
        let maxVal = bar.max;
        let curVal = bar.value;
        //2초 전까지 클릭을 막는다
        if(maxVal-2 > curVal) {
            player.seekTo(curVal, true);
        }
    },

    moveVolumeBar(player){
        if(player) {
            let bar = utility.$selector("#volumeBar");
            let volumeVal = bar.value;
            this.setState((state) => {
                let {eventMap}  = state;
                return {
                    eventMap: Object.assign({}, eventMap, {volume: volumeVal, preVolume: volumeVal}),
                }
            },() => {
                let {eventMap}  = this.state;
                player.setVolume(volumeVal);
                if (eventMap.volume < 1) {
                    playControllerEvents.offSound(player);
                }
                else {
                    playControllerEvents.onSound(player)
                }
            });
        }
    },

    onSound(player){
        if (player) {
            this.setState((state) => {
                let {eventMap} = state;
                let {preVolume} = eventMap;
                return {
                    eventMap: Object.assign({}, eventMap, {soundOn: true, volume: preVolume})
                };
            }, () => {
                player.unMute();
            });
        }

    },

    offSound(player){

        if (player) {
            this.setState((state) => {
                    let {eventMap} = state;
                    return {
                        eventMap: Object.assign({}, eventMap, {soundOn: false, volume: 0})
                    }
                }
                ,() => {
                    player.mute();

                });
        }
    }
};

export default playControllerEvents;