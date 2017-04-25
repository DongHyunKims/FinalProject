import React, { Component } from 'react';
import './App.css';

import MainList from './components/mainListComponent/MainList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="mainHeader">
        </header>

        <div className="container">

            <div className="leftArea">
              left
            </div>

            <MainList/>

            <nav className="navArea">
            </nav>

        </div>


        <footer className="mainFooter">
        </footer>

      </div>
    );
  }
}

export default App;
