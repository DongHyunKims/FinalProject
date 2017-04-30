import React from "react"
import "./mainList.css"

import utility from "../../utility/utility"

import SearchInputBox from "./SearchInputSection"
import SearchList from "./SearchList"

class MainList extends React.Component{
  constructor(){
    super()
    this.state = {
      items : [],
      nextPageToken : ""
    }

    this.UTUBEKEY = "AIzaSyDIkMgAKPVBeKhZcwdDo_ijqPiiK8DbYsA";
    this.searchUrl = "";

    this.videoArr = [];
    this.nextPageToken = "";

    this.selectedVideoArr = [];

    this.searchVideo = this.searchVideo.bind(this);
    this.clickAddButton = this.clickAddButton.bind(this);
    this.moreVideoList = this.moreVideoList.bind(this);
    this.searchAgainVideo = this.searchAgainVideo.bind(this);
    this.getVideoDuration = this.getVideoDuration.bind(this);
    this.getVideoViewCount = this.getVideoViewCount.bind(this);
  }

  searchVideo(keyword){

    this.setState({
      items : [],
      nextPageToken : ""
    })

    let encodedKeword = encodeURI(keyword);
    this.searchUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q="+encodedKeword+"&key="+this.UTUBEKEY+"&type=video"

    this.searchAgainVideo(this.searchUrl);
  }

/*
map은 순서대로 도네?

hell ajax 작동방법!!
1. 처음 키워드 값으로 검색리스트를 받아온다.
2. 받아온 리스트에는 각각 videoId 값이 존재한다.
3-1. 리스트 각각의 받아온 videoId값으로 viewCount값을 받아오는 API URL을 작성하여 받아온다.
3-2. 리스트 각각의 받아온 videoId값으로 durtion값을 받아오는 API URL을 작성하여 받아온다.

1.
문제 : viewCount 값과 duration값을 해당 videoId값으로 각각 받아와야하는데 병렬로 받아야 하나? 직렬로 받아야하나?
해결 :
1. 직렬 : viewCount를 먼저 받고 그다음에 duration값을 받는 방법
2. 병렬 : 받아온 리스트 배열을 동시에 ajax로 돌린다.
#2번 방법으로 적용하였다.

2.
문제 : render할때 가끔 viewCount값이나 duration값이 보이지 않는다. 확인 결과 데이터에서는 정확히 값을 가져오고있었으나
render할때 그려지지 않았다.
해결 : 위 문제는 data를 전부 받아온 다음에 render가 되어야 하나 data를 모두 받기 전에 render가 되어 미쳐 그려지지 않는 값이
생긴다고 판단 하였다. 그래서 마지막 setState로 render해줄때 setTimeout을 사용하여 data가 모두 받아올 수 있는 시간을 확보하였다.
*/

// 직렬
  searchAgainVideo(searchUrl){
    utility.runAjax(function(e){
      let data = JSON.parse(e.target.responseText);
      this.nextPageToken = data.nextPageToken;

      this.videoArr = data.items.map((item, index) => {
        return {
          videoId : item.id.videoId,
          title : item.snippet.title,
          publishedAt : item.snippet.publishedAt,
          thumbUrl : item.snippet.thumbnails.default.url
        }
      })
      //console.log(this.videoArr)

      this.getVideoDuration();
      //this.getVideoViewCount()

    }.bind(this), "GET", searchUrl)
  }

  getVideoDuration(){
    let count = 0;
    this.videoArr.map((item, index) => {
      let statisticsUrl = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id="+item.videoId+"&key="+this.UTUBEKEY+"";
      utility.runAjax(function(e){
        let data = JSON.parse(e.target.responseText);
        let viewCount = data.items[0].statistics.viewCount;
        this.videoArr[index].viewCount = viewCount;
        count++;
        if(count === this.videoArr.length){
          this.getVideoViewCount();
        }
      }.bind(this), "GET", statisticsUrl)
    })
  }

  getVideoViewCount(){
    let count = 0;
    this.videoArr.map((item, index) => {
      let contentDetailsUrl = "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id="+item.videoId+"&key="+this.UTUBEKEY+"";
      utility.runAjax(function(e){
        let data = JSON.parse(e.target.responseText);
        let duration = data.items[0].contentDetails.duration;
        this.videoArr[index].duration = duration;
        count++;
        if(count === this.videoArr.length){
          this.setState({
            items : this.state.items.concat(this.videoArr),
            nextPageToken : this.nextPageToken
          })
        }
      }.bind(this), "GET", contentDetailsUrl)
    })
  }

  clickAddButton(index){
    //console.log(this.state.items[index])
    this.selectedVideo.push()
  }


  moreVideoList(){
    const url = this.searchUrl.concat("&pageToken="+this.state.nextPageToken);

    let searchList = document.querySelector(".searchList");
    let scrollHeight  = searchList.scrollHeight;
    let clientHeight  = searchList.clientHeight;
    let scrollTop  = searchList.scrollTop;

    if((scrollHeight - scrollTop) === clientHeight){
      this.searchAgainVideo(url)
    }
  }

  componentDidMount(){
  }


  render(){
    //console.log(this.state.items)
    return(
      <div className="rightArea">
        <SearchInputBox
          searchVideo = {this.searchVideo}
        />
        <SearchList
          items = {this.state.items}
          clickAddButton = {this.clickAddButton}
          moreVideoList = {this.moreVideoList}
        />
      </div>
    )
  }
}

export default MainList;
