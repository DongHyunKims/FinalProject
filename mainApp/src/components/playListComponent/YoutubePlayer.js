/**
 * Created by donghyunkim on 2017. 4. 18..
 */

import React, {Component} from 'react';
import loadScript from 'load-script';



const SDK_URL = 'https://www.youtube.com/iframe_api';
const SDK_GLOBAL = 'YT';
const SDK_GLOBAL_READY = 'onYouTubeIframeAPIReady';

//
// const DEFAULT_PLAYER_VARS = {
//     autoplay: 0,
//     playsinline: 1,
//     showinfo: 0,
//     rel: 0,
//     iv_load_policy: 3
// };

class YoutubePlayer extends Component{

    constructor(props){
        super(props);
        this.state = {
            player: null,
            playerState : -1,
            isReady: false,
        };

        this.ref = this.ref.bind(this);
        this.load = this.load.bind(this);
        this.getSDK = this.getSDK.bind(this);
        this.onPlayerReady = this.onPlayerReady.bind(this);
    }

    componentDidMount(){
        this.load();

    }


    getSDK(){

        // if (window[SDK_GLOBAL] && window[SDK_GLOBAL].loaded) {
        //     return Promise.resolve(window[SDK_GLOBAL]);
        // }

        return new Promise((resolve,reject)=>{
            //onYouTubeIframeAPIReady 함수는 플레이어 API 코드가 다운로드되는 즉시 실행됩니다.
            //onYouTubeIframeAPIReady함수는 global scope에 존재 해야 합니다
            window[SDK_GLOBAL_READY] = function () {
                //console.log("previousOnReady",previousOnReady);
                //if (previousOnReady) previousOnReady();
                resolve(window[SDK_GLOBAL]);
            };

            loadScript(SDK_URL, err => {
                if (err) reject(err)
            });
            //  YT: window[SDK_GLOBAL],

        });
    }

    load(){
        this.getSDK().then((YT)=>{
            let player = new YT.Player(this.container, {
                height: '100%',
                width: '100%',
                events:{
                    onReady: this.onPlayerReady.bind(null,'M7lc1UVf-VE')
                }
            });

            this.setState({player: player});

        }).catch((err)=>{
            console.log(err);
        });

    }

    onPlayerReady(videoId) {
        //player.loadVideoById(videoId);
        let { player } = this.state;
        player.loadVideoById(videoId);
        //player.playVideo();
        this.setState({ isReady : true });

    }



    // //youtube url 생성 메소드
    // createYoutubeUrl(src){
    //     let opts = this.props.opts;
    //     return Object.keys(opts).reduce((pre,post)=>{
    //         let opt = "&" + post + "=" + opts[post];
    //         return pre + opt;
    //     },src);
    // }


    ref(container){
        this.container = container
    }


    render() {
        let {styles,videoId} = this.props;
        let { player,isReady } = this.state;

        if(isReady && videoId){
            player.loadVideoById(videoId);
        }


        return (
            <div ref={this.ref} />
        );
    }

}

export default YoutubePlayer;/**
 * Created by donghyunkim on 2017. 5. 1..
 */
