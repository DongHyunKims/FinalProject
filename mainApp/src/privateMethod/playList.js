/**
 * Created by donghyunkim on 2017. 5. 24..
 */

import utility from '../utility/utility';
import config from '../utility/config';
import privateAlbumList from  './albumList'
const ACTION_CONFIG = {
    addPlayList : "addPlayList",
    deletePlayList : "deletePlayList",
    resetPlayList : "resetPlayList",
    deleteAlbum : "deleteAlbum",
    getAllAlbum : "getAllAlbum",
    addAlbum : "addAlbum",
    updateAlbum:"updateAlbum"
};
const privatePlayList = {

    _getAlbumReqListener(action, res){
        let jsonData = JSON.parse(res.currentTarget.responseText);
        switch (action) {
            case  ACTION_CONFIG.addPlayList :
                this.setState((state) => {
                    let { playingState, currentAlbum } = state;

                    let newPlayingState = {
                        playingAlbum : jsonData
                    };

                    if(playingState){
                        let {playingAlbum} = playingState;
                        if(playingAlbum._id !== currentAlbum._id){
                            return {
                                selectedVideoArr: [],
                                isSelectedArr: false,
                                isAllClearAddBtn: true,
                                totalDuration: 0,
                                currentAlbum: jsonData,
                                selectedData: null,
                                selectedKey: -1,
                            }
                        }
                        return {
                            playingState : Object.assign({},playingState,newPlayingState),
                            selectedVideoArr: [],
                            isSelectedArr: false,
                            isAllClearAddBtn: true,
                            totalDuration: 0,
                            currentAlbum: jsonData,
                        }

                    }
                    return {
                        // playingState : newPlayingState,
                        selectedVideoArr: [],
                        isSelectedArr: false,
                        isAllClearAddBtn: true,
                        totalDuration: 0,
                        currentAlbum: jsonData,
                        selectedData: null,
                        selectedKey: -1,
                    }


                });
                break;

            case ACTION_CONFIG.deletePlayList  :
                this.setState((state) => {

                    let newCurrentAlbum = jsonData;

                    let {playingState, checkIdxList, selectAllIsChecked, currentAlbum, eventMap}  = state;
                    //
                    // let prePlayingDataId = null;


                    //어떤 동영상이 플레이 되고 있으면서 전체 선택이 안된 경우
                    let newState = {
                        deleteVideoCheckList: [],
                        checkIdxList: [],
                        selectAllIsChecked: false,
                        currentAlbum: newCurrentAlbum
                    };

                    //플레이 되고 있다면
                    if (playingState) {


                        let {playingKey, playingAlbum,playingData} = playingState;
                        // prePlayingDataId = playingData._id;
                        let {playList} = newCurrentAlbum;


                        if (!selectAllIsChecked) {
                            if (playingAlbum._id !== currentAlbum._id) {
                                return Object.assign({}, newState, {
                                    selectedData: null,
                                    selectedKey: -1,
                                });
                            }

                            //삭제 리스트에 있는 경우
                            if (checkIdxList.indexOf(playingKey) !== -1) {

                                //clearInterval(this.interverId);
                                let newEventMap = {
                                    playing: false,
                                    curTime: '00:00', // 현재 재생 시간
                                    totalTime: '00:00', // 전체 비디오 재생 시간
                                    curProgressBar: 0,
                                    maxProgressBar: 0,
                                };

                                return Object.assign({}, newState, {
                                    playingState:  {
                                        playingAlbum: newCurrentAlbum,
                                        playingData: playList[0],
                                        playingKey: 0,
                                    },
                                    selectedData: playList[0],
                                    selectedKey: 0,
                                    eventMap : Object.assign({}, eventMap, newEventMap),
                                });
                            }

                            let length = checkIdxList.filter((val) => {
                                return val < playingKey;
                            }).length;

                            let currentPlayingKey = playingKey - length;
                            return Object.assign({}, newState, {
                                playingState: Object.assign({}, playingState, {
                                    playingAlbum: newCurrentAlbum,
                                    playingData: playList[currentPlayingKey],
                                    playingKey: currentPlayingKey,
                                }),
                                selectedData: playList[currentPlayingKey],
                                selectedKey: currentPlayingKey,
                            });

                        } else {
                            if (playingAlbum._id !== currentAlbum._id) {
                                return Object.assign({}, newState, {
                                    selectedData: null,
                                    selectedKey: -1,
                                });
                            }
                        }
                    }



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


                    //전부 삭제되면 막아야 한다.
                    return Object.assign({}, newState, {
                        player: null,
                        playingState: null,
                        selectedData: null,
                        selectedKey: -1,
                        eventMap: resetEventMap,
                    });


                },()=>{
                    const {HTTP_METHOD} = config;
                    let {playingState} = this.state;
                    if(playingState) {
                        let {playingAlbum} = playingState;
                        if (playingAlbum.playList.length !== 1) {
                            clearInterval(this.interverId);
                        }
                    }
                    utility.runAjax(privateAlbumList._getAllAlbumReqListener.bind(null, ACTION_CONFIG.getAllAlbum), HTTP_METHOD.GET, "/albumList/albums");

                });
                break;
            case ACTION_CONFIG.resetPlayList :
                this.setState((state, props) => {

                    let {playingState}  = state;
                    //무언가 play 되고있다
                    if (playingState) {

                        let {playingAlbum, playingData, playingKey} = playingState;
                        if (jsonData._id !== playingAlbum._id) {

                            return {
                                selectedData: playingData,
                                selectedKey: -1,
                                deleteVideoCheckList: [],
                                checkIdxList: [],
                                selectAllIsChecked: false,
                                currentAlbum: jsonData
                            };
                        }

                        return {
                            selectedData: playingData,
                            selectedKey: playingKey,
                            deleteVideoCheckList: [],
                            checkIdxList: [],
                            selectAllIsChecked: false,
                            currentAlbum: jsonData
                        };
                    }

                    return {
                        selectedData: null,
                        selectedKey: -1,
                        deleteVideoCheckList: [],
                        checkIdxList: [],
                        selectAllIsChecked: false,
                        currentAlbum: jsonData
                    };

                });
        }
    },


    _deletePlayListReqListener(albumId, res){
        const {HTTP_METHOD} = config;
        utility.runAjax(privatePlayList._getAlbumReqListener.bind(null, ACTION_CONFIG.deletePlayList), HTTP_METHOD.GET, "/albumList/albums/" + albumId);
    },

};

export default privatePlayList;