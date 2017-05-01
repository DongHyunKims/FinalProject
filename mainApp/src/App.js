
import React, { Component } from 'react';
import './App.css';

import Header from './components/headerComponent/Header'
import Nav from './components/navComponent/Nav'

import MainList from './components/mainListComponent/MainList'
import PlayListComponent from './components/playListComponent/PlayList';
import PlayController from './components/playControllerComponent/samplePlayController';
import utility from './utility/utility';


const ALBUM_ID = "59077b0150365ddced7c4ef5"


//
//
// const SDK_URL = 'https://www.youtube.com/iframe_api';
// const SDK_GLOBAL = 'YT';
// const SDK_GLOBAL_READY = 'onYouTubeIframeAPIReady';



class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            albumData : null,
            isAdd : true,
            deleteVideoCheckList : [],
            checkIdxList : [],
            selectAllIsChecked : false,
        };

        this.checkClickHandler = this.checkClickHandler.bind(this);
        this.selectAllBtnClickHandler = this.selectAllBtnClickHandler.bind(this);
        this.requestListener = this.requestListener.bind(this);
        this.deleteBtnClickHandler = this.deleteBtnClickHandler.bind(this);
        this.deleteReqListener = this.deleteReqListener.bind(this);

    }
    //동현 - 삭제 할것
    componentDidMount(){
        let { isAdd } = this.state;

        if(isAdd) {
            utility.runAjax(this.requestListener, "GET", "/playList/getAlbum/"+ALBUM_ID)
        }
    }

    requestListener(res){
        console.log("jsonData",res.currentTarget.responseText);
        let jsonData = JSON.parse(res.currentTarget.responseText);
        this.setState({albumData : jsonData});
    }



    //삭제버튼 클릭 handler
    deleteBtnClickHandler(){
        let { deleteVideoCheckList } = this.state;
        let deleteData = {
            albumId : ALBUM_ID,
            deleteList: deleteVideoCheckList
        };
        let jsonData = JSON.stringify(deleteData);
        //console.log(jsonData);

        //DB를 통해서 데이터 삭제
        //ajax
        utility.runAjaxData(this.deleteReqListener,"POST","/playList/deletePlayList", jsonData, "application/json");


        //console.log("delete");
    }

    deleteReqListener(res){
        //console.log("dd",res);
        utility.runAjax(this.requestListener, "GET", "/playList/getAlbum/"+ALBUM_ID);
    }

    //check click handler
    checkClickHandler(videoId, checkIdx, isChecked, event) {

        let {deleteVideoCheckList,checkIdxList,albumData}  = this.state;

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

        if(albumData){
            playList = albumData.playList;
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
        let { albumData } = this.state;
        let playList = null;

        if(albumData) {
            playList = albumData.playList;
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



  render() {
      let { albumData,checkIdxList,selectAllIsChecked } = this.state;

      let playList = null;

      if(albumData){
          playList = albumData.playList;
      }


      //(console.log(videoData));
    return (
      <div className="App">



        <Header/>

        <div className="container">

            <PlayListComponent
                playList={playList}
                deleteBtnClickHandler={this.deleteBtnClickHandler}
                checkClickHandler={this.checkClickHandler}
                selectAllBtnClickHandler={this.selectAllBtnClickHandler}
                checkIdxList={checkIdxList}
                selectAllIsChecked={selectAllIsChecked}
            />


            <MainList/>

            <Nav/>

        </div>

        <footer className="mainFooter">
            <PlayController/>

        </footer>

      </div>
    );
  }
}

export default App;

