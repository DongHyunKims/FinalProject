
import React, { Component } from 'react';
import './App.css';

import Header from './components/headerComponent/Header'
import Nav from './components/navComponent/Nav'


import MainList from './components/mainListComponent/MainList'

import PlayListComponent from './components/playListComponent/PlayList';
import PlayController from './components/playControllerComponent/PlayController';
import utility from './utility/utility';
import moment from 'moment'




//임시 데이터
//const ALBUM_ID = "5907f898f91d33f1d974f254";


const ACTION_CONFIG = {
    addPlayList : "addPlayList",
    deletePlayList : "deletePlayList",
    resetPlayList : "resetPlayList",
    deleteAlbum : "deleteAlbum",
    getAllAlbum : "getAllAlbum",
    addAlbum : "addAlbum"
};


class App extends Component {
    constructor(props){
        super(props);
        this.state = {

            //albumList
            albumList : null,
            currentAlbum: null,
            isAddClicked : false,

            //playList,
            deleteVideoCheckList : [],
            checkIdxList : [],
            selectAllIsChecked : false,
            player: null,
            selectedData : null,
            selectedKey : -1,
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
            eventMap: { playing: false,
                curTime: '00:00', // 현재 재생 시간
                totalTime: '00:00', // 전체 비디오 재생 시간
                curProgressBar: 0,
                maxProgressBar: 0,
                preVolume: 50, // 볼륨 조절
                volume: 50, // 볼륨 조절
                soundOn: true,
            },



        };




        this.checkClickHandler = this.checkClickHandler.bind(this);
        this.selectAllBtnClickHandler = this.selectAllBtnClickHandler.bind(this);
        this._getAlbumReqListener = this._getAlbumReqListener.bind(this);
        this.deletePlayListBtnClickHandler = this.deletePlayListBtnClickHandler.bind(this);
        this._deletePlayListReqListener = this._deletePlayListReqListener.bind(this);
        this.onReady = this.onReady.bind(this);


        //playList
        this.playListClickHandler = this.playListClickHandler.bind(this);

       //albumList
        this._getAllAlbumReqListener = this._getAllAlbumReqListener.bind(this);
        this.albumClickHandler = this.albumClickHandler.bind(this);
        this.deleteAlbumClickHandler = this.deleteAlbumClickHandler.bind(this);
        this._albumReqListener = this._albumReqListener.bind(this);
        this.addAlbumSubmitHandler = this.addAlbumSubmitHandler.bind(this);
        this.addItemClickHandler = this.addItemClickHandler.bind(this);
        this.addItemCancelClickHandler = this.addItemCancelClickHandler.bind(this);



        //searchList
        this.UTUBEKEY = "AIzaSyDIkMgAKPVBeKhZcwdDo_ijqPiiK8DbYsA";
        this.searchUrl = "";
        this.videoArr = [];
        this.nextPageToken = "";

        this.searchVideo = this.searchVideo.bind(this);
        this.addSelectedVideo = this.addSelectedVideo.bind(this);
        this.delSelectedVideo = this.delSelectedVideo.bind(this);
        this.changeIsAllClearAddBtn = this.changeIsAllClearAddBtn.bind(this);
        this.addSelectedVideoToAlbum = this.addSelectedVideoToAlbum.bind(this);
        this.moreVideoList = this.moreVideoList.bind(this);

        this.getVideoInfo=this.getVideoInfo.bind(this);
        this.promiseSearch=this.promiseSearch.bind(this);
        this.promiseGetViewCount=this.promiseGetViewCount.bind(this);
        this.promiseGetDuration=this.promiseGetDuration.bind(this);


        this.initSearchList = this.initSearchList.bind(this);


        //nav
        this.navClickHandler = this.navClickHandler.bind(this);


        //playController
        this.opts = {
            videoId: this.state.videoId,
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 0
            }
        };


        this.interverId = null;
        this.onChangePrevVideo = this.onChangePrevVideo.bind(this);
        this.onChangeNextVideo = this.onChangeNextVideo.bind(this);
        this.onPlayVideo = this.onPlayVideo.bind(this);
        this.onPauseVideo = this.onPauseVideo.bind(this);
        this._setCurrentTime = this._setCurrentTime.bind(this);
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
        this._setDuration = this._setDuration.bind(this);
        this.moveSeekBar = this.moveSeekBar.bind(this);

