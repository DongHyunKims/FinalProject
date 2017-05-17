import React from "react"
import {Redirect} from 'react-router-dom';

import utility from "../../utility/utility"
import "./header.css"

class Header extends React.Component{

  constructor(props){
    super(props)

    this.logout = this.logout.bind(this);
  }

  logout(){
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("email");


    utility.runAjax(function(e){
      this.props.reRender();
      // return (
      //   <Redirect to="/auth/login"/>
      // )

    }.bind(this), "GET", "/logout")
  }

  render(){

    let {albumTitle} = this.props;
    if(!albumTitle){
        albumTitle = "Wellcome Jinniecast";
    }

    let email = sessionStorage.getItem("email");

    return(
      <header className="mainHeader">
        <h1>JinnieCast</h1>
        <h2 className="albumTitle">{albumTitle}</h2>
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

export default Header;
