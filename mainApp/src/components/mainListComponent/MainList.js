import React from "react"
import "./mainList.css"

import SearchInputBox from "./SearchInputBox"
import SearchList from "./SearchList"

class MainList extends React.Component{
  constructor(){
    super()
  }

  render(){
    return(
      <div className="rightArea">
        <SearchInputBox/>
        <SearchList/>
      </div>
    )
  }
}

export default MainList;
