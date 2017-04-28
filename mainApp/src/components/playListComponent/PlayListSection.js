/**
 * Created by donghyunkim on 2017. 4. 18..
 */
import React, {Component} from 'react';
import PlayListPart from './PlayListPart';
import utility from '../../utility/utility';

const style = {
    sectionStyle : {
        height: "calc(100% - 50px)"
    },
    menuStyle : {
        height: "50px",
    },

};

const DEFAULT_URL = "http://localhost:3000";

class PlayListSection extends Component {

    constructor(props){
        super(props);
        this.state = {
            deleteVideoCheckList : [],
            checkIdxList : [],
        };
        this.checkClickHandler = this.checkClickHandler.bind(this);
        this.selectAllBtnClickHandler = this.selectAllBtnClickHandler.bind(this);
        this.deleteBtnClickHandler = this.deleteBtnClickHandler.bind(this);
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

    selectAllBtnClickHandler(){

        let {videoData} = this.props;
        let items = videoData.items;
        let newDeleteVideoCheckList = [];
        let newCheckIdxList = [];
        items.forEach((val,idx)=>{
            let {id} = val;
            newDeleteVideoCheckList.push(id.videoId);
            newCheckIdxList.push(idx);
        });

        this.setState({deleteVideoCheckList: newDeleteVideoCheckList,checkIdxList:  newCheckIdxList});

    }

    deleteBtnClickHandler(){

        /*
            DB를 통해서 데이터 삭제
            ajax
            utility.runAjax(this.deleteReqListener,"POST",DEFAULT_URL + "/playList/delete");
         */

        console.log("delete");


    }
    deleteReqListener(){

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

            menuStyle = style.menuStyle;
            sectionStyle = style.sectionStyle;
        }

        return (
            <div className="playListSectionArea" >
                    <div className="playListSection" style={sectionStyle}>
                        {playListSection}
                    </div>

                    <div className="playListSectionMenu" style={menuStyle}>
                        <button className="button defaultButton" onClick={this.selectAllBtnClickHandler}>전체선택</button>
                        <button className="button dangerButton" onClick={this.deleteBtnClickHandler}>삭제</button>
                    </div>
            </div>
        );
    }

}

export default PlayListSection;
