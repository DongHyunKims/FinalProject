import React from "react"

class SearchInputSection extends React.Component{
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

export default SearchInputSection;
