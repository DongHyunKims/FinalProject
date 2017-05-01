
import React, { Component } from 'react';
import './App.css';

import Header from './components/headerComponent/Header'
import Nav from './components/navComponent/Nav'

import MainList from './components/mainListComponent/MainList'
import PlayListComponent from './components/playListComponent/PlayList';
import PlayController from './components/playControllerComponent/samplePlayController';
import utility from './utility/utility';



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
        };
        this.requestListener = this.requestListener.bind(this);

    }
    //동현 - 삭제 할것
    componentDidMount(){
        let { isAdd } = this.state;

        if(isAdd) {
            utility.runAjax(this.requestListener, "GET", "/playList/getAlbum/5907141021b87ca64a4616cf")
        }
    }

    requestListener(res){
        console.log("jsonData",res.currentTarget.responseText);
        let jsonData = JSON.parse(res.currentTarget.responseText);
        this.setState({albumData : jsonData});
    }

  render() {
      let { albumData } = this.state;


      let playList = null;

      if(albumData){
          playList = albumData.playList;
      }


      //(console.log(videoData));
    return (
      <div className="App">



        <Header/>

        <div className="container">

            <PlayListComponent playList={playList} />

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

