/**
 * Created by donghyunkim on 2017. 4. 24..
 */
import React, {Component} from 'react';
import "./playList.css";
import YoutubePlayerComponent from "./Youtube";
import config from "../../utility/config"


import PlayListSection from "./PlayListSection";

class PlayList extends Component {

    constructor(props){
        super(props);
    }



    render(){
        let {playState,playList,deletePlayListBtnClickHandler,checkClickHandler,selectAllBtnClickHandler,checkIdxList,selectAllIsChecked,playListClickHandler,selectedKey,onReady,onPlayerStateChange,videoState} = this.props;
       const opts = {
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay:1,
                controls:0
            },
            width: "100%",
            height: "100%",
        };
        let youtubePlayer = <img src= {config.DEFAULT_SERVER_URL + "/images/default/video.png"} />;
        if(playState){
            let {playingData} = playState;
            let {videoId} = playingData;
             youtubePlayer = <YoutubePlayerComponent videoId={videoId} opts={opts} onReady={onReady}  onStateChange={onPlayerStateChange} />;

        }

        return (
          <div className="leftArea">
              <div className="youtubePlayerArea">
                { youtubePlayer }
              </div>
              <PlayListSection

                  playList={playList}
                  videoState={videoState}
                  playListClickHandler={playListClickHandler}
                  selectedKey={selectedKey}
                  deletePlayListBtnClickHandler={deletePlayListBtnClickHandler}
                  checkClickHandler={checkClickHandler}
                  selectAllBtnClickHandler={selectAllBtnClickHandler}
                  checkIdxList={checkIdxList}
                  selectAllIsChecked={selectAllIsChecked}
              />
          </div>
        );
    }

}


//                    <AlbumListComponent videoData={videoData} albumListClickHandler={this.albumListClickHandler} selectedKey={selectedKey} />
export default PlayList;
