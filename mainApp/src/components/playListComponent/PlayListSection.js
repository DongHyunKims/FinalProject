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
            checkIdxList : [],
        };
        this.checkClickHandler = this.checkClickHandler.bind(this);
    }

    /*
    videoId
    checkState
    idx
    */

    checkClickHandler(videoId, checkIdx,event) {

        let {deleteVideoCheckList,checkIdxList}  = this.state;
        let newDeleteVideoCheckList = [...deleteVideoCheckList , videoId];
        let newCheckIdx = [...checkIdxList , checkIdx];
        console.log("newDeleteVideoCheckList",newDeleteVideoCheckList);
        console.log("newCheckIdx",newCheckIdx);
        this.setState({deleteVideoCheckList: newDeleteVideoCheckList,checkIdxList:  newCheckIdx});
        event.stopPropagation();
    }



    render(){
        let{videoData, playListClickHandler, selectedKey} = this.props;
        //console.log("albumListClickHandler",albumListClickHandler);


        let playListSection = <h2>Album에 저장된 데이터가 없습니다</h2>;
        //videoData.items[0].id.videoId
        if(videoData){
            let items = videoData.items;
            playListSection = items.map((val,idx)=>{
                let {snippet, id} = val;
                return  <PlayListPart key={id.videoId} videoSnippet={snippet} onClick={playListClickHandler.bind(null,idx)} videoId={id.videoId}  selectedKey={selectedKey} idx={idx} checkClickHandler={this.checkClickHandler}/>;
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
