/**
 * Created by donghyunkim on 2017. 5. 24..
 */
import utility from '../utility/utility';
const ACTION_CONFIG = {
    addPlayList : "addPlayList",
    deletePlayList : "deletePlayList",
    resetPlayList : "resetPlayList",
    deleteAlbum : "deleteAlbum",
    getAllAlbum : "getAllAlbum",
    addAlbum : "addAlbum",
    updateAlbum:"updateAlbum"
};

const privateAlbumList = {
    _getAllAlbumReqListener(action,res){

        let jsonAlbumList = JSON.parse(res.currentTarget.responseText);

        if(!jsonAlbumList.err){
            jsonAlbumList = jsonAlbumList.jsonAlbumList;
        }

        switch (action){
            // album 삭제 시
            case ACTION_CONFIG.deleteAlbum: this.setState((state)=>{
                //console.log(jsonAlbumList);
                // 엘범 리스크가 존재 하는 경우

                let resetEventMap= {
                    playing: false,
                    curTime: '00:00', // 현재 재생 시간
                    totalTime: '00:00', // 전체 비디오 재생 시간
                    curProgressBar: 0,
                    maxProgressBar: 0,
                    preVolume: 50, // 볼륨 조절
                    volume: 50, // 볼륨 조절
                    soundOn: true,
                };

                let { playingState, currentAlbum, deletedAlbumId} = state;
                let newState = {
                    deleteVideoCheckList : [],
                    checkIdxList : [],
                    selectAllIsChecked : false,
                };
                if(!jsonAlbumList.err){


                    //현재 play되고 있는 album이 존재하고 선택된 album과 play 되고 있는 album이 다를 경우
                    if(playingState){
                        let { playingAlbum,playingData, playingKey } = playingState;
                        if(currentAlbum._id !== playingAlbum._id || deletedAlbumId !== playingAlbum._id) {

                            //현재 살아 있다면
                            return Object.assign({}, newState, {
                                albumList: jsonAlbumList,
                                currentAlbum: playingAlbum,
                                selectedData: playingData,
                                selectedKey: playingKey,
                            });
                        }
                        clearInterval(this.interverId);
                    }


                    return Object.assign({}, newState, {
                        albumList : jsonAlbumList,
                        currentAlbum: jsonAlbumList[0],
                        selectedData : null,
                        selectedKey : -1,
                        player: null,
                        playingState : null,
                        eventMap : resetEventMap
                    });
                }

                clearInterval(this.interverId);
                return Object.assign({}, newState, {
                    albumList : null,
                    currentAlbum: null,
                    selectedData : null,
                    selectedKey : -1,
                    player: null,
                    playingState : null,
                    eventMap : resetEventMap
                });
            });
                break;
            case ACTION_CONFIG.getAllAlbum: this.setState((state)=>{
                    if(!jsonAlbumList.err){
                        let { currentAlbum } = state;
                        if(currentAlbum){
                            return {
                                albumList : jsonAlbumList,
                                currentAlbum: currentAlbum,
                            }
                        }

                        return {
                            albumList : jsonAlbumList,
                            currentAlbum: jsonAlbumList[0],
                        }

                    }
                }
            );
                break;
            case ACTION_CONFIG.addAlbum: this.setState((state)=>{
                if(!jsonAlbumList.err){
                    // 최근에 추가된 album을 선택 해야 함
                    let currentAlbumKey = jsonAlbumList.length-1;
                    return {
                        albumList : jsonAlbumList,
                        currentAlbum: jsonAlbumList[currentAlbumKey],
                        isAddClicked : false,
                    }
                }
            });
                break;
            case ACTION_CONFIG.updateAlbum: this.setState((state)=>{
                if(!jsonAlbumList.err){
                    // 최근에 추가된 album을 선택 해야 함
                    let { currentAlbum } = state;
                    let newCurrentAlbum = jsonAlbumList.filter((val)=> {
                        return currentAlbum._id === val._id;
                    })[0];
                    return {
                        albumList : jsonAlbumList,
                        currentAlbum: newCurrentAlbum,
                        isAlbumUpdateClicked : false,
                    }
                }
            });
                break;

            default: break;

        }


    },

    _albumReqListener(action,res){

        utility.runAjax(privateAlbumList._getAllAlbumReqListener.bind(null,action),"GET","/albumList/getAllAlbumList");

    },

};
export default privateAlbumList
