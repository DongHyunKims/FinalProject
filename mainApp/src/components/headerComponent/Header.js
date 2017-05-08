import React from "react"
import "./header.css"

class Header extends React.Component{
  render(){

      let {albumTitle} = this.props;
      if(!albumTitle){
          albumTitle = "Wellcome Jinniecast";
      }

    return(
      <header className="mainHeader">
        <h1>JinnieCast</h1>
        <h2 className="albumTitle">{albumTitle}</h2>
        <div className="util">
          <p className="user">
            <span className="name">Jinny</span> 님 안녕하세요
          </p>
          <button className="logoutBtn">Logout</button>
        </div>
      </header>
    )
  }

}

export default Header;
