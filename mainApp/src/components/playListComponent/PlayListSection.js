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

    }




    render(){
        let {playList, playListClickHandler, selectedKey, deletePlayListBtnClickHandler,checkClickHandler,selectAllBtnClickHandler,checkIdxList,selectAllIsChecked} = this.props;
        let menuStyle = null;
        let sectionStyle = null;


        /*
           데이터 어떻게 받을지 생각 해야한다
           데이터 조작 필요
         */
        let playListSection = <h2>Album에 저장된 데이터가 없습니다</h2>;


        if(playList){
            if(playList.length!==0) {
                //let items = videoData.items;
                playListSection = playList.map((val, idx, arr) => {
                    let {_id,videoId} = val;
                    return <PlayListPart
                        key={_id}
                        videoSnippet={val}
                        onClick={playListClickHandler.bind(null,arr,idx)}
                        selectedKey={selectedKey}
                        idx={idx}
                        checkClickHandler={checkClickHandler}
                        isChecked={checkIdxList.indexOf(idx) !== -1}/>;
                });
            }
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
                        <button className="button defaultButton" onClick={selectAllBtnClickHandler}>{selectAllText}</button>
                        <button className="button dangerButton" onClick={deletePlayListBtnClickHandler}>삭제</button>
                    </div>
            </div>
        );
    }

}

export default PlayListSection;
