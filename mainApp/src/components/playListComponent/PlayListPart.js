/**
 * Created by donghyunkim on 2017. 4. 27..
 */
import React, {Component} from 'react';
import utility from '../../utility/utility'


const playListPartStyle = {
    playListPartAreaStyle : {
        backgroundColor: "#FD0061",
    },
    playListPartTitleAreaFontStyle : {
        color: "#FFFFFF"
    }
};

class PlayListPart extends Component {
    constructor(props){
        super(props);
        this.state = {
            isToggled: false,
        };
        this.mouseLeave = this.mouseLeave.bind(this);
        this.mouseEnter = this.mouseEnter.bind(this);
    }

    mouseLeave() {
        //console.log("Mouse out!!!");
        this.setState({isToggled: false});
    }

    mouseEnter() {
        //console.log("Mouse over!!!");
        this.setState({isToggled: true});
    }

    checkToggle(){
        let { isToggled } = this.state;
        let { videoSnippet } = this.props;
        return isToggled ? <img src='./images/default/Ok-64.png'/> : utility.changeDuration(videoSnippet.duration);
    }

    render() {
        let { videoSnippet, selectedKey, idx, onClick, checkClickHandler, isChecked } = this.props;
        let { title,_id,videoId,duration } = videoSnippet;
        let iconRendering = null;
        let playlistPartStyle = null;
        let playListFontStyle = null;
        if (selectedKey === idx) {
            playlistPartStyle = playListPartStyle.playListPartAreaStyle;
            playListFontStyle = playListPartStyle.playListPartTitleAreaFontStyle;
            iconRendering = (
                <div className="eq">
                    <div className="eq__bar"></div>
                    <div className="eq__bar"></div>
                    <div className="eq__bar"></div>
                </div>
            );

        } else {
            iconRendering = (
                <img src="./images/default/Headphones-64.png"/>
            );
        }


        let checkIconRendering = this.checkToggle();
        if(isChecked){
            checkIconRendering =  <img src='./images/default/Ok-48.png'/>

        }


        return (
            <div className="playListPartArea" onClick={onClick} style={playlistPartStyle}
                 onMouseEnter={this.mouseEnter}
                 onMouseLeave={this.mouseLeave}
                 >
                <input type="hidden" value={videoId}/>
                <div className="iconDiv playListPartIconArea">
                    <div className="floater"></div>
                    <div className="iconArea">
                        {iconRendering}
                    </div>
                </div>

                <div className="playListPartTitleArea" style={playListFontStyle}>
                    {title}
                </div>

                <div className="iconDiv playListPartDurationArea" style={playListFontStyle} onClick={checkClickHandler.bind(null,_id,duration,idx,isChecked)}>
                    {checkIconRendering}
                </div>
            </div>
        );
    }

}

//onMouseOut={this.mouseOut}

export default PlayListPart;