
import React, { Component } from 'react';
import './App.css';

import Header from './components/headerComponent/Header'
import Nav from './components/navComponent/Nav'

import MainList from './components/mainListComponent/MainList'
//import MainList from './components/mainListComponent/albumListComponent/MainList'
import PlayListComponent from './components/playListComponent/PlayList';
import PlayController from './components/playControllerComponent/samplePlayController';
import utility from './utility/utility';

//임시 데이터
//const ALBUM_ID = "5907f898f91d33f1d974f254";



class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            albumList : null,
            currentAlbum: null,
            isAdd : true,
            deleteVideoCheckList : [],
            checkIdxList : [],
            selectAllIsChecked : false,
            player: null,
        };

        this.checkClickHandler = this.checkClickHandler.bind(this);
        this.selectAllBtnClickHandler = this.selectAllBtnClickHandler.bind(this);
        this.getAlbumreqListener = this.getAlbumreqListener.bind(this);
        this.deleteBtnClickHandler = this.deleteBtnClickHandler.bind(this);
        this.deleteReqListener = this.deleteReqListener.bind(this);
        this.onReady = this.onReady.bind(this);
        this.getAllAlbumreqListener = this.getAllAlbumreqListener.bind(this);

        this.albumClickHandler = this.albumClickHandler.bind(this);
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
        this.setState({albumList: jsonAlbumList,currentAlbum:jsonAlbumList[0]});

    }


    albumClickHandler(_id,event){
        utility.runAjax(this.getAlbumreqListener, "GET", "/albumList/getAlbum/"+_id);
    }

    getAlbumreqListener(res){
        //console.log("jsonData",res.currentTarget.responseText);
        let jsonData = JSON.parse(res.currentTarget.responseText);
        this.setState({currentAlbum : jsonData});
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

    deleteReqListener(res , _id){
        utility.runAjax(this.getAlbumreqListener, "GET", "/albumList/getAlbum/"+_id);
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



  render() {


      let { albumList,checkIdxList,selectAllIsChecked,player,currentAlbum } = this.state;
      //console.log("albumData",albumData);
      let playList = null;
      let albumTitle = null;
      if(currentAlbum){
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
            />


            <MainList albumList={albumList} albumClickHandler={this.albumClickHandler}/>

            <Nav/>

        </div>

        <footer className="mainFooter">
            <PlayController player={player}/>
        </footer>

      </div>
    );
  }
}

export default App;
