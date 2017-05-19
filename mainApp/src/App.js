
import React, { Component } from 'react';

import {Redirect} from 'react-router-dom'
import './App.css';

//component
import Header from './components/headerComponent/Header'
import Nav from './components/navComponent/Nav'
import MainList from './components/mainListComponent/MainList'
import PlayListComponent from './components/playListComponent/PlayList';
import PlayController from './components/playControllerComponent/PlayController';


//libs, config
import utility from './utility/utility';
import config from './utility/config';
import moment from 'moment'


//events
import playListEvents from "./events/playListEvents";
import albumListEvents from "./events/albumListEvents";
import searchListEvents from "./events/searchListEvents";
import playControllerEvents from "./events/playControllerEvents";

const ACTION_CONFIG = {
    addPlayList : "addPlayList",
    deletePlayList : "deletePlayList",
    resetPlayList : "resetPlayList",
    deleteAlbum : "deleteAlbum",
    getAllAlbum : "getAllAlbum",
    addAlbum : "addAlbum",
    updateAlbum:"updateAlbum"
};

class App extends Component {
    constructor(props){
        super(props);
        this.state = {

            //albumList
            albumList : null,

            //선택된 현재 앨범
            currentAlbum: null,
            updateAlbum: null,

            isAddClicked : false,
            isAlbumUpdateClicked : false,


            //playList,
            //삭제 하는  video id
            deleteVideoCheckList : [],
            //삭제 하는  video idx
            checkIdxList : [],
            // 삭제 시 선택 하는 것
            selectAllIsChecked : false,
            // play되는 player
            player: null,
            //선택된 video 데이터
            selectedData : null,
            //선택된 video index
            selectedKey : -1,


            //현재 play되고 있는 video 데이터 (video, key, )
            playingState : null,



            //searchList
            selectedVideoArr : [],
            isSelectedArr : false,
            isAllClearAddBtn : false,
            items : [],
            nextPageToken : "",
            isSearched : false,
            totalDuration : 0,

            //mainList
            navIdx: "2",




            //video controller
            videoState: null,
            // videoId: selectedVideo.id.current,
            //player: null,
            eventMap: {
                playing: false,
                curTime: '00:00', // 현재 재생 시간
                totalTime: '00:00', // 전체 비디오 재생 시간
                curProgressBar: 0,
                maxProgressBar: 0,
                preVolume: 50, // 볼륨 조절
                volume: 50, // 볼륨 조절
                soundOn: true,
            },


        };


        this.userId = sessionStorage.getItem("id");

        this._getAlbumReqListener = this._getAlbumReqListener.bind(this);
        this._deletePlayListReqListener = this._deletePlayListReqListener.bind(this);
        playListEvents.onReady = playListEvents.onReady.bind(this);


        //playList
        playListEvents.playListClickHandler = playListEvents.playListClickHandler.bind(this);
        playListEvents.checkClickHandler = playListEvents.checkClickHandler.bind(this);
        playListEvents.selectAllBtnClickHandler = playListEvents.selectAllBtnClickHandler.bind(this);
        playListEvents.deletePlayListBtnClickHandler = playListEvents.deletePlayListBtnClickHandler.bind(this);
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);

       //albumList
        this._getAllAlbumReqListener = this._getAllAlbumReqListener.bind(this);
        albumListEvents.albumClickHandler = albumListEvents.albumClickHandler.bind(this);
        albumListEvents.deleteAlbumClickHandler = albumListEvents.deleteAlbumClickHandler.bind(this);
        this._albumReqListener = this._albumReqListener.bind(this);
        albumListEvents.addAlbumSubmitHandler = albumListEvents.addAlbumSubmitHandler.bind(this);
        albumListEvents.addItemClickHandler = albumListEvents.addItemClickHandler.bind(this);
        albumListEvents.addItemCancelClickHandler = albumListEvents.addItemCancelClickHandler.bind(this);
        albumListEvents.updateAlbumClickHandler  = albumListEvents.updateAlbumClickHandler.bind(this);
        albumListEvents.updateItemClickHandler = albumListEvents.updateItemClickHandler.bind(this);
        albumListEvents.updateItemCancelClickHandler = albumListEvents.updateItemCancelClickHandler.bind(this);


        //searchList
        this.searchUrl = "";
        this.nextPageToken = "";

