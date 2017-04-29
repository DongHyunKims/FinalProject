
import React, { Component } from 'react';
import './App.css';

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
        <header className="mainHeader">
        </header>

        <div className="container">

            <PlayListComponent videoData={videoData} />

            <MainList/>

            <nav className="navArea">
            </nav>

        </div>

        <footer className="mainFooter">
            <PlayController/>

        </footer>

      </div>
    );
  }
}

export default App;


/* 서버 테스트
import React, { Component } from 'react';
import './App.css';

class App extends Component {
    state = {users: []};

    componentDidMount() {
        console.log("fsdfsdfd");
        fetch('/users')
            .then(res => res.json())
            .then(users => this.setState({ users }));
    }

    render() {
        return (
            <div className="App">
                <h1>Users</h1>
                {this.state.users.map(user =>
                    <div key={user.id}>{user.username}</div>
                )}
            </div>
        );
    }
}

export default App;
*/