import React from "react"
import "./nav.css"

class Nav extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
      let { navClickHandler, navIdx } = this.props;
      let navList = ["SEARCH", "MY ALBUM", "POPULAR"];

      let li = navList.map((val, index)=>{
        if(parseInt(navIdx) === (index + 1)){
          return(<li className="select" id={index+1} key={index}>{val}</li>)
        }else{
          return(<li id={index+1} key={index}>{val}</li>)
        }

      });

      return(
        <nav className="navArea">
          <ul onClick={navClickHandler}>
            {li}
          </ul>
        </nav>
    )
  }
}

Nav.propTypes = {
  navIdx : React.PropTypes.string
}

export default Nav;
