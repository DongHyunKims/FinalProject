import React from "react"
import "./searchListSection.css"

import utility from "../../../utility/utility"

import moment from 'moment'


import SearchInputBox from "./SearchInputSection"
import SearchList from "./SearchList"
/*
 this.addSelectedVideo = this.addSelectedVideo.bind(this);
 this.delSelectedVideo = this.delSelectedVideo.bind(this);
 this.changeIsAllClearAddBtn = this.changeIsAllClearAddBtn.bind(this);
 this.addSelectedVideoToAlbum = this.addSelectedVideoToAlbum.bind(this);


 */
class MainList extends React.Component{
  constructor(){
    super()
    this.state = {
      // items : [],
      // nextPageToken : "",
      // selectedVideoArr : [],
      // isSelectedArr : false,
      // isAllClearAddBtn : false
    };
    //
    // this.UTUBEKEY = "AIzaSyDIkMgAKPVBeKhZcwdDo_ijqPiiK8DbYsA";
    // this.searchUrl = "";
    // this.videoArr = [];
    // this.nextPageToken = "";
    // this.searchVideo = this.searchVideo.bind(this);

    // this.addSelectedVideo = this.addSelectedVideo.bind(this);
    // this.delSelectedVideo = this.delSelectedVideo.bind(this);
    // this.addSelectedVideoToAlbum = this.addSelectedVideoToAlbum.bind(this);
    // this.moreVideoList = this.moreVideoList.bind(this);
    // this.searchAgainVideo = this.searchAgainVideo.bind(this);
    // this.getVideoDuration = this.getVideoDuration.bind(this);
    // this.getVideoViewCount = this.getVideoViewCount.bind(this);
    // this.changeIsAllClearAddBtn = this.changeIsAllClearAddBtn.bind(this);
  }

  // searchVideo(keyword){
  //   this.setState({
  //     items : [],
  //     nextPageToken : "",
  //     selectedVideoArr : []
  //   });
  //
  //
  //   let encodedKeword = encodeURI(keyword);
  //   this.searchUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q="+encodedKeword+"&key="+this.UTUBEKEY+"&type=video"
  //
  //   this.searchAgainVideo(this.searchUrl);
  // }

/*
map은 순서대로 도네?

hell ajax 작동방법!!
1. 처음 키워드 값으로 검색리스트를 받아온다.
2. 받아온 리스트에는 각각 videoId 값이 존재한다.
3-1. 리스트 각각의 받아온 videoId값으로 viewCount값을 받아오는 API URL을 작성하여 받아온다.
3-2. 리스트 각각의 받아온 videoId값으로 durtion값을 받아오는 API URL을 작성하여 받아온다.

1.
문제 : viewCount 값과 duration값을 해당 videoId값으로 각각 받아와야하는데 병렬로 받아야 하나? 직렬로 받아야하나?
해결 : duration을 먼저 받고 그다음에 viewCount값을 받는다.

2.
문제 : render할때 가끔 viewCount값이나 duration값이 보이지 않는다. 확인 결과 데이터에서는 정확히 값을 가져오고있었으나
render할때 그려지지 않았다.
해결 : 위 문제는 data를 전부 받아온 다음에 render가 되어야 하나 data를 모두 받기 전에 render가 되어 미쳐 그려지지 않는 값이
생긴다고 판단 하였다. 그래서 마지막 setState로 render해줄때 setTimeout을 사용하여 data가 모두 받아올 수 있는 시간을 확보하였다.
*/

//   searchAgainVideo(searchUrl){
//     utility.runAjax(function(e){
//       let data = JSON.parse(e.target.responseText);
//       this.nextPageToken = data.nextPageToken;
//
//
//       this.videoArr = data.items.map((item, index) => {
//         return {
//           videoId : item.id.videoId,
//           title : item.snippet.title,
//           publishedAt : item.snippet.publishedAt,
//           thumnail : item.snippet.thumbnails.default.url
//         }
//       })
//
//       this.getVideoViewCount();
//
//     }.bind(this), "GET", searchUrl)
//   }
//
//   getVideoViewCount(){
//     let count = 0;
//     this.videoArr.map((item, index) => {
//       let statisticsUrl = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id="+item.videoId+"&key="+this.UTUBEKEY+"";
//       utility.runAjax(function(e){
//
//         let data = JSON.parse(e.target.responseText);
//         let viewCount = data.items[0].statistics.viewCount;
//         this.videoArr[index].viewCount = viewCount;
//         count++;
//         if(count === this.videoArr.length){
//           this.getVideoDuration();
//         }
//       }.bind(this), "GET", statisticsUrl)
//     })
//   }
// //함수형 setState, jsWeekly - redux를 써봐라, component를 가볍게 순수하게 component는 UI Render하는것에 집중, config 분리, 주석정리, 디버거사용 소스맵, map(forEach)
//   getVideoDuration(){
//     let count = 0;
//     this.videoArr.map((item, index) => {
//       let contentDetailsUrl = "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id="+item.videoId+"&key="+this.UTUBEKEY+"";
//       utility.runAjax(function(e){
//         let data = JSON.parse(e.target.responseText);
//         let duration = data.items[0].contentDetails.duration;
//         let changedDuration = "";
//
//         changedDuration = moment.duration(duration, moment.ISO_8601)
//         this.videoArr[index].duration = changedDuration._milliseconds;
//
//         count++;
//         if(count === this.videoArr.length){
//           this.setState({
//             items : this.state.items.concat(this.videoArr),
//             nextPageToken : this.nextPageToken
//           })
//         }
//       }.bind(this), "GET", contentDetailsUrl)
//     })
//   }


