import React from "react"
import SearchListItem from "./SearchListItem"

class SearchList extends React.Component{
  constructor(){
    super()
    this.makeListItem = this.makeListItem.bind(this);
  }

  makeListItem(items){
    return items.map((data) => {
      //console.log(data)
      return <SearchListItem data={data}/>
    })
  }

  render(){
    return(
      <ul className="searchList">
        {this.makeListItem(this.props.items)}
      </ul>
    )
  }
}

SearchList.propTypes = {
  items : React.PropTypes.array
}

export default SearchList;
