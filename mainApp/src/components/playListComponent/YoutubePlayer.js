/**
 * Created by donghyunkim on 2017. 4. 18..
 */

import React, {Component} from 'react';

class YoutubePlayer extends Component{

    constructor(props){
        super(props);
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
        let id = this.props.videoId;
        let styles = this.props.styles;
        let src = "https://www.youtube.com/embed/" + id + "?";
        src = this.createYoutubeUrl(src);
        if(!styles){
            styles = {
                width: "100%",
                height: "100%",
            }
        }

        //controls=0
        //autoplay=1
        //playlist=XGSy3_Czz8k&loop=1
        //?autoplay=1&rel=0&enablejsapi=1&frameborder=0&allowfullscreen

        return (
            <iframe style={styles} src={src} frameBorder="0" allowFullScreen ></iframe>
        );
    }

}

export default YoutubePlayer;