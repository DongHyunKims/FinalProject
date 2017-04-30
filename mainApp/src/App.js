import React, { Component } from 'react';
import './App.css';

import Header from './components/headerComponent/Header'
import Nav from './components/navComponent/Nav'

import MainList from './components/mainListComponent/MainList'
import PlayListComponent from './components/playListComponent/PlayList';
import PlayController from './components/playControllerComponent/PlayController';
import utility from './utility/utility';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            videoData : null
        };
        this.requestListener = this.requestListener.bind(this);

    }
    //동현 - 삭제 할것
    componentDidMount(){

        utility.runAjax(this.requestListener,"GET","./youtubeData.json")

    }

    requestListener(res){
        //console.log("jsonData",res.currentTarget.responseText);
        let jsonData = JSON.parse(res.currentTarget.responseText);
        this.setState({videoData : jsonData});
    }

  render() {
      let videoData = this.state.videoData;
    return (
      <div className="App">



        <Header/>

        <div className="container">

            <PlayListComponent videoData={videoData} />

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