        searchListEvents.searchVideo = searchListEvents.searchVideo.bind(this);
        searchListEvents.addSelectedVideo = searchListEvents.addSelectedVideo.bind(this);
        searchListEvents.delSelectedVideo = searchListEvents.delSelectedVideo.bind(this);
        searchListEvents.changeIsAllClearAddBtn = searchListEvents.changeIsAllClearAddBtn.bind(this);
        searchListEvents.addSelectedVideoToAlbum = searchListEvents.addSelectedVideoToAlbum.bind(this);
        searchListEvents.moreVideoList = searchListEvents.moreVideoList.bind(this);
        searchListEvents.initSearchList = searchListEvents.initSearchList.bind(this);
        this._getVideoInfo=this._getVideoInfo.bind(this);
        this._promiseSearch=this._promiseSearch.bind(this);
        this._promiseGetViewCount=this._promiseGetViewCount.bind(this);
        this._promiseGetDuration=this._promiseGetDuration.bind(this);


        //nav
        this.navClickHandler = this.navClickHandler.bind(this);


        //playController
        this.interverId = null;
        playControllerEvents.onChangePrevVideo = playControllerEvents.onChangePrevVideo.bind(this);
        playControllerEvents.onChangeNextVideo = playControllerEvents.onChangeNextVideo.bind(this);
        playControllerEvents.onPlayVideo = playControllerEvents.onPlayVideo.bind(this);
        playControllerEvents.onPauseVideo = playControllerEvents.onPauseVideo.bind(this);
        this._setCurrentTime = this._setCurrentTime.bind(this);
        this._setDuration = this._setDuration.bind(this);
        playControllerEvents.moveSeekBar = playControllerEvents.moveSeekBar.bind(this);
        //sound
        playControllerEvents.moveVolumeBar = playControllerEvents.moveVolumeBar.bind(this);
        playControllerEvents.onSound = playControllerEvents.onSound.bind(this);
        playControllerEvents.offSound = playControllerEvents.offSound.bind(this);

        //

