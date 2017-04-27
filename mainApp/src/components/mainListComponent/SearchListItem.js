import React from "react"

class SearchListItem extends React.Component{
  constructor(){
    super()
  }

  render(){
    let snippet = this.props.data.snippet;
    let thumb= snippet.thumbnails.default.url;

    //console.log(typeof this.props.data)
    return(
      <li>
        <p className="thum"><img src={thumb}/></p>
        <div className="itemCont">
          <p className="title">{snippet.title}</p>
          <p className="info">
            <span className="date">{snippet.publishedAt}</span>
            <span className="viewCount">1,000 Views</span>
          </p>
          <button className="addBtn">Add</button>
        </div>
      </li>
    )
  }
}

SearchListItem.propTypes = {
  data : React.PropTypes.object
}

export default SearchListItem;
