import React from "react"

import timeago from 'timeago.js';

class SearchListItem extends React.Component{
  constructor(){
    super()

    this.state = {
      isClicked : false
    }

    this.changePublishedAtData = this.changePublishedAtData.bind(this);
    this.clickAddButton = this.clickAddButton.bind(this);
  }

  changePublishedAtData(publishedAt){
    return new timeago().format(publishedAt);
  }

  clickAddButton(index, videoId){

    if(!this.state.isClicked){
      this.props.addSelectedVideo(index);
    }else{
      this.props.delSelectedVideo(videoId);
    }

    this.setState({isClicked : !this.state.isClicked});

  }

  render(){
    let data = this.props.data;

    //console.log("item")

    return(
      <li>
        <p className="thum"><img src={data.thumbUrl}/></p>
        <div className="itemCont">
          <p className="title">{data.title}</p>
          <p className="info">
            <span className="duration">{data.duration}</span>
            <span className="date">{this.changePublishedAtData(data.publishedAt)}</span>
            <span className="viewCount">{data.viewCount} Views</span>
          </p>
          <button className={this.state.isClicked ? "addBtn add" : "addBtn"} onClick={this.clickAddButton.bind(this, this.props.index, data.videoId)}>Add</button>

        </div>
      </li>
    )
  }
}

SearchListItem.propTypes = {
  data : React.PropTypes.object,
  addSelectedVideo : React.PropTypes.func,
  delSelectedVideo : React.PropTypes.func
}

export default SearchListItem;
