/**
 * Created by donghyunkim on 2017. 4. 18..
 */
import React, {Component} from 'react';
import PlayListPart from './PlayListPart';
import utility from '../../utility/utility';

const playListSectionStyle = {
    sectionStyle : {
        height: "calc(100% - 50px)"
    },
    menuStyle : {
        height: "50px",
    },
};


class PlayListSection extends Component {

    constructor(props){
        super(props);
        this.state = {
            deleteVideoCheckList : [],
            checkIdxList : [],
            selectAllIsChecked : false,
        };
        this.checkClickHandler = this.checkClickHandler.bind(this);
        this.selectAllBtnClickHandler = this.selectAllBtnClickHandler.bind(this);
        this.deleteBtnClickHandler = this.deleteBtnClickHandler.bind(this);
    }

    //check click handler
    checkClickHandler(videoId, checkIdx, isChecked, event) {

        let {deleteVideoCheckList,checkIdxList}  = this.state;
        let {playList} = this.props;
        //let items = videoData.items;
        let currentSelectAllIsChecked = false;

        let newDeleteVideoCheckList = [...deleteVideoCheckList];
        let newCheckIdxList = [...checkIdxList];
        //check 되어있지 않으면
        if(!isChecked){
            newDeleteVideoCheckList.push(videoId);
            newCheckIdxList.push(checkIdx);
        }else{
            let idx =  checkIdxList.indexOf(checkIdx);
            newCheckIdxList.splice(idx,1);
            newDeleteVideoCheckList.splice(idx,1);
        }


        if(newCheckIdxList.length === playList.length){
            currentSelectAllIsChecked = true;
        }

        console.log("currentSelectAllIsChecked",currentSelectAllIsChecked);

        this.setState({deleteVideoCheckList: newDeleteVideoCheckList,checkIdxList:  newCheckIdxList, selectAllIsChecked: currentSelectAllIsChecked});
        event.stopPropagation();
    }

    //전체선택 버튼 클릭 handler
    selectAllBtnClickHandler(){

        let {playList} = this.props;
        let {selectAllIsChecked} = this.state;
        let currentSelectAllIsChecked = false;
        //let items = videoData.items;
        let newDeleteVideoCheckList = [];
        let newCheckIdxList = [];


        if(!selectAllIsChecked){
            /*
             데이터 조작 필요
             */
            playList.forEach((val,idx)=>{
                let {videoId} = val;
                newDeleteVideoCheckList.push(videoId);
                newCheckIdxList.push(idx);
            });
            currentSelectAllIsChecked = true;
        }
        this.setState({deleteVideoCheckList: newDeleteVideoCheckList,checkIdxList:  newCheckIdxList, selectAllIsChecked : currentSelectAllIsChecked});

    }


    //삭제버튼 클릭 handler
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
        let {playList, playListClickHandler, selectedKey} = this.props;
        let {checkIdxList,selectAllIsChecked} = this.state;
        let menuStyle = null;
        let sectionStyle = null;

        /*
           데이터 어떻게 받을지 생각 해야한다
           데이터 조작 필요
         */
        let playListSection = <h2>Album에 저장된 데이터가 없습니다</h2>;
        if(playList){
            //let items = videoData.items;
            playListSection = playList.map((val,idx)=>{
                let {_id} = val;
                return  <PlayListPart key={_id} videoSnippet={val} onClick={playListClickHandler.bind(null,idx)} videoId={val.videoId}  selectedKey={selectedKey} idx={idx} checkClickHandler={this.checkClickHandler} isChecked={checkIdxList.indexOf(idx) !== -1}/>;
            });
        }
        if(checkIdxList.length >= 1 ) {
            menuStyle = playListSectionStyle.menuStyle;
            sectionStyle = playListSectionStyle.sectionStyle;
        }

        let selectAllText = "전체선택";
        if(selectAllIsChecked){
            selectAllText = "전체해제";
        }

        return (
            <div className="playListSectionArea" >
                    <div className="playListSection" style={sectionStyle}>
                        {playListSection}
                    </div>

                    <div className="playListSectionMenu" style={menuStyle}>
                        <button className="button defaultButton" onClick={this.selectAllBtnClickHandler}>{selectAllText}</button>
                        <button className="button dangerButton" onClick={this.deleteBtnClickHandler}>삭제</button>
                    </div>
            </div>
        );
    }

}

export default PlayListSection;
