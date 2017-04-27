/**
 * Created by donghyunkim on 2017. 4. 18..
 */
import React, {Component} from 'react';
import PlayListPart from './PlayListPart';




class PlayListSection extends Component {

    constructor(props){
        super(props);
        this.state = {
            deleteVideoCheckList : [],
        };


        this.hoverPlayListHandler = this.hoverPlayListHandler.bind(this);
    }


    hoverPlayListHandler(videoDuration,event){


        // let value = event.currentTarget.firstChild.value;
        //
        // if(value === selectedId){
        //
        // }
        let currentTarget = event.currentTarget.lastChild;


        // console.log("currentTarget",currentTarget);
        // console.log("currentTarget12312312",event.currentTarget);

            if (videoDuration) {

                console.log("mouse out");
                currentTarget.innerHTML = videoDuration;
            } else {
                console.log("mouse over");
                currentTarget.innerHTML = "<img src='./images/default/Ok-64.png' />";

            }

    }

    // checkPlayListHandler(event){
    //
    //
    // }




    render(){
        let{videoData, playListClickHandler, selectedKey} = this.props;
        //console.log("albumListClickHandler",albumListClickHandler);


        let playListSection = <h2>Album에 저장된 데이터가 없습니다</h2>;
        //videoData.items[0].id.videoId
        if(videoData){
            let items = videoData.items;
            playListSection = items.map((val,key)=>{
                let {snippet, id} = val;
                return  <PlayListPart key={id.videoId} videoSnippet={snippet} onClick={playListClickHandler.bind(null,key)} videoId={id.videoId}  selectedKey={selectedKey} idx={key} />;
            });
        }

        return (
            <div className="playListSectionArea">
                    <div className="playListSection" >
                        {playListSection}
                    </div>

                    {/*<div className="playListSectionMenu">*/}

                    {/*</div>*/}
            </div>
        );
    }

}

export default PlayListSection;
