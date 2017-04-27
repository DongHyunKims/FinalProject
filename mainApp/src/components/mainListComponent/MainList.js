import React from "react"
import "./mainList.css"

import utility from "../../utility/utility"

import SearchInputBox from "./SearchInputSection"
import SearchList from "./SearchList"

class MainList extends React.Component{
  constructor(){
    super()
    this.state = {
      items : []
    }

    this.simpleFetch = this.simpleFetch.bind(this);
    this.promiseSearchVideo = this.promiseSearchVideo.bind(this);
  }

  simpleFetch(url){
    return new Promise(function(resolve, reject){
      utility.runAjax(function(e){
        let htData = JSON.parse(e.target.responseText);
        if(typeof htData !== "object"){
          reject("wrong data");
        }else{
          resolve(htData);
        }
      }, "GET", url)
      /*
      const req = new XMLHttpRequest();
      req.addEventListener("load", function(e){
        let htData = JSON.parse(e.target.responseText);
        if(typeof htData !== "object"){
          reject("wrong data");
        }else{
          resolve(htData);
        }
      })
      req.open("GET", url);
      req.send();*/
    })
  }

  promiseSearchVideo(keyword){
    const UTUBEKEY = "AIzaSyDIkMgAKPVBeKhZcwdDo_ijqPiiK8DbYsA";

    let obj = {};
    let encodedKeword = encodeURI(keyword);
    let url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+encodedKeword+"&key="+UTUBEKEY+"&type=video"

    this.simpleFetch(url)
    .then(function(data){

      this.setState({
        items : data.items
      })

      //console.log(data)
      /*
      obj = {
        searchedData : data.items,
        nextPageToken : data.nextPageToken
      }*/
      //let url = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id="+data.id.videoId+"&key="+UTUBEKEY+""
      //return this.simpleFetch(url)
    }.bind(this))
  }

  render(){
    return(
      <div className="rightArea">
        <SearchInputBox
          promiseSearchVideo = {this.promiseSearchVideo}
        />
        <SearchList
          items = {this.state.items}
        />
      </div>
    )
  }
}

export default MainList;
