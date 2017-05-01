import React from "react"
import "./nav.css"

class Nav extends React.Component{
  render(){
    return(
      <nav className="navArea">
        <ul>
          <li>SEARCH</li>
          <li>MY ALBUM</li>
          <li>POPULAR</li>
        </ul>
      </nav>
    )
  }
}

export default Nav;
