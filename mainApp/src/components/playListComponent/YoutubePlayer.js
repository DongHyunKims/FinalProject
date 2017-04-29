/**
 * Created by donghyunkim on 2017. 4. 18..
 */

import React, {Component} from 'react';
import load from 'load-script';



const SDK_URL = 'https://www.youtube.com/iframe_api';
const SDK_GLOBAL = 'YT';

const DEFAULT_PLAYER_VARS = {
    autoplay: 0,
    playsinline: 1,
    showinfo: 0,
    rel: 0,
    iv_load_policy: 3
}

class YoutubePlayer extends Component{

    constructor(props){
        super(props);


        load(SDK_URL, function (err, script) {
            if (err) {
                // print useful message
            }
            else {
                console.log("fasfasdfasd",script.src);// Prints 'foo'.js'
                // use script
                // note that in IE8 and below loading error wouldn't be reported
            }
        })
    }
    //youtube url 생성 메소드
    createYoutubeUrl(src){
        let opts = this.props.opts;
        return Object.keys(opts).reduce((pre,post)=>{
            let opt = "&" + post + "=" + opts[post];
            return pre + opt;
        },src);
    }

    render() {
        let {styles,videoId} = this.props;
        let src = "https://www.youtube.com/embed/" + videoId + "?";
        src = this.createYoutubeUrl(src);
        if(!styles){
            styles = {
                width: "100%",
                height: "100%",
            }
        }


        let renderingIframe = <div>Loading...</div>;

        if(videoId){
            renderingIframe =  <iframe style={styles} src={src} frameBorder="0" allowFullScreen ></iframe>;
        }

        //controls=0
        //autoplay=1
        //playlist=XGSy3_Czz8k&loop=1
        //?autoplay=1&rel=0&enablejsapi=1&frameborder=0&allowfullscreen

        return (
            <div className="youtubePlayerArea">
                {renderingIframe}
            </div>
        );
    }

}

export default YoutubePlayer;