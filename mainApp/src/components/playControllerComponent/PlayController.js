/**
 * Created by @sujinleeme on 2017. 4
 */
import React from 'react';
import YouTube from './Youtube';
import ReactDOM from 'react-dom';
import "./playController.css"

// 이전 버튼, 이후 버튼, 플레이리스트 내 컴포넌트를 클릭할 때마다 prev, current, next Video ID를 업데이트할 수 있는 메소드가 필요.
const selectedVideo = {id : {prev: 'XNoMw1Dmqzs', current: '-DX3vJiqxm4', next:'MmKlaGpmYig'}}

function contentClass(isShow) {
  isShow ? "invisible" : "visible"
}

class PlayController extends React.Component {
  constructor() {
    super();

    this.state = {
      videoId: selectedVideo.id.current,
      player: null,
      event_map: { playing: false,
                   curTime: null, // 현재 재생 시간
                   totalTime: null, // 전체 비디오 재생 시간 
                   volumeChange: null // 볼륨 조절
                  }
    };

    this.opts = {
      videoId: this.state.videoId,
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };
    
    this.onReady = this.onReady.bind(this);
    this.onChangePrevVideo = this.onChangePrevVideo.bind(this);
    this.onChangeNextVideo = this.onChangeNextVideo.bind(this);
    this.onPlayVideo = this.onPlayVideo.bind(this);
    this.onPauseVideo = this.onPauseVideo.bind(this);
    this.onEndVideo = this.onEndVideo.bind(this);
    this.setDuration = this.setDuration.bind(this);
  }
 
  onReady(event) {
    console.log(`재생 될 비디오 아이디 : "${this.state.videoId}"`);
    this.setState({ player: event.target });
    this.state.player ? this.setDuration() : null
    console.log("재생 될 비디오 아이디", this.state.event_map.totalTime);
  }

  setDuration() {
    const duration = this.state.player.getDuration();
    this.setState({
      event_map: Object.assign({}, this.state.event_map, {
        totalTime: duration
      }),
    }); 
  }

  onPlayVideo() {
    this.opts.playerVars.autoplay = 1;
    this.state.player.playVideo();
    if(YouTube.PlayerState.PLAYING) {
      this.setState({
         event_map: Object.assign({}, this.state.event_map, { playing: true }),
      });

      while (this.state.event_map.totalTime < 1) {
        this.setDuration();
        console.log('현재ㄴㅇㄹㅇㄴㄹ', this.state.videoId, this.state.event_map.playing, this.state.event_map.totalTime);
      }
      console.log('업데이트되었다');
      console.log('현재 재생시간', this.state.videoId, this.state.event_map.playing, this.state.event_map.totalTime);

     
    }
  }

  onPauseVideo() {
     this.setState({
      event_map: Object.assign({}, this.state.event_map, { playing: false }),
    });
    this.state.player.pauseVideo();
    
  }

  onEndVideo() {
    this.state.player.endVideo();
  }
 
  // 다음 비디오로 이동
  onChangeNextVideo() {
    this.setState({ videoId: selectedVideo.id.next });
    setTimeout(() => { this.onPlayVideo(); }, 500);
  }

  // 이전 비디오로 이동
  onChangePrevVideo() {
    this.setState({ videoId: selectedVideo.id.prev });

    setTimeout(() => {
      this.onPlayVideo();
}, 500);
  }

  render() {
    return (
      <div>
        <YouTube videoId={this.state.videoId} opts={this.opts} onReady={this.onReady} />
        <button onClick={this.onChangePrevVideo}>Prev</button>
        <button onClick={this.onPlayVideo} className={this.state.event_map.playing ? "invisible" : ""}>Play</button>
        <button onClick={this.onPauseVideo} className={!this.state.event_map.playing ? "invisible" : ""}>Pause</button>
        <button onClick={this.onChangeNextVideo}>Next</button>
      </div>
    );
  }
}



export default PlayController

