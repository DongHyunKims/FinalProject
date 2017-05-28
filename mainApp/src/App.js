
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
import libs from './utility/libs'
import config from './utility/config';


//listener
import privateAlbumList from "./privateMethod/albumList"
import privatePlayList from "./privateMethod/playList"
import privatePlayController from "./privateMethod/playController"
import privateSearchList from "./privateMethod/searchList"

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
            deletedAlbumId : null,
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



        privatePlayList._getAlbumReqListener = privatePlayList._getAlbumReqListener.bind(this);
        privatePlayList._deletePlayListReqListener = privatePlayList._deletePlayListReqListener.bind(this);
        playListEvents.onReady = playListEvents.onReady.bind(this);


        //playList
        playListEvents.playListClickHandler = playListEvents.playListClickHandler.bind(this);
        playListEvents.checkClickHandler = playListEvents.checkClickHandler.bind(this);
        playListEvents.selectAllBtnClickHandler = playListEvents.selectAllBtnClickHandler.bind(this);
        playListEvents.deletePlayListBtnClickHandler = playListEvents.deletePlayListBtnClickHandler.bind(this);
        playControllerEvents.onPlayerStateChange = playControllerEvents.onPlayerStateChange.bind(this);

       //albumList
        privateAlbumList._getAllAlbumReqListener = privateAlbumList._getAllAlbumReqListener.bind(this);
        albumListEvents.albumClickHandler = albumListEvents.albumClickHandler.bind(this);
        albumListEvents.deleteAlbumClickHandler = albumListEvents.deleteAlbumClickHandler.bind(this);
        privateAlbumList._albumReqListener = privateAlbumList._albumReqListener.bind(this);
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
        privateSearchList._getVideoInfo=privateSearchList._getVideoInfo.bind(this);
        privateSearchList._promiseSearch=privateSearchList._promiseSearch.bind(this);
        privateSearchList._promiseGetViewCount=privateSearchList._promiseGetViewCount.bind(this);
        privateSearchList._promiseGetDuration=privateSearchList._promiseGetDuration.bind(this);




        //nav
        this.navClickHandler = this.navClickHandler.bind(this);


        //playController
        this.interverId = null;
        playControllerEvents.onChangePrevVideo = playControllerEvents.onChangePrevVideo.bind(this);
        playControllerEvents.onChangeNextVideo = playControllerEvents.onChangeNextVideo.bind(this);
        playControllerEvents.onPlayVideo = playControllerEvents.onPlayVideo.bind(this);
        playControllerEvents.onPauseVideo = playControllerEvents.onPauseVideo.bind(this);
        privatePlayController._setCurrentTime = privatePlayController._setCurrentTime.bind(this);
        privatePlayController._setDuration = privatePlayController._setDuration.bind(this);
        playControllerEvents.moveSeekBar = playControllerEvents.moveSeekBar.bind(this);
        //sound
        playControllerEvents.moveVolumeBar = playControllerEvents.moveVolumeBar.bind(this);
        playControllerEvents.onSound = playControllerEvents.onSound.bind(this);
        playControllerEvents.offSound = playControllerEvents.offSound.bind(this);

        
        this.reRender = this.reRender.bind(this);
        libs.showBanner = libs.showBanner.bind(this);

    }

    componentDidMount(){
        const {HTTP_METHOD} = config;
        utility.runAjax(privateAlbumList._getAllAlbumReqListener.bind(null,ACTION_CONFIG.getAllAlbum),HTTP_METHOD.GET,"/albumList/albums");
    }



    //navComponent
    navClickHandler(event){
        const {HTTP_METHOD} = config;
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
                utility.runAjax(privateAlbumList._getAllAlbumReqListener.bind(null,ACTION_CONFIG.getAllAlbum),HTTP_METHOD.GET,"/albumList/albums");
            }
        });

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
          updateAlbum,
          videoState

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
                videoState={videoState}


                checkIdxList={checkIdxList}
                selectAllIsChecked={selectAllIsChecked}
                onPlayerStateChange={playControllerEvents.onPlayerStateChange.bind(null,player)}
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
                player={player}



                searchVideo={searchListEvents.searchVideo}
                addSelectedVideo={searchListEvents.addSelectedVideo}
                delSelectedVideo={searchListEvents.delSelectedVideo}
                changeIsAllClearAddBtn={searchListEvents.changeIsAllClearAddBtn}
                addSelectedVideoToAlbum={searchListEvents.addSelectedVideoToAlbum.bind(null,_id)}
                moreVideoList={searchListEvents.moreVideoList}
                initSearchList = {searchListEvents.initSearchList}
            />
            <Nav
              navClickHandler={this.navClickHandler}
              navIdx={navIdx}
            />

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


          <div id="snackbar"></div>
      </div>
    );
  }
}


export default App;
