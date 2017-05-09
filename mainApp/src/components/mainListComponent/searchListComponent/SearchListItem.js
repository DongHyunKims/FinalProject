import React from "react"

import timeago from 'timeago.js';

class SearchListItem extends React.Component{
  constructor(){
    super()
    this.state = {
      isClickedAddBtn : false,

      isPopupVideo :false

    };

    this.changePublishedAtData = this.changePublishedAtData.bind(this);
    this.clickAddButton = this.clickAddButton.bind(this);
    this.changeDuration = this.changeDuration.bind(this);

    this.showPopupVideo = this.showPopupVideo.bind(this);
  }

  changePublishedAtData(publishedAt){
    return new timeago().format(publishedAt);
  }

  clickAddButton(index, videoId){
    if(!this.state.isClickedAddBtn){
      this.props.addSelectedVideo(index);
    }else{
      this.props.delSelectedVideo(videoId);
    }
    this.setState({isClickedAddBtn : !this.state.isClickedAddBtn});
  }

  changeDuration(duration){
    let sec = 0,
        min = 0,
        hour = 0,
        time = 0,
        str = "";
//hour
    time = duration / 1000;
    if(time / 3600 >= 1){
      hour = Math.floor(time / 3600);
      if(hour < 10){
        str = str.concat("0"+hour+":");
      }else{
        str = str.concat(hour+":");
      }
    }else{
      hour = 0;
      str = str.concat("00:")
    }
//min
    time = time % 3600;
    if(time / 60  >= 1){
      min = Math.floor(time / 60);
      if(min < 10){
        str = str.concat("0"+min+":");
      }else{
        str = str.concat(min+":");
      }
    }else{
      min = 0;
      str = str.concat("00:")
    }
//sec
    sec = time % 60;
    if(sec < 10){
      str = str.concat("0"+sec);
    }else{
      str = str.concat(sec);
    }

    //console.log(str)
    //console.log("hour = "+hour+" min = "+min+" sec = "+sec)
    return str
  }


  showPopupVideo(){
    let videoId = this.props.data.videoId;
    let videoTitle = this.props.data.title;
    let videoUrl = "http://www.youtube.com/embed/"+videoId+"?autoplay=1&showinfo=0&rel=0&origin=http://example.com&controls=1"
    let app = document.querySelector(".App");
    app.insertAdjacentHTML("beforeend",
    '<div class="popupVideoWrap"><div class="popup"><div class="title">'+videoTitle+'<button class="btnClose">X</button></div><iframe id="ytplayer" type="text/html" width="633" height="356" src='+videoUrl+' frameborder="0"/></div></div>;')

    let btnClose = document.querySelector(".popupVideoWrap .btnClose");
    this.hidePopupVideo(btnClose);
  }

  hidePopupVideo(btnClose){
    btnClose.addEventListener("click", function(e){
      let target = e.target;
      target.closest(".popupVideoWrap").remove();
    })
  }

// 상위 콤포넌트에서 setState호출로 하위콤포넌트의 props값이 변경되었을때 하위콤포넌트의 값을 setState해주기 위해
  componentWillReceiveProps(nextProps){
    if(nextProps.isAllClearAddBtn){
      this.setState({
        isClickedAddBtn : false
      });
      this.props.changeIsAllClearAddBtn()
    }
  }


  render(){
    let data = this.props.data;

    return(
      <li>
        <p className="thum" onClick={this.showPopupVideo}><img src={data.thumnail}/></p>
        <div className="itemCont">
          <p className="title" onClick={this.showPopupVideo}>{data.title}</p>
          <p className="info">
            <span className="duration">{this.changeDuration(data.duration)}</span>
            <span className="date">{this.changePublishedAtData(data.publishedAt)}</span>
            <span className="viewCount">{data.viewCount} Views</span>
          </p>
          <button
            className={this.state.isClickedAddBtn ? "addBtn add" : "addBtn"}
            onClick={this.clickAddButton.bind(this, this.props.index, data.videoId)}>
            Add
          </button>
        </div>
      </li>
    )
  }
}

SearchListItem.propTypes = {
  data : React.PropTypes.object,
  clickAddButton : React.PropTypes.func,
  addSelectedVideo : React.PropTypes.func,
  delSelectedVideo : React.PropTypes.func,
  index : React.PropTypes.number
};


export default SearchListItem;