  // addSelectedVideo(index){
  //   this.setState({
  //     selectedVideoArr : this.state.selectedVideoArr.concat(this.state.items[index]),
  //     isSelectedArr : true
  //   })
  // }

  // delSelectedVideo(videoId){
  //   let selectedVideoArr = [];
  //   let isSelectedArr = false;
  //
  //   selectedVideoArr = [...this.state.selectedVideoArr];
  //
  //   selectedVideoArr.forEach((data, index)=>{
  //     if(data.videoId === videoId){
  //       selectedVideoArr.splice(index, 1);
  //     }
  //   })
  //
  //   if(selectedVideoArr.length !== 0){
  //     isSelectedArr = true;
  //   }
  //
  //   this.setState({
  //     selectedVideoArr : [...selectedVideoArr],
  //     isSelectedArr : isSelectedArr
  //   })
  // }

  // addSelectedVideoToAlbum(_id){
  //   let utilLayer = document.querySelector(".utilLayer");
  //   utilLayer.classList.remove("show");
  //
  //   let insertData = {
  //       albumId : _id,
  //       selectedVideoArr : this.state.selectedVideoArr
  //   };
  //
  //   let jsonData = JSON.stringify(insertData);
  //   //console.log(jsonData)
  //   utility.runAjaxData(function(e){
  //     console.log(e)
  //     this.setState({
  //       selectedVideoArr : [],
  //       isSelectedArr : false,
  //       isAllClearAddBtn : true
  //     })
  //   }.bind(this), "POST", "/mainList/videos", jsonData, "application/json")
  // }

  // changeIsAllClearAddBtn(){
  //   this.setState({
  //     isAllClearAddBtn : false
  //   })
  // }



  //utility.runAjaxData(this.deleteReqListener,"POST","/playList/deletePlayList", jsonData, "application/json");


  // moreVideoList(){
  //   const url = this.searchUrl.concat("&pageToken="+this.state.nextPageToken);
  //
  //   let searchList = document.querySelector(".searchList");
  //   let scrollHeight  = searchList.scrollHeight;
  //   let clientHeight  = searchList.clientHeight;
  //   let scrollTop  = searchList.scrollTop;
  //
  //   if((scrollHeight - scrollTop) === clientHeight){
  //     this.searchAgainVideo(url)
  //   }
  // }
  //

  render(){

    //console.log(this.props)
    //console.log(this.state.selectedVideoArr);

    let {addSelectedVideo,delSelectedVideo,changeIsAllClearAddBtn,addSelectedVideoToAlbum, items, moreVideoList,isSelectedArr,isAllClearAddBtn,searchVideo, isSearched} = this.props;

    let renderSearchList = <div className="beforeSearchList">Search Youtube videos using the search bar!</div>
    if(isSearched){
      renderSearchList = <SearchList
        items={items}
        addSelectedVideo={addSelectedVideo}
        delSelectedVideo={delSelectedVideo}
        addSelectedVideoToAlbum={addSelectedVideoToAlbum}
        moreVideoList={moreVideoList}
        isSelectedArr={isSelectedArr}
        isAllClearAddBtn={isAllClearAddBtn}
        changeIsAllClearAddBtn={changeIsAllClearAddBtn}
      />
    }

    return(
      <div>
        <SearchInputBox
          searchVideo = {searchVideo}
        />
        {renderSearchList}
      </div>
    )
  }
}

export default MainList;