        this.reRender = this.reRender.bind(this);

    }

    componentDidMount(){


        utility.runAjax(this._getAllAlbumReqListener.bind(null,ACTION_CONFIG.getAllAlbum),"GET","/albumList/getAllAlbumList/"+this.userId);
    }


    //albumList



    _albumReqListener(action,res){

        console.log(this.userId);
        utility.runAjax(this._getAllAlbumReqListener.bind(null,action),"GET","/albumList/getAllAlbumList/"+this.userId);

    }


    _getAllAlbumReqListener(action,res){
        //console.log("jsonAlbumList",res.currentTarget.responseText);

        let jsonAlbumList = JSON.parse(res.currentTarget.responseText);

        if(!jsonAlbumList.err){
            jsonAlbumList = jsonAlbumList.jsonAlbumList;
        }
        console.log("jsonAlbumList",jsonAlbumList);

        switch (action){

            // album 삭제 시
            case ACTION_CONFIG.deleteAlbum: this.setState((state)=>{
                //console.log(jsonAlbumList);
                // 엘범 리스크가 존재 하는 경우
                let newState = {
                    deleteVideoCheckList : [],
                    checkIdxList : [],
                    selectAllIsChecked : false,
                };
                if(!jsonAlbumList.err){
                    let { playingState, currentAlbum } = state;
                    let { playingAlbum,playingData, playingKey } = playingState;
                    //현재 play되고 있는 album이 존재하고 선택된 album과 play 되고 있는 album이 다를 경우
                    if(playingState  && (currentAlbum._id !== playingAlbum._id)){

                            let len = jsonAlbumList.filter((val)=>{
                                return val._id === playingAlbum._id;
                            }).length;

                            if(len){
                                return Object.assign({}, newState, {
                                    albumList: jsonAlbumList,
                                    currentAlbum: playingAlbum,
                                    selectedData: playingData,
                                    selectedKey: playingKey,
                                });
                            }else {
                                return Object.assign({}, newState, {
                                    albumList: jsonAlbumList,
                                    currentAlbum: currentAlbum,
                                    player: null,
                                    selectedData: null,
                                    selectedKey: -1,
                                });
                            }

                    }


                    return Object.assign({}, newState, {
                        albumList : jsonAlbumList,
                        currentAlbum: jsonAlbumList[0],
                        selectedData : null,
                        selectedKey : -1,
                        player: null,
                        playingState : null,
                    });




                }

                // 마지막 앨범을 삭제 한 경우
                return Object.assign({}, newState, {
                    albumList : null,
                    currentAlbum: null,
                    selectedData : null,
                    selectedKey : -1,
                    player: null,
                    playingState : null,
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


    }


    _getAlbumReqListener(action,res){
        let jsonData = JSON.parse(res.currentTarget.responseText);
        switch (action){
            case  ACTION_CONFIG.addPlayList : this.setState({
                selectedVideoArr: [],
                isSelectedArr: false,
                isAllClearAddBtn: true,
                totalDuration:0,
                currentAlbum: jsonData
            });
            break;

            case ACTION_CONFIG.deletePlayList  : this.setState((state)=>{

                let currentAlbum = jsonData;
                let { playingState, checkIdxList, selectAllIsChecked}  = state;
                //어떤 동영상이 플레이 되고 있으면서 전체 선택이 안된 경우
                let newState = {
                    deleteVideoCheckList: [],
                    checkIdxList: [],
                    selectAllIsChecked: false,
                    currentAlbum: jsonData
                };


                if(playingState && !selectAllIsChecked){
                    let { playingKey } = playingState;
                    let { playList } = currentAlbum;
                    //삭제 리스트에 있는 경우
                    if(checkIdxList.indexOf(playingKey) !== -1){
                        return Object.assign({}, newState, {
                            playingState: Object.assign({}, playingState, {
                                playingAlbum: jsonData,
                                playingData: playList[0],
                                playingKey: 0,
                            }),
                            selectedData : playList[0],
                            selectedKey : 0,
                        });
                    }

                    let length = checkIdxList.filter((val)=>{
                        return val < playingKey;
                    }).length;
                     let currentPlayingKey = playingKey-length;
                      return Object.assign({}, newState, {
                          playingState: Object.assign({}, playingState, {
                              playingAlbum: currentAlbum,
                              playingData: playList[currentPlayingKey],
                              playingKey: currentPlayingKey,
                          }),
                          selectedData : playList[currentPlayingKey],
                          selectedKey : currentPlayingKey,
                      });

                }
                return Object.assign({}, newState, {
                    playingState : null,
                    selectedData: null,
                    selectedKey: -1,
                });
            },()=>{
                utility.runAjax(this._getAllAlbumReqListener.bind(null,ACTION_CONFIG.getAllAlbum),"GET","/albumList/getAllAlbumList");
            });
            break;
            case ACTION_CONFIG.resetPlayList : this.setState((state,props)=>{
                let { playingState}  = state;
                //무언가 play 되고있다
                if(playingState) {
                    let { playingAlbum, playingData, playingKey  } = playingState;
                    if (jsonData._id !== playingAlbum._id) {
                        return {
                            selectedData:  playingData,
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
    }


    _deletePlayListReqListener(_id,res){
        utility.runAjax(this._getAlbumReqListener.bind(null,ACTION_CONFIG.deletePlayList), "GET", "/albumList/getAlbum/"+_id);
    }

    //searchList

    _promiseSearch(url){
      return new Promise(function(resolve, reject){
        utility.runAjax(function(e){
          let data = JSON.parse(e.target.responseText);
          this.nextPageToken = data.nextPageToken;
          let videoArr = data.items.map((item, index) => {
              return {
                  videoId : item.id.videoId,
                  title : item.snippet.title,
                  publishedAt : item.snippet.publishedAt,
                  thumnail : item.snippet.thumbnails.default.url
              }
          });
          if(typeof data !== "object"){
            reject("wrong data")
          }else{
            resolve(videoArr);
          }
        }.bind(this), "GET", url)
      }.bind(this))
    }

    _promiseGetViewCount(videoArr){
      let count = 0;
      return new Promise(function(resolve, reject){
        videoArr.forEach((item, index) => {
          let statisticsUrl = config.DEFAULT_YOUTUBE_DATA_URL + "?part=statistics&id="+item.videoId+"&key="+config.YOUTUBE_KEY+"";
          utility.runAjax(function(e){
            let data = JSON.parse(e.target.responseText);
            let items = data['items'][0];
              if (typeof (items) != 'undefined') {
                  let viewCount = items.statistics.viewCount;
                  videoArr[index].viewCount = viewCount;
                  count++;
                  if (count === videoArr.length) {
                      if (typeof videoArr !== "object") {
                          reject("wrong data")
                      } else {
                          resolve(videoArr);
                      }
                  }
              }
          }.bind(this), "GET", statisticsUrl)
        })
      })
    }

    _promiseGetDuration(videoArr){

      let count = 0;
      return new Promise(function(resolve, reject){
        videoArr.forEach((item, index) => {

          let contentDetailsUrl =config.DEFAULT_YOUTUBE_DATA_URL +"?part=contentDetails&id="+item.videoId+"&key="+config.YOUTUBE_KEY+"";
          utility.runAjax(function(e){
            let data = JSON.parse(e.target.responseText);
            let duration = data.items[0].contentDetails.duration;
            let changedDuration = "";
            changedDuration = moment.duration(duration, moment.ISO_8601)
            videoArr[index].duration = changedDuration._milliseconds;
            count++;
            if(count === videoArr.length){
              if(typeof videoArr !== "object"){
                reject("wrong data")
              }else{
                resolve(videoArr);
              }
            }
          }.bind(this), "GET", contentDetailsUrl)
        })
      })
    }

    _getVideoInfo(url){
      this._promiseSearch(url)
        .then(function(videoArr){
          return this._promiseGetViewCount(videoArr)
        }.bind(this))
        .then(function(videoArr){
          return this._promiseGetDuration(videoArr)
        }.bind(this))
        .then(function(videoArr){
          this.setState({
              items : this.state.items.concat(videoArr),
              nextPageToken : this.nextPageToken
          })
        }.bind(this))
    }

    //navComponent
    navClickHandler(event){
        let navIdx = event.target.id;
        this.setState(()=>{

            let newState = {
                navIdx : navIdx
            };

            if(navIdx === "1"){
                return Object.assign({},newState,{
                    selectedVideoArr : [],
                    isSelectedArr : false,
                    isAllClearAddBtn : false,
                    totalDuration : 0
                });
            }

            return newState;
        },()=>{
            let { navIdx } = this.state;
            if(navIdx==="2"){
                utility.runAjax(this._getAllAlbumReqListener.bind(null,ACTION_CONFIG.getAllAlbum),"GET","/albumList/getAllAlbumList/" + this.userId);
            }
        });

    }


    //playController
    _toTimeString(seconds) {
        if(seconds) {
            let timeArr = (new Date(seconds * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/);
            let time = timeArr[0];
            time = time.replace(/00:/, "");
            return time;

        }
        return "00:00";

    }



    onPlayerStateChange(player,event) {
        console.log("onPlayerStateChange");
        if (event !== undefined){
            this.setState({ videoState: event.data },()=>{
                let { videoState } = this.state;
                if(videoState===1){
                    playControllerEvents.onPlayVideo(player);
                }else if(videoState===2) {
                    playControllerEvents.onPauseVideo(player);
                }
                else{
                    return;
                }
            });


        }

    }

   _setDuration(player) {
       //console.log("player111111111", player.getDuration());
       let {eventMap} = this.state;
       let time = Math.ceil(player.getDuration());
       this.setState({
           eventMap: Object.assign({}, eventMap, {
               totalTime: this._toTimeString(time),
               maxProgressBar: time
           })
       },  this._setCurrentTime.bind(null, player));
   };

    _setCurrentTime(player) {
        let {eventMap} = this.state;
        if (eventMap.playing){

            this.interverId = setInterval(() => {
                let time = Math.ceil(player.getCurrentTime());
                            this.setState((state)=>{

                            let {eventMap} = state;
                            let sound = false;
                            if(eventMap.soundOn){
                                sound = true;
                            }
                            return {
                                eventMap: Object.assign({}, eventMap, { curTime: this._toTimeString(time), curProgressBar: time, sound : sound})
                            }
                        },()=>{
                            let {eventMap, playingState} = this.state;
                            let {curProgressBar, maxProgressBar, playing} = eventMap;
                            //전부 삭제 되었으면
                            if(!playingState){
                                let resetEventMap = { playing: false,
                                    curTime: '00:00', // 현재 재생 시간
                                    totalTime: '00:00', // 전체 비디오 재생 시간
                                    curProgressBar: 0,
                                    maxProgressBar: 0,
                                    preVolume: 50, // 볼륨 조절
                                    volume: 50, // 볼륨 조절
                            soundOn: true,
                        };
                        clearInterval(this.interverId);
                        this.setState(()=>{
                            return { eventMap: Object.assign({}, eventMap, resetEventMap)};
                        });
                    }else if(curProgressBar >= maxProgressBar){

                        //끝나고 다음 행동을 여기서 정하면된다
                        playControllerEvents.onChangeNextVideo();


                        /*
                            한곡 연속 재생일시 초기화 설정을 해주면 된다

                            this.onPauseVideo(player);
                         */
                    }else{
                        return;
                    }

                });
            }, 1000);
        }else{
            // console.log("fasdfasdfsadfasdf");
            clearInterval(this.interverId);
        }
    }

    componentWillUnmount(){


      location.reload();

    }


    reRender(){
      this.forceUpdate();
    }

    render() {

      //console.log(this.state.totalDuration)
      let {
          albumList,
          checkIdxList,
          selectAllIsChecked,
          currentAlbum,
          items,
          isSelectedArr,
          isAllClearAddBtn,
          navIdx,
          selectedData,
          selectedKey,
          isSearched,
          player,
          eventMap,
          playingState,
          isAddClicked,
          isAlbumUpdateClicked,
          updateAlbum

      } = this.state;


      let playList = null;
      let albumTitle = null;
      let _id = null;

      if(currentAlbum){
          _id = currentAlbum._id;
          albumTitle = currentAlbum.title;
          playList = currentAlbum.playList;
      }

      let playingData = null;
      let playingAlbum = null;
      if(playingState) {
          playingAlbum = playingState.playingAlbum;
          playingData = playingState.playingData;
      }

      if(sessionStorage.getItem("id") === null){
        return(
          <Redirect to="/auth/login"/>
        )
      }



    return (
      <div className="App">



        <Header albumTitle={albumTitle} reRender={this.reRender}/>

        <div className="container">

            <PlayListComponent
                playList={playList}
                selectedData={selectedData}
                selectedKey={selectedKey}
                playState={playingState}


                checkIdxList={checkIdxList}
                selectAllIsChecked={selectAllIsChecked}
                onPlayerStateChange={this.onPlayerStateChange.bind(null,player)}
                onReady={playListEvents.onReady}
                playListClickHandler={playListEvents.playListClickHandler}
                deletePlayListBtnClickHandler={playListEvents.deletePlayListBtnClickHandler}
                selectAllBtnClickHandler={playListEvents.selectAllBtnClickHandler}
                checkClickHandler={playListEvents.checkClickHandler}
            />


            <MainList

                navIdx={navIdx}

                //albumList
                albumList={albumList}
                isAddClicked={isAddClicked}
                isAlbumUpdateClicked={isAlbumUpdateClicked}
                updateAlbum={updateAlbum}
                playingAlbum={playingAlbum}
                albumClickHandler={albumListEvents.albumClickHandler}
                deleteAlbumClickHandler={albumListEvents.deleteAlbumClickHandler}
                addAlbumSubmitHandler={albumListEvents.addAlbumSubmitHandler}
                addItemClickHandler={albumListEvents.addItemClickHandler}
                addItemCancelClickHandler={albumListEvents.addItemCancelClickHandler}
                updateAlbumClickHandler={albumListEvents.updateAlbumClickHandler}
                updateItemClickHandler={albumListEvents.updateItemClickHandler}
                updateItemCancelClickHandler={albumListEvents.updateItemCancelClickHandler}


                //searchList
                items={items}
                isSelectedArr={isSelectedArr}
                isAllClearAddBtn={isAllClearAddBtn}
                isSearched = {isSearched}



                searchVideo={searchListEvents.searchVideo}
                addSelectedVideo={searchListEvents.addSelectedVideo}
                delSelectedVideo={searchListEvents.delSelectedVideo}
                changeIsAllClearAddBtn={searchListEvents.changeIsAllClearAddBtn}
                addSelectedVideoToAlbum={searchListEvents.addSelectedVideoToAlbum.bind(null,_id)}
                moreVideoList={searchListEvents.moreVideoList}
                initSearchList = {searchListEvents.initSearchList}
            />
            <Nav navClickHandler={this.navClickHandler}/>

        </div>
            <PlayController
                player={player}
                eventMap={eventMap}
                playingData={playingData}
                onChangePrevVideo={playControllerEvents.onChangePrevVideo}
                onChangeNextVideo={playControllerEvents.onChangeNextVideo}
                onPlayVideo={playControllerEvents.onPlayVideo.bind(null,player)}
                onPauseVideo={playControllerEvents.onPauseVideo.bind(null,player)}
                moveSeekBar={playControllerEvents.moveSeekBar.bind(null,player)}

                moveVolumeBar={playControllerEvents.moveVolumeBar.bind(null,player)}
                onSound={playControllerEvents.onSound.bind(null,player)}
                offSound={playControllerEvents.offSound.bind(null,player)}
            />

      </div>
    );
  }
}


export default App;
