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
        };
        this.albumListClickHandler = this.albumListClickHandler.bind(this);


    }
    albumListClickHandler(key){

        let videoData = this.props.videoData;
        this.setState({selectedData : videoData.items[key], selectedKey : key});
    }

    render(){

        let {videoData} = this.props;
        let {selectedData,selectedKey} = this.state;

        let opts = {
            controls : 1,
            autoplay : 1,
        };
        //console.log("selectedData",selectedData);


        // default 사진 제공
        let youtubePlayer = <div>Loading...</div>;


        if(selectedData){
            youtubePlayer = <YoutubePlayerComponent videoId={selectedData.id.videoId} opts={opts}/>
        }

        //controls=0
        //autoplay=1
        //playlist=XGSy3_Czz8k&loop=1
        return (
          <div className="leftArea">
            <div className="youtubePlayerArea">
                {youtubePlayer}
            </div>
            <div className="playListSectionArea">
                <PlayListSection videoData={videoData} albumListClickHandler={this.albumListClickHandler} selectedKey={selectedKey} />
            </div>
          </div>
        );
    }

}


//                    <AlbumListComponent videoData={videoData} albumListClickHandler={this.albumListClickHandler} selectedKey={selectedKey} />
export default PlayList;
