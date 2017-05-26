import React from "react"
import SearchListItem from "./SearchListItem"

class SearchList extends React.Component{
  constructor(){
    super();


    this.makeListItem = this.makeListItem.bind(this);
  }

  makeListItem(items){
    return items.map((data, index) => {
      return <SearchListItem
              data={data}
              key={index}
              index={index}
              addSelectedVideo={this.props.addSelectedVideo}
              delSelectedVideo={this.props.delSelectedVideo}
              isAllClearAddBtn={this.props.isAllClearAddBtn}
              changeIsAllClearAddBtn={this.props.changeIsAllClearAddBtn}
              player={this.props.player}
            />
    })
  }

  render(){

    //let utilLayer = document.querySelector(".utilLayer");
    //utilLayer.classList.remove("show");


    return(
      <div className="searchListWrap">
        <ul className="searchList" onScroll={this.props.moreVideoList}>
          {this.makeListItem(this.props.items)}
        </ul>
        <div className={this.props.isSelectedArr ? "utilLayer show" : "utilLayer"}>
          <button className="btnAddAlbum" onClick={this.props.addSelectedVideoToAlbum}>앨범추가</button>
        </div>
      </div>
    )
  }
}

SearchList.propTypes = {
  items : React.PropTypes.array,
  clickAddButton : React.PropTypes.func,
  addSelectedVideo : React.PropTypes.func,
  delSelectedVideo : React.PropTypes.func,
  addSelectedVideoToAlbum : React.PropTypes.func,
  moreVideoList : React.PropTypes.func,
  isSelectedArr : React.PropTypes.bool,
  isAllClearAddBtn : React.PropTypes.bool,
  changeIsAllClearAddBtn : React.PropTypes.func
}


export default SearchList;
