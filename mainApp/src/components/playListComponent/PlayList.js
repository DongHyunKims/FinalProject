/**
 * Created by donghyunkim on 2017. 4. 24..
 */
import React, {Component} from 'react';
import "./playList.css";
import YoutubePlayerComponent from "./Youtube";


import PlayListSection from "./PlayListSection";

class PlayList extends Component {

    constructor(props){
        super(props);
        this.youtubePlayer = null;
    }
    //
    // componentDidMount(){
    //
    //
    //     let {onReady, onPlayerStateChange} = this.props;
    //     let opts = {
    //         // playerVars: { // https://developers.google.com/youtube/player_parameters
    //         //     autoplay: 1
    //         // },
    //         width: "100%",
    //         height: "100%",
    //         playerVars: { // https://developers.google.com/youtube/player_parameters
    //             autoplay: 0
    //         }
    //     };
    //
    //     this.youtubePlayer= <YoutubePlayerComponent videoId={"FqRgAs0SOpU"} opts={opts} onReady={onReady} onStateChange={onPlayerStateChange}/>;
    //     console.log(this.youtubePlayer);
    // }
    //
    //


    render(){
        let {playList,deletePlayListBtnClickHandler,checkClickHandler,selectAllBtnClickHandler,checkIdxList,selectAllIsChecked,playListClickHandler,selectedData,selectedKey,onReady,onPlayerStateChange,opts} = this.props;


        this.youtubePlayer = <div>loading...</div>;
        if(selectedData){

            let {videoId} = selectedData;
            //playController
            //console.log("player",player);
            //console.log("videoState",videoState);
             this.youtubePlayer = <YoutubePlayerComponent videoId={videoId} opts={opts} onReady={onReady}  onStateChange={onPlayerStateChange} />;
            //youtubePlayer.

        }

        return (
          <div className="leftArea">
              <div className="youtubePlayerArea">
                { this.youtubePlayer }
              </div>
              <PlayListSection

                  playList={playList}
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
