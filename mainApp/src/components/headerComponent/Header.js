import React from "react"
import {Redirect, Link} from 'react-router-dom';
import config from '../../utility/config';

import utility from "../../utility/utility"
import "./header.css"

class Header extends React.Component{

  constructor(props){
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout(){
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("email");

    utility.runAjax(function(e){
      this.props.reRender();
    }.bind(this), "GET", "/auth/logout")
  }

  render(){

    let {albumTitle} = this.props;
    if(!albumTitle){
        albumTitle = "Wellcome Jinniecast";
    }

    let email = sessionStorage.getItem("email");

    return(
      <header className="mainHeader">
        {/*<h1>JinnieCast</h1>*/}
        <img src={config.DEFAULT_SERVER_URL + "/images/default/logo.png"} />
        <div className="albumTitleArea"><h2 className="albumTitle">{albumTitle}</h2></div>
        <div className="util">
          <p className="user">
            <span className="name">{email}</span> 님 안녕하세요
          </p>
          <button className="logoutBtn" onClick={this.logout}>Logout</button>
        </div>
      </header>
    )
  }

}
//<button className="logoutBtn" onClick={this.logout}>Logout</button>

export default Header;
