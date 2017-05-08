
import React, { Component } from 'react';
import './App.css';

import Header from './components/headerComponent/Header'
import Nav from './components/navComponent/Nav'


import MainList from './components/mainListComponent/MainList'

import PlayListComponent from './components/playListComponent/PlayList';
import PlayController from './components/playControllerComponent/samplePlayController';
import utility from './utility/utility';
import moment from 'moment'

//임시 데이터
//const ALBUM_ID = "5907f898f91d33f1d974f254";


const ACTION_CONFIG = {
    addPlayList : "1",
    deletePlayList : "2",
    resetPlayList : "3",
};


class App extends Component {
    constructor(props){
        super(props);
        this.state = {

            //albumList
            albumList : null,
            albumIdx : -1,
            currentAlbum: null,


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
        };




        this.checkClickHandler = this.checkClickHandler.bind(this);
        this.selectAllBtnClickHandler = this.selectAllBtnClickHandler.bind(this);
        this.getAlbumreqListener = this.getAlbumreqListener.bind(this);
        this.deleteBtnClickHandler = this.deleteBtnClickHandler.bind(this);
        this.deleteReqListener = this.deleteReqListener.bind(this);
        this.onReady = this.onReady.bind(this);


        //playList
        this.playListClickHandler = this.playListClickHandler.bind(this);

       //앨범
        this.getAllAlbumreqListener = this.getAllAlbumreqListener.bind(this);
        this.albumClickHandler = this.albumClickHandler.bind(this);

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
        this._searchAgainVideo = this._searchAgainVideo.bind(this);
        this._getVideoDuration = this._getVideoDuration.bind(this);
        this._getVideoViewCount = this._getVideoViewCount.bind(this);


        //nav
        this.navClickHandler = this.navClickHandler.bind(this);

    }





    //app의 componentDid mount로 빠야 함
    componentDidMount(){
        utility.runAjax(this.getAllAlbumreqListener,"GET","/albumList/getAllAlbumList");
    }

    getAllAlbumreqListener(res){
        // console.log(res.currentTarget);
        // console.log(this);
        let jsonAlbumList = JSON.parse(res.currentTarget.responseText);
        //console.log("jsonAlbumList",jsonAlbumList);
        this.setState({
            albumList: jsonAlbumList,
            albumIdx: 0,
            currentAlbum:jsonAlbumList[0]
        });

    }


    albumClickHandler(_id,idx,event){

        // this.setState((state)=>{
        //         let {albumList}  = state;
        //         return {
        //             currentAlbum: albumList[idx],
        //         }
        //     });

        utility.runAjax(this.getAlbumreqListener.bind(null,ACTION_CONFIG.resetPlayList), "GET", "/albumList/getAlbum/"+_id);
    }

