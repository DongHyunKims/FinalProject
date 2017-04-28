import React from "react"
import SearchListItem from "./SearchListItem"

class SearchList extends React.Component{
  constructor(){
    super()
    this.makeListItem = this.makeListItem.bind(this);
  }

  makeListItem(items){
    return items.map((data, index) => {
      //console.log(data)
      return <SearchListItem
              data={data}
              key={data.videoId}
              index={index}
              clickAddButton={this.props.clickAddButton}
            />
    })
  }

  render(){
    return(
      <div className="searchListWrap">
        <ul className="searchList">
          {this.makeListItem(this.props.items)}
        </ul>
        <button onClick={this.props.moreVideoList} className="moreBtn">더읽어들이기</button>
      </div>
    )
  }
}

SearchList.propTypes = {
  items : React.PropTypes.array,
  clickAddButton : React.PropTypes.func,
  moreVideoList : React.PropTypes.func
}

export default SearchList;
