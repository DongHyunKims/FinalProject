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

    checkClickHandler(videoId, checkIdx, isChecked, event) {

        let {deleteVideoCheckList,checkIdxList}  = this.state;
        let newDeleteVideoCheckList = [...deleteVideoCheckList];
        let newCheckIdxList = [...checkIdxList];
        //check 되어있지 않으면
        if(!isChecked){
            newDeleteVideoCheckList.push(videoId);
            newCheckIdxList.push(checkIdx);
        }else{
            //let videoIdIdx = deleteVideoCheckList.indexOf(videoId);
            let idx =  checkIdxList.indexOf(checkIdx);
            newCheckIdxList.splice(idx,1);
            newDeleteVideoCheckList.slice(idx,1);
        }

        this.setState({deleteVideoCheckList: newDeleteVideoCheckList,checkIdxList:  newCheckIdxList});
        event.stopPropagation();
    }



    render(){
        let {videoData, playListClickHandler, selectedKey} = this.props;
        let {checkIdxList} = this.state;
        //console.log("albumListClickHandler",albumListClickHandler);


        let playListSection = <h2>Album에 저장된 데이터가 없습니다</h2>;
        //videoData.items[0].id.videoId
        if(videoData){
            let items = videoData.items;
            playListSection = items.map((val,idx)=>{
                let {snippet, id} = val;
                return  <PlayListPart key={id.videoId} videoSnippet={snippet} onClick={playListClickHandler.bind(null,idx)} videoId={id.videoId}  selectedKey={selectedKey} idx={idx} checkClickHandler={this.checkClickHandler} isChecked={checkIdxList.indexOf(idx) !== -1}/>;
            });
        }

        let menuStyle = null;
        let sectionStyle = null;

        if(checkIdxList.length >= 1 ){
            sectionStyle = {
                height: "87%",
            };
            menuStyle = {
                height: "13%",
            };
        }

        return (
            <div className="playListSectionArea" >
                    <div className="playListSection" style={sectionStyle}>
                        {playListSection}
                    </div>

                    <div className="playListSectionMenu" style={menuStyle}>
                        <button className="button selectBtn">전체선택</button>
                        <button className="button deleteBtn">삭제</button>
                    </div>
            </div>
        );
    }

}

export default PlayListSection;
