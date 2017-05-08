import React from "react"
import "./nav.css"

class Nav extends React.Component{


  render(){
      let { navClickHandler } = this.props;

      return(
      <nav className="navArea" onClick={navClickHandler}>
        <ul>
          <li id="1">SEARCH</li>
          <li id="2">MY ALBUM</li>
          <li id="3">POPULAR</li>
        </ul>
      </nav>
    )
  }
}

export default Nav;