    getAlbumreqListener(action,res){


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
            case ACTION_CONFIG.deletePlayList  : this.setState({
                deleteVideoCheckList : [],
                checkIdxList : [],
                selectAllIsChecked: false,
                currentAlbum : jsonData
            });
            break;
            case ACTION_CONFIG.resetPlayList : this.setState((state,props)=>{
                // let preCurrentAlbum = pre.currentAlbum;
                //
                let { playingState}  = state;
                let currentAlbum = jsonData;
                // console.log("currentAlbum",currentAlbum);
                // console.log("preAlbum",preAlbum);


                //무언가 play 되고있다
                if(playingState) {
                    let { playingAlbum, playingData, playingKey  } = playingState;
                    if (currentAlbum._id !== playingAlbum._id) {
                        // console.log("currentAlbum",currentAlbum._id);
                        // console.log("playingAlbum",playingAlbum._id);
                        // console.log("playingData",playingData);
                        // console.log("playingKey",playingKey);

                        return {
                            selectedData:  playingData,
                            selectedKey: -1,
                            deleteVideoCheckList: [],
                            checkIdxList: [],
                            selectAllIsChecked: false,
                            currentAlbum: jsonData
                        };
                    }

                    // console.log("다시 원래 대로 돌아왔다!");
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
    deleteBtnClickHandler(){
        let { deleteVideoCheckList,currentAlbum } = this.state;

        let { _id } = currentAlbum;
        let deleteData = {
            albumId : _id,
            deleteList: deleteVideoCheckList
        };
        let jsonData = JSON.stringify(deleteData);
        //console.log(jsonData);
        //DB를 통해서 데이터 삭제
        //ajax
        utility.runAjaxData(this.deleteReqListener.bind(null,_id),"POST","/playList/deletePlayList", jsonData, "application/json");
    }





    deleteReqListener(_id,res){
        utility.runAjax(this.getAlbumreqListener.bind(null,ACTION_CONFIG.deletePlayList), "GET", "/albumList/getAlbum/"+_id);
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
        //console.log(event.target);
        this.setState({ player: event.target });
        //this.state.player ? this.getDuration() : null
        //console.log("재생 될 비디오 아이디", this.state.event_map.totalTime);
    }


    //playList
    playListClickHandler(playList,key){
        this.setState((state)=>{

                let {currentAlbum, selectedData, selectedKey } = state;


                return {
                    playingState : {
                        playingAlbum :  currentAlbum,
                        playingData :  playList[key],
                        playingKey : key,
                    },
                    selectedData : playList[key],
                    selectedKey : key
                }
            }
        );
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
      console.log(this.state.totalDuration)

        let utilLayer = document.querySelector(".utilLayer");
        utilLayer.classList.remove("show");

        let insertData = {
            albumId : _id,
            selectedVideoArr : this.state.selectedVideoArr,

            totalDuration : this.state.totalDuration
        };

        let jsonData = JSON.stringify(insertData);
        //console.log(jsonData)
        utility.runAjaxData(function(e){
            //console.log(e);

            utility.runAjax(this.getAlbumreqListener.bind(null,ACTION_CONFIG.addPlayList), "GET", "/albumList/getAlbum/"+_id);

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

        this._searchAgainVideo(this.searchUrl);
    }

    _searchAgainVideo(searchUrl){
        utility.runAjax(function(e){
            let data = JSON.parse(e.target.responseText);
            this.nextPageToken = data.nextPageToken;


            this.videoArr = data.items.map((item, index) => {
                return {
                    videoId : item.id.videoId,
                    title : item.snippet.title,
                    publishedAt : item.snippet.publishedAt,
                    thumnail : item.snippet.thumbnails.default.url
                }
            });

            this._getVideoViewCount();

        }.bind(this), "GET", searchUrl)
    }

    _getVideoViewCount(){
        let count = 0;
        this.videoArr.map((item, index) => {
            let statisticsUrl = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id="+item.videoId+"&key="+this.UTUBEKEY+"";
            utility.runAjax(function(e){

                let data = JSON.parse(e.target.responseText);
                let viewCount = data.items[0].statistics.viewCount;
                this.videoArr[index].viewCount = viewCount;
                count++;
                if(count === this.videoArr.length){
                    this._getVideoDuration();
                }
            }.bind(this), "GET", statisticsUrl)
        })
    }
//함수형 setState, jsWeekly - redux를 써봐라, component를 가볍게 순수하게 component는 UI Render하는것에 집중, config 분리, 주석정리, 디버거사용 소스맵, map(forEach)
    _getVideoDuration(){
        let count = 0;
        this.videoArr.map((item, index) => {
            let contentDetailsUrl = "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id="+item.videoId+"&key="+this.UTUBEKEY+"";
            utility.runAjax(function(e){
                let data = JSON.parse(e.target.responseText);
                let duration = data.items[0].contentDetails.duration;
                let changedDuration = "";

                changedDuration = moment.duration(duration, moment.ISO_8601)
                this.videoArr[index].duration = changedDuration._milliseconds;

                count++;
                if(count === this.videoArr.length){
                    this.setState({
                        items : this.state.items.concat(this.videoArr),
                        nextPageToken : this.nextPageToken
                    })
                }
            }.bind(this), "GET", contentDetailsUrl)
        })
    }


    moreVideoList(){
        const url = this.searchUrl.concat("&pageToken="+this.state.nextPageToken);

        let searchList = document.querySelector(".searchList");
        let scrollHeight  = searchList.scrollHeight;
        let clientHeight  = searchList.clientHeight;
        let scrollTop  = searchList.scrollTop;

        if((scrollHeight - scrollTop) === clientHeight){
            this._searchAgainVideo(url)
        }
    }


    //navComponent
    navClickHandler(event){
        //console.log(event.target.id)
        let navIdx = event.target.id;
        this.setState({navIdx : navIdx});
    }



    render() {
      console.log(this.state.totalDuration)


      let { albumList, checkIdxList, selectAllIsChecked, player, currentAlbum, items, isSelectedArr, isAllClearAddBtn, navIdx, selectedData, selectedKey, isSearched } = this.state;
      //console.log("albumData",albumData);

      let playList = null;
      let albumTitle = null;
      let _id = null;
      if(currentAlbum){
          _id = currentAlbum._id;
          albumTitle = currentAlbum.title;
          playList = currentAlbum.playList;
      }
      //(console.log(videoData));
    return (
      <div className="App">



        <Header albumTitle={albumTitle}/>

        <div className="container">

            <PlayListComponent
                playList={playList}
                deleteBtnClickHandler={this.deleteBtnClickHandler}
                checkClickHandler={this.checkClickHandler}
                selectAllBtnClickHandler={this.selectAllBtnClickHandler}
                checkIdxList={checkIdxList}
                selectAllIsChecked={selectAllIsChecked}
                onReady={this.onReady}
                playListClickHandler={this.playListClickHandler}
                selectedData={selectedData}
                selectedKey={selectedKey}
            />


            <MainList

                navIdx={navIdx}

                //albumList
                albumList={albumList}
                albumClickHandler={this.albumClickHandler}

                //searchList
                items={items}
                isSelectedArr={isSelectedArr}
                isAllClearAddBtn={isAllClearAddBtn}
                addSelectedVideo={this.addSelectedVideo}
                delSelectedVideo={this.delSelectedVideo}
                changeIsAllClearAddBtn={this.changeIsAllClearAddBtn}
                addSelectedVideoToAlbum={this.addSelectedVideoToAlbum.bind(null,_id)}
                searchVideo={this.searchVideo}
                moreVideoList={this.moreVideoList}

                isSearched = {isSearched}
            />



            <Nav navClickHandler={this.navClickHandler}/>

        </div>

        <footer className="mainFooter">
            <PlayController player={player}/>
        </footer>

      </div>
    );
  }
}

export default App;
