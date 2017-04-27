/**
 * Created by donghyunkim on 2017. 4. 27..
 */
import React, {Component} from 'react';




class PlayListPart extends Component {

    constructor(props){
        super(props);
        this.state = { flipped: null };
        this.mouseOut = this.mouseOut.bind(this);
        this.mouseOver = this.mouseOver.bind(this);
    }



    mouseOut(event) {
        console.log("Mouse out!!!");
        this.setState({flipped: false});
    }

    mouseOver(event) {
        console.log("Mouse over!!!");
        this.setState({flipped: true});
    }

    flipped(){
    if (this.state.flipped === null) {
        return "03:45";
    }
        return this.state.flipped ? <img src='./images/default/Ok-64.png' /> : "03:45";
    }



    render() {

        let {videoSnippet, selectedKey, idx, videoId, onClick} = this.props;
        let title = videoSnippet.title;
        let iconRendering = null;
        let playlistPartStyle = null;
        let playListFontStyle = null;

        if (selectedKey === idx) {

            playlistPartStyle = {
                backgroundColor: "#FD0061",
            };
            playListFontStyle = {
                color: "#FFFFFF"
            };
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


        return (
            <div className="playListPartArea" onClick={onClick} style={playlistPartStyle}
                 onMouseOver={this.mouseOver}
                 onMouseOut={this.mouseOut}
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

                <div className="iconDiv playListPartDurationArea" style={playListFontStyle}>

                    {this.flipped()}
                </div>
            </div>
        );
    }

}

//onMouseOut={this.mouseOut}

export default PlayListPart;