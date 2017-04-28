import React from "react"

class SearchListItem extends React.Component{
  constructor(){
    super()
  }

  render(){
    let data = this.props.data
    //console.log(this.props.data)
    return(
      <li>
        <p className="thum"><img src={data.thumbUrl}/></p>
        <div className="itemCont">
          <p className="title">{data.title}</p>
          <p className="info">
            <span className="duration">{data.duration}</span>
            <span className="date">{data.publishedAt}</span>
            <span className="viewCount">{data.viewCount} Views</span>
          </p>
          <button className="addBtn" onClick={this.props.clickAddButton.bind(this, this.props.index)}>Add</button>
        </div>
      </li>
    )
  }
}

SearchListItem.propTypes = {
  data : React.PropTypes.object,
  clickAddButton : React.PropTypes.func
}

export default SearchListItem;
