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
  constructor(props){
    super(props)
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
해결 : duration을 먼저 받고 그다음에 viewCount값을 받는다.

2.
문제 : render할때 가끔 viewCount값이나 duration값이 보이지 않는다. 확인 결과 데이터에서는 정확히 값을 가져오고있었으나
render할때 그려지지 않았다.
해결 : 위 문제는 data를 전부 받아온 다음에 render가 되어야 하나 data를 모두 받기 전에 render가 되어 미쳐 그려지지 않는 값이
생긴다고 판단 하였다. 그래서 마지막 setState로 render해줄때 setTimeout을 사용하여 data가 모두 받아올 수 있는 시간을 확보하였다.
*/


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
