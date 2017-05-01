/**
 * Created by donghyunkim on 2017. 4. 24..
 */
import React, {Component} from 'react';
import "./playList.css";
import YoutubePlayerComponent from "./YoutubePlayer";
import PlayListSection from "./PlayListSection";

class PlayList extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectedData : null,
            selectedKey : -1,
            intervalId : null,
        };
        this.playListClickHandler = this.playListClickHandler.bind(this);


    }
    playListClickHandler(key){

        let {videoData} = this.props;
        this.setState({selectedData : videoData.items[key], selectedKey : key});
    }


    // componentDidUpdate() {
    //
    //     let {selectedKey} = this.state;
    //     console.log("selectedKey",selectedKey);
    //     this.timerID = setInterval(this.playListClickHandler.bind(null,selectedKey+1), 6000);
    //
    // }
    //
    // componentWillUpdate() {
    //     clearInterval(this.timerID);
    // }
    //
    //
    //
    //
    //


    render(){

        let {videoData} = this.props;
        let {selectedData,selectedKey} = this.state;


        let opts = {
            controls : 1,
            autoplay : 1,
        };

        //console.log("selectedData",selectedData);


        let youtubePlayer = <div> loading... </div>;
        if(selectedData){
            let videoId = selectedData.id.videoId;
            youtubePlayer = <YoutubePlayerComponent videoId={videoId} opts={opts}/>
        }


        //controls=0
        //autoplay=1
        //playlist=XGSy3_Czz8k&loop=1




        return (
          <div className="leftArea">

              <div className="youtubePlayerArea">
                {youtubePlayer}
              </div>
              <PlayListSection videoData={videoData} playListClickHandler={this.playListClickHandler} selectedKey={selectedKey} />
          </div>
        );
    }

}


//                    <AlbumListComponent videoData={videoData} albumListClickHandler={this.albumListClickHandler} selectedKey={selectedKey} />
export default PlayList;