        //sound
        this.moveVolumeBar = this.moveVolumeBar.bind(this);
        this.onSound = this.onSound.bind(this);
        this.offSound = this.offSound.bind(this);

    }




    componentDidMount(){
        console.log(sessionStorage.getItem("email"))
        
        utility.runAjax(this._getAllAlbumReqListener.bind(null,ACTION_CONFIG.getAllAlbum),"GET","/albumList/getAllAlbumList");
    }

    //albumList
    addItemClickHandler(event){
        this.setState(()=>{
               return {isAddClicked: true}
            });
        event.stopPropagation();

    }
    addItemCancelClickHandler(event){
        this.setState(()=>{
            return {isAddClicked: false}
        });
        event.stopPropagation();
    }



    addAlbumSubmitHandler(data,event){


        let formData = new FormData();
        //FormData 에 파일과 이메일을 append 메소드를 통해 등록

        for(let key in data){
            let inputData = data[key];
            if(key === "category"){
                inputData = JSON.stringify(inputData);
            }
            formData.append(key, inputData);
        }

        //console.log("asfasdfasdfasdf");
            // event.preventDefault();

        //formData.append("coverImgUrl",data.coverImgUrl);
        utility.runAjaxData(this._albumReqListener.bind(null,ACTION_CONFIG.addAlbum),"post","/albumList/addAlbum",formData);

    }

    deleteAlbumClickHandler(albumId,event){
        utility.runAjax(this._albumReqListener.bind(null,ACTION_CONFIG.deleteAlbum), "GET", "/albumList/deleteAlbum/"+albumId);
        event.stopPropagation();
    }

    _albumReqListener(action,res){
        //console.log(res);
        utility.runAjax(this._getAllAlbumReqListener.bind(null,action),"GET","/albumList/getAllAlbumList");

    }




    _getAllAlbumReqListener(action,res){
        let jsonAlbumList = JSON.parse(res.currentTarget.responseText);
        console.log("jsonAlbumList",jsonAlbumList)

        switch (action){
            case ACTION_CONFIG.deleteAlbum: this.setState((state)=>{
                //console.log(jsonAlbumList);
                if(!jsonAlbumList.err){

                    let { playingState } = state;

                    if(playingState){

                        return {
                            albumList : jsonAlbumList,
                            deleteVideoCheckList : [],
                            checkIdxList : [],
                            selectAllIsChecked : false,
                        }

                    }

                    return {
                        albumList : jsonAlbumList,
                        currentAlbum: jsonAlbumList[0],
                        deleteVideoCheckList : [],
                        checkIdxList : [],
                        selectAllIsChecked : false,
                        player: null,
                        selectedData : null,
                        selectedKey : -1,
                        playingState : null,
                    }
                }

                return {
                    albumList : null,
                    currentAlbum: null,
                    deleteVideoCheckList : [],
                    checkIdxList : [],
                    selectAllIsChecked : false,
                    player: null,
                    selectedData : null,
                    selectedKey : -1,
                    playingState : null,
                }

            });
            break;
            case ACTION_CONFIG.getAllAlbum: this.setState((state)=>{

                if(!jsonAlbumList.err){
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
                    console.log("jsonAlbumList",jsonAlbumList);
                    return {
                        albumList : jsonAlbumList,
                        isAddClicked : false,
                    }
                }
            });
            break;

            default: break;

        }


    }


    albumClickHandler(_id,idx,event){
        utility.runAjax(this._getAlbumReqListener.bind(null,ACTION_CONFIG.resetPlayList), "GET", "/albumList/getAlbum/"+_id);
    }

    _getAlbumReqListener(action,res){
        //
        // console.log("jsonData",res.currentTarget.responseText);

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
                let { playingState, checkIdxList, selectAllIsChecked,eventMap}  = state;
               // console.log("selectAllIsChecked",selectAllIsChecked);

                //어떤 동영상이 플레이 되고 있으면서 전체 선택이 안된 경우
                if(playingState && !selectAllIsChecked){
                    let { playingKey } = playingState;
                    let { playList } = currentAlbum;



                    //삭제 리스트에 있는 경우
                    if(checkIdxList.indexOf(playingKey) !== -1){
                        return {
                            playingState : {
                                playingAlbum :  currentAlbum,
                                playingData :  playList[0],
                                playingKey : 0,
                            },
                            selectedData : playList[0],
                            selectedKey : 0,
                            deleteVideoCheckList: [],
                            checkIdxList: [],
                            selectAllIsChecked: false,
                            currentAlbum: jsonData
                        }
                    }

                    let length = checkIdxList.filter((val)=>{
                        return val < playingKey;
                    }).length;
                     let currentPlayingKey = playingKey-length;
                      return {
                          playingState : {
                              playingAlbum :  currentAlbum,
                              playingData :  playList[currentPlayingKey],
                              playingKey : currentPlayingKey,
                          },
                          selectedData : playList[currentPlayingKey],
                          selectedKey : currentPlayingKey,
                          deleteVideoCheckList: [],
                          checkIdxList: [],
                          selectAllIsChecked: false,
                          currentAlbum: jsonData
                    }

                }




                return {
                    playingState : null,
                    selectedData: null,
                    selectedKey: -1,
                    deleteVideoCheckList: [],
                    checkIdxList: [],
                    selectAllIsChecked: false,
                    currentAlbum: jsonData,
                    // eventMap: Object.assign({},eventMap, resetEventMap),
                };


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
    }



    _deletePlayListReqListener(_id,res){
        utility.runAjax(this._getAlbumReqListener.bind(null,ACTION_CONFIG.deletePlayList), "GET", "/albumList/getAlbum/"+_id);
    }

    //check click handler
    checkClickHandler(videoId, checkIdx, isChecked, event) {
        let {deleteVideoCheckList,checkIdxList,currentAlbum}  = this.state;
        //let items = videoData.items;
        let currentSelectAllIsChecked = false;

        let newDeleteVideoCheckList = [...deleteVideoCheckList];
        let newCheckIdxList = [...checkIdxList];
        //check 되어있지 않으면
        if(!isChecked){
            newDeleteVideoCheckList.push(videoId);
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

        //console.log("currentSelectAllIsChecked",currentSelectAllIsChecked);

        this.setState({deleteVideoCheckList: newDeleteVideoCheckList,checkIdxList:  newCheckIdxList, selectAllIsChecked: currentSelectAllIsChecked});
        event.stopPropagation();
    }

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
                let {videoId} = val;
                newDeleteVideoCheckList.push(videoId);
                newCheckIdxList.push(idx);
            });
            currentSelectAllIsChecked = true;
        }
        this.setState({deleteVideoCheckList: newDeleteVideoCheckList,checkIdxList:  newCheckIdxList, selectAllIsChecked : currentSelectAllIsChecked});

    }





    onReady(event) {
        //console.log(`재생 될 비디오 아이디 : "${this.state.videoId}"`);
        // console.log(event);
            this.setState((state)=>{
                return { player: event.target }
            });
        // this.state.player ? this._setDuration() : null;
        //this.state.player ? this.getDuration() : null
        //console.log("재생 될 비디오 아이디", this.state.event_map.totalTime);
    }


    //playList
    playListClickHandler(playList,key){
                let newEventMap = { playing: false,
                    curTime: '00:00', // 현재 재생 시간
                    totalTime: '00:00', // 전체 비디오 재생 시간
                    curProgressBar: 0,
                    maxProgressBar: 0,
                };
                let {eventMap} = this.state;
                this.setState((state) => {
                    let {currentAlbum, playingState} = state;

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
                    let {player} = this.state;
                    if(player) {
                        this._setDuration(player);
                    }
                });
    }



    //searchList

    addSelectedVideo(index){
      let selectedItem = this.state.items[index];
      let totalDuration = this.state.totalDuration + selectedItem.duration;

        this.setState({
            selectedVideoArr : this.state.selectedVideoArr.concat(selectedItem),
            isSelectedArr : true,
            totalDuration : totalDuration
        })
    }

    delSelectedVideo(videoId){
        let selectedVideoArr = [];
        let isSelectedArr = false;

        let totalDuration = 0;

        selectedVideoArr = [...this.state.selectedVideoArr];

        selectedVideoArr.forEach((data, index)=>{
            if(data.videoId === videoId){
              totalDuration = this.state.totalDuration - selectedVideoArr[index].duration;
              selectedVideoArr.splice(index, 1);
            }
        });

        if(selectedVideoArr.length !== 0){
            isSelectedArr = true;
        }

        this.setState({
            selectedVideoArr : [...selectedVideoArr],
            isSelectedArr : isSelectedArr,

            totalDuration : totalDuration
        })
    }

    changeIsAllClearAddBtn(){
        this.setState({
            isAllClearAddBtn : false
        })
    }

    addSelectedVideoToAlbum(_id){
        let utilLayer = document.querySelector(".utilLayer");
        utilLayer.classList.remove("show");

        let insertData = {
            albumId : _id,
            selectedVideoArr : this.state.selectedVideoArr,
            totalDuration : this.state.totalDuration
        };
        let jsonData = JSON.stringify(insertData);

        utility.runAjaxData(function(e){
            utility.runAjax(this._getAlbumReqListener.bind(null,ACTION_CONFIG.addPlayList), "GET", "/albumList/getAlbum/"+_id);
        }.bind(this), "POST", "/playList/videos", jsonData, "application/json")
    }


    searchVideo(keyword){
        this.setState({
            items : [],
            nextPageToken : "",
            selectedVideoArr : [],
            isSearched : true,
            isSelectedArr : false

        });
        let encodedKeword = encodeURI(keyword);
        this.searchUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q="+encodedKeword+"&key="+this.UTUBEKEY+"&type=video"

        //this._searchAgainVideo(this.searchUrl);
        this.getVideoInfo(this.searchUrl);
    }

    promiseSearch(url){
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

    promiseGetViewCount(videoArr){
      const UTUBEKEY = "AIzaSyDIkMgAKPVBeKhZcwdDo_ijqPiiK8DbYsA";
      let count = 0;
      return new Promise(function(resolve, reject){
        videoArr.forEach((item, index) => {
          let statisticsUrl = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id="+item.videoId+"&key="+UTUBEKEY+"";
          utility.runAjax(function(e){
            let data = JSON.parse(e.target.responseText);
            let viewCount = data.items[0].statistics.viewCount;
            videoArr[index].viewCount = viewCount;
            count++;
            if(count === videoArr.length){
              if(typeof videoArr !== "object"){
                reject("wrong data")
              }else{
                resolve(videoArr);
              }
            }
          }.bind(this), "GET", statisticsUrl)
        })
      })
    }

    promiseGetDuration(videoArr){
      const UTUBEKEY = "AIzaSyDIkMgAKPVBeKhZcwdDo_ijqPiiK8DbYsA";
      let count = 0;
      return new Promise(function(resolve, reject){
        videoArr.forEach((item, index) => {

          let contentDetailsUrl = "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id="+item.videoId+"&key="+UTUBEKEY+"";
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

    getVideoInfo(url){
      this.promiseSearch(url)
        .then(function(videoArr){
          return this.promiseGetViewCount(videoArr)
        }.bind(this))
        .then(function(videoArr){
          return this.promiseGetDuration(videoArr)
        }.bind(this))
        .then(function(videoArr){
          this.setState({
              items : this.state.items.concat(videoArr),
              nextPageToken : this.nextPageToken
          })
        }.bind(this))
    }

    moreVideoList(){
        const url = this.searchUrl.concat("&pageToken="+this.state.nextPageToken);

        let searchList = document.querySelector(".searchList");
        let scrollHeight  = searchList.scrollHeight;
        let clientHeight  = searchList.clientHeight;
        let scrollTop  = searchList.scrollTop;

        if((scrollHeight - scrollTop) === clientHeight){
            //this._searchAgainVideo(url)
            this.getVideoInfo(url)
        }
    }


    //navComponent
    navClickHandler(event){
        //console.log(event.target.id)
        let navIdx = event.target.id;
        this.setState({navIdx : navIdx});
    }

    initSearchList(){
      this.setState({
        selectedVideoArr : [],
        isSelectedArr : false,
        isAllClearAddBtn : false,
        totalDuration : 0
      })
    }

    //playController
    _toTimeString(seconds) {
        let time = (new Date(seconds * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
        time = time.replace(/00:/, "");
        return time
    }


    onPlayVideo(player) {
        let {eventMap} = this.state;

        if(!eventMap.playing) {
            this.setState((state)=>{
                return {
                    eventMap: Object.assign({}, eventMap, {
                        playing: true ,
                        totalTime: '00:00', // 전체 비디오 재생 시간
                        maxProgressBar: 0,
                    }),
                }
            },()=>{
                let {eventMap} = this.state;
                console.log("eventMap1231231",eventMap);
                player.playVideo();
                this._setDuration(player);
            });
        }


    }

    onPauseVideo(player) {

        let {eventMap} = this.state;
            if(eventMap.playing) {
                this.setState((state) => {
                    return {
                        eventMap: Object.assign({}, eventMap, {playing: false}),
                    }
                },()=>{
                    player.pauseVideo(); //  이게 state를 바꾸고 2번으로 바꾸는 작업 계속 발생한다
                    this._setCurrentTime(player)
                });
            }

    }

    onChangeNextVideo() {
        // this.setState({ videoId: selectedVideo.id.next });
        let newEventMap = { playing: false,
            curTime: '00:00', // 현재 재생 시간
            totalTime: '00:00', // 전체 비디오 재생 시간
            curProgressBar: 0,
            maxProgressBar: 0,
        };

        let {eventMap} = this.state;

        this.setState((state) => {
            let { playingState, currentAlbum } = state;
            let {playingAlbum, playingKey} = playingState;
            let currentKey = playingKey+1;
            let { playList } = playingAlbum;
            if(currentKey > playList.length-1){
                currentKey = 0;
            }

            let newSelectedData = null;
            let newSelectedKey = -1;
            if(playingAlbum === currentAlbum){
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
        },()=>{
            let {player} = this.state;
            if(player) {
                this._setDuration(player);
            }
        });

        // this.setState((state)=>{
        //         let { currentAlbum,selectedKey } = state;
        //
        //         let currentKey = selectedKey+1;
        //         let { playList } = currentAlbum;
        //         return {
        //             playingState : {
        //                 playingAlbum :  currentAlbum,
        //                 playingData :  playList[currentKey],
        //                 playingKey : currentKey,
        //             },
        //             selectedData : playList[currentKey],
        //             selectedKey : currentKey
        //         }
        //     }
        // );
        //
        //
        // Promise.resolve()
        //     .then(this.opts.playerVars.autoplay = 1)
        //     .then(this.onPlayVideo.bind(null,player,eventMap)).then(this.onPlayerStateChange.bind(null,player))
    }

    onChangePrevVideo() {
        // this.setState({ videoId: selectedVideo.id.prev });



        let newEventMap = { playing: false,
            curTime: '00:00', // 현재 재생 시간
            totalTime: '00:00', // 전체 비디오 재생 시간
            curProgressBar: 0,
            maxProgressBar: 0,
        };

        let {eventMap} = this.state;
        this.setState((state) => {
            let { playingState,currentAlbum } = state;
            let {playingAlbum, playingKey} = playingState;
            let currentKey = playingKey-1;
            let { playList } = playingAlbum;
            if(currentKey < 0){
                currentKey = playList.length-1;
            }
            let newSelectedData = null;
            let newSelectedKey = -1;
            if(playingAlbum === currentAlbum){
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
        },()=>{
            let {player} = this.state;
            if(player) {
                this._setDuration(player);
            }
        });


        // this.setState((state)=>{
        //         let { currentAlbum,selectedKey } = state;
        //         let currentKey = selectedKey-1;
        //         let { playList } = currentAlbum;
        //         return {
        //             playingState : {
        //                 playingAlbum :  currentAlbum,
        //                 playingData :  playList[currentKey],
        //                 playingKey : currentKey,
        //             },
        //             selectedData : playList[currentKey],
        //             selectedKey : currentKey
        //         }
        //     }
        // );
        //
        // Promise.resolve()
        //     .then(this.opts.playerVars.autoplay = 1)
        //     .then(this.onPlayVideo.bind(null,player,eventMap)).then(this.onPlayerStateChange.bind(null,player))
    }



    onPlayerStateChange(player,event) {
        console.log("onPlayerStateChange");
        if (event !== undefined){
            //console.log("event.dataasdfasdfasdfasfasdfasdfasfasdfadsfas",event.data);
            this.setState({ videoState: event.data },()=>{
                let { videoState, eventMap } = this.state;
                if(videoState===1){
                    this.onPlayVideo(player);
                }else if(videoState===2) {
                    this.onPauseVideo(player);
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
       console.log("videoState111111111",eventMap);
       let time = Math.floor(player.getDuration());
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
                let time = Math.floor(player.getCurrentTime());
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
                    let {curProgressBar, maxProgressBar} = eventMap;
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
                    }else if(curProgressBar === maxProgressBar){

                        //끝나고 다음 행동을 여기서 정하면된다
                        this.onChangeNextVideo();


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

    moveSeekBar(player,event){
        let bar = utility.$selector("#seekBar");
        let time = bar.value;
        // 현재는 play 버튼을 눌러야 seekBar 플레이됨.
        // [개선필요] seekBar 값을 통해 video durtaion값을 얻어야함.

        player.seekTo(time, true);
        // this.onPlayVideo(player)
        // Promise.resolve()
        //     .then(player.seekTo(time, true))
        //     .then(this.onPlayVideo.bind(null,player))
    }


    moveVolumeBar(player,event){

        let bar = utility.$selector("#volumeBar");
        let volumeVal = bar.value;
        this.setState((state)=>{
            let {eventMap}  = state;
            return {
                eventMap: Object.assign({}, eventMap, { volume: volumeVal ,preVolume: volumeVal}),
            }

        },()=>{
            let {eventMap}  = this.state;
            player.setVolume(volumeVal);
            //console.log(volumeVal, this.state.event_map.volume);
            if (eventMap.volume < 1){
                this.offSound(player);
            }
            else {
                this.onSound(player)
            }
        });
    }

    onSound(player){
        this.setState((state)=> {
            let {eventMap} = state;
            let {preVolume} = eventMap;
            return {
                eventMap: Object.assign({}, eventMap, {soundOn: true, volume: preVolume})
            };
        },()=>{
            player.unMute();
        });

    }

    offSound(player){
        this.setState((state)=> {
                let {eventMap} = state;
                return {
                    eventMap: Object.assign({}, eventMap, {soundOn: false, volume: 0})
                }
            }
            ,()=>{
                player.mute();

            });
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
          isAddClicked

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

      if(playingState) {
          playingData = playingState.playingData;
      }

    return (
      <div className="App">



        <Header albumTitle={albumTitle}/>

        <div className="container">

            <PlayListComponent
                playList={playList}
                selectedData={selectedData}
                selectedKey={selectedKey}
                playState={playingState}



                checkIdxList={checkIdxList}
                selectAllIsChecked={selectAllIsChecked}
                onPlayerStateChange={this.onPlayerStateChange.bind(null,player)}
                onReady={this.onReady}
                playListClickHandler={this.playListClickHandler}
                deletePlayListBtnClickHandler={this.deletePlayListBtnClickHandler}
                selectAllBtnClickHandler={this.selectAllBtnClickHandler}
                checkClickHandler={this.checkClickHandler}
            />


            <MainList

                navIdx={navIdx}

                //albumList
                albumList={albumList}
                isAddClicked={isAddClicked}
                albumClickHandler={this.albumClickHandler}
                deleteAlbumClickHandler={this.deleteAlbumClickHandler}
                addAlbumSubmitHandler={this.addAlbumSubmitHandler}
                addItemClickHandler={this.addItemClickHandler}
                addItemCancelClickHandler={this.addItemCancelClickHandler}

                //searchList
                items={items}
                isSelectedArr={isSelectedArr}
                isAllClearAddBtn={isAllClearAddBtn}
                isSearched = {isSearched}
                addSelectedVideo={this.addSelectedVideo}
                delSelectedVideo={this.delSelectedVideo}
                changeIsAllClearAddBtn={this.changeIsAllClearAddBtn}
                addSelectedVideoToAlbum={this.addSelectedVideoToAlbum.bind(null,_id)}
                searchVideo={this.searchVideo}
                moreVideoList={this.moreVideoList}


                isSearched = {isSearched}

                initSearchList = {this.initSearchList}

            />



            <Nav navClickHandler={this.navClickHandler}/>

        </div>


            <PlayController
                player={player}
                eventMap={eventMap}
                playingData={playingData}
                onChangePrevVideo={this.onChangePrevVideo}
                onChangeNextVideo={this.onChangeNextVideo}
                onPlayVideo={this.onPlayVideo.bind(null,player)}
                onPauseVideo={this.onPauseVideo.bind(null,player)}
                onPlayerStateChange={this.onPlayerStateChange.bind(null,player)}
                moveSeekBar={this.moveSeekBar.bind(null,player)}

                moveVolumeBar={this.moveVolumeBar.bind(null,player)}
                onSound={this.onSound.bind(null,player)}
                offSound={this.offSound.bind(null,player)}
            />





      </div>
    );
  }
}



// this.onChangePrevVideo = this.onChangePrevVideo.bind(this);
// this.onChangeNextVideo = this.onChangeNextVideo.bind(this);
// this.onPlayVideo = this.onPlayVideo.bind(this);
// this.onPauseVideo = this.onPauseVideo.bind(this);
// this.setCurrentTime = this.setCurrentTime.bind(this);
// this.onPlayerStateChange = this.onPlayerStateChange.bind(this);

export default App;
