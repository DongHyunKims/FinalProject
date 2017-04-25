/**
 * Created by donghyunkim on 2017. 4. 18..
 */
import React, {Component} from 'react';
import "./PlayListSection.css";



const PlayListPart = function(props){

    let {videoSnippet,selectedKey,idx} = props;
    let title = videoSnippet.title;
    let iconRendering = null;
    let alStyle = null;
    let asStyle = null;

    if(selectedKey === idx){

        alStyle = {
            backgroundColor: "#FD0061",
        };
        asStyle ={
            color: "#FFFFFF"
        }
        iconRendering = ( <div className="eq">
            <div className="eq__bar"></div>
            <div className="eq__bar"></div>
            <div className="eq__bar"></div>
        </div> );
    }else{
        iconRendering = (
            <img src="./images/Headphones-64.png" />
        )
    }


    /*
    <div className="eq">
        <div className="eq__bar"></div>
        <div className="eq__bar"></div>
        <div className="eq__bar"></div>
    </div>
    */



    return (
        <div className="album_section" onClick={props.onClick} style={alStyle}>
            <div className="icon album_section_icon">
                {iconRendering}
            </div>
            <div className="album_section_title" style={asStyle}>
                {title}
            </div>
        </div>
    );
};


class PlayListSection extends Component {

    constructor(props){
        super(props);

    }

    render(){
        let{lStyle, videoData, albumListClickHandler, selectedKey} = this.props;
        console.log("albumListClickHandler",albumListClickHandler);

        if(!lStyle){
            lStyle = {
                width : "100%",
                height : "100%",
            }
        }

        let playListSection = <h2>Album에 저장된 데이터가 없습니다</h2>;
        //videoData.items[0].id.videoId
        if(videoData){
            let items = videoData.items;
            playListSection = items.map((val,key)=>{
                let videoSnippet = val.snippet;
                return  <PlayListPart key={val.id.videoId} videoSnippet={videoSnippet} onClick={albumListClickHandler.bind(null,key)}  selectedKey={selectedKey} idx={key}/>;
            });

        }


/*

 <div className="album_menu">

 </div>
 */
        return (
            <div className="album_list" style={lStyle}>
                <div className="album_menu">

                </div>
                <div className="album_section_list" >
                    {playListSection}
                </div>
            </div>
        );
    }

}

export default PlayListSection;