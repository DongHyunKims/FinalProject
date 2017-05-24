/**
 * Created by donghyunkim on 2017. 5. 15..
 */

import utility from '../utility/utility';
import playControllerEvents from './playControllerEvents';




export default {
    //삭제버튼 클릭 handler
    deletePlayListBtnClickHandler(){
        let { deleteVideoCheckList,currentAlbum } = this.state;
        let { _id } = currentAlbum;
        let deleteData = {
            albumId : _id,
            deleteList: deleteVideoCheckList
        };
        let jsonData = JSON.stringify(deleteData);
        utility.runAjaxData(this._deletePlayListReqListener.bind(null,_id),"POST","/playList/deletePlayList", jsonData, "application/json");
    },
    //check click handler
    checkClickHandler(_id, duration,checkIdx, isChecked, event) {
        let {deleteVideoCheckList,checkIdxList,currentAlbum}  = this.state;
        //let items = videoData.items;
        let currentSelectAllIsChecked = false;

        let newDeleteVideoCheckList = [...deleteVideoCheckList];
        let newCheckIdxList = [...checkIdxList];

        let deleteData = {
            _id : _id,
            duration :duration,
        };
        //check 되어있지 않으면
        if(!isChecked){
            newDeleteVideoCheckList.push(deleteData);
            newCheckIdxList.push(checkIdx);
        }else{
            let idx =  checkIdxList.indexOf(checkIdx);
            newCheckIdxList.splice(idx,1);
            newDeleteVideoCheckList.splice(idx,1);
        }


        let playList = null;
        if(currentAlbum){
            playList = currentAlbum.playList;
            if(newCheckIdxList.length === playList.length){
                currentSelectAllIsChecked = true;
            }
        }

        this.setState({deleteVideoCheckList: newDeleteVideoCheckList,checkIdxList:  newCheckIdxList, selectAllIsChecked: currentSelectAllIsChecked});
        event.stopPropagation();
    },


    //전체선택 버튼 클릭 handler
    selectAllBtnClickHandler(){
        let { currentAlbum } = this.state;
        let playList = null;

        if(currentAlbum) {
            playList = currentAlbum.playList;
        }
        let {selectAllIsChecked} = this.state;
        let currentSelectAllIsChecked = false;
        let newDeleteVideoCheckList = [];
        let newCheckIdxList = [];


        if(!selectAllIsChecked){
            playList.forEach((val,idx)=>{
                let {_id, duration} = val;
                newDeleteVideoCheckList.push({_id:_id, duration:duration});
                newCheckIdxList.push(idx);
            });
            currentSelectAllIsChecked = true;
        }
        this.setState({deleteVideoCheckList: newDeleteVideoCheckList,checkIdxList:  newCheckIdxList, selectAllIsChecked : currentSelectAllIsChecked});

    },

    playListClickHandler(playList,key){

        let {eventMap} = this.state;


        let prevPlayingData = null;
        let prevPlayingAlbum = null;

        let prevKey = 0;


        this.setState((state) => {
            let {currentAlbum, playingState} = state;
            let newEventMap = null;
            if(playingState) {

                let {playingKey,playingData, playingAlbum} = playingState;
                prevKey = playingKey;
                prevPlayingData = playingData;
                prevPlayingAlbum = playingAlbum;
                if (key !== playingKey) {
                    newEventMap = {
                        playing: false,
                        curTime: '00:00', // 현재 재생 시간
                        totalTime: '00:00', // 전체 비디오 재생 시간
                        curProgressBar: 0,
                        maxProgressBar: 0,
                    };
                }
            }

            return {
                playingState: Object.assign({}, playingState, {
                    playingAlbum: currentAlbum,
                    playingData: playList[key],
                    playingKey: key,
                }),
                selectedData: playList[key],
                selectedKey: key,
                eventMap: Object.assign({}, eventMap, newEventMap),

            };
        }, ()=>{

            let {player, playingState, eventMap,selectedData,currentAlbum} = this.state;
            let {playingData} = playingState;

            



                if(prevPlayingAlbum) {
                    if (key === prevKey && currentAlbum._id === prevPlayingAlbum._id) {
                        return;
                        //clearInterval(this.interverId);

                    }


                    if (selectedData.videoId === prevPlayingData.videoId && currentAlbum._id !== prevPlayingAlbum._id) {
                        clearInterval(this.interverId);
                        player.seekTo(0);
                    }
                }




            let {playing} = eventMap;

            if(prevPlayingData) {






                if (prevPlayingData.videoId === playingData.videoId && key !== prevKey ) {
                    clearInterval(this.interverId);
                    player.seekTo(0);

                    if (!playing) {
                        playControllerEvents.onPlayVideo(player);
                        return;
                    }

                }
            }




            if(player) {
                this._setDuration(player);
            }
        });
    },

    onReady(event) {

        this.setState((state)=>{
            return { player: event.target }
        });

    },







}
