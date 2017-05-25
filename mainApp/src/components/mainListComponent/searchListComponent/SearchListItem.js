import React from "react"

import timeago from 'timeago.js';
import utility from '../../../utility/utility';
import libs from '../../../utility/libs';
import playControllerEvents from "../../../events/playControllerEvents"

class SearchListItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isClickedAddBtn : false,
      isPopupVideo :false
    };

    this.changePublishedAtData = this.changePublishedAtData.bind(this);
    this.clickAddButton = this.clickAddButton.bind(this);
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


  showPopupVideo(){

    playControllerEvents.onPauseVideo(this.props.player);
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
    btnClose.addEventListener("click", (e)=>{

      let target = e.target;
      target.closest(".popupVideoWrap").remove();
        playControllerEvents.onPlayVideo(this.props.player);



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
            <span className="duration">{libs.changeDuration(data.duration)}</span>
            <span className="date">{this.changePublishedAtData(data.publishedAt)}</span>
            <span className="viewCount">{libs.checkNumUnit(data.viewCount)} Views</span>
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
