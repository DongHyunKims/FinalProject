import React from "react"

class SearchInputBox extends React.Component{
  constructor(){
    super()
  }

  render(){
    return(
      <div>
        <input type="text" className="searchTextInput" placeholder="Search your favorite music"/>
      </div>
    )
  }
}

export default SearchInputBox;
