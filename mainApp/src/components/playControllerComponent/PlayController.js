/**
 * Created by @sujinleeme on 2017. 4
 */
import React from 'react';
import YouTube from './Youtube';
import "./playController.css"

// 이전 버튼, 이후 버튼, 플레이리스트 내 컴포넌트를 클릭할 때마다 prev, current, next Video ID를 업데이트할 수 있는 메소드가 필요.
const selectedVideo = {id : {prev: 'XNoMw1Dmqzs', current: '-DX3vJiqxm4', next:'MmKlaGpmYig'}}

function contentClass(isShow) {
  if (isShow) {
    return "invisible";
  }
  return "visible";
}

class PlayController extends React.Component {
  constructor() {
    super();

    this.state = {
      videoId: selectedVideo.id.current,
      player: null,
      event_map: { play: false, //재생 false 일경우 play는 pause가 된다.  
                   curTime: null, // 현재 재생 시간
                   totalTime: null, // 전체 비디오 재생 시간 
                   volumeChange: null // 볼륨 조절
                  }
    };

    this.onReady = this.onReady.bind(this);
    this.onChangePrevVideo = this.onChangePrevVideo.bind(this);
    this.onChangeNextVideo = this.onChangeNextVideo.bind(this);
    this.onPlayVideo = this.onPlayVideo.bind(this);
    this.onPauseVideo = this.onPauseVideo.bind(this);
    this.onEndVideo = this.onEndVideo.bind(this);
    // this.onStateChange = this.onStateChange.bind(this);
  }

  onReady(event) {
    console.log(`재생 될 비디오 아이디 : "${this.state.videoId}"`);
    this.setState({
      player: event.target,
    });
  }

  onPlayVideo() {
    this.state.player.playVideo();
    const event_map = this.state.event_map;
    event_map.play = !event_map.play; 
    // event_map.timeupdate = this.state.player.getCurrentTime();
    this.setState({event_map});
    
  }

  onPauseVideo() {
    this.state.player.pauseVideo();
    const event_map = this.state.event_map;
    event_map.play = !event_map.play; 
    this.setState({event_map});
  }

  onEndVideo() {
    this.state.player.endVideo();
  }
  //--- 현재 재생 시간 입력 
  // componentDidMount() {
  //   setInterval( () => {
  //     const event_map = this.state.event_map;
  //     event_map.curTime = this.state.player.getCurrentTime();
  //     this.setState({
  //       event_map
  //     })
  //   },100);
  //   console.log(this.state.event_map.curTime);
  // }

  // 다음 비디오로 이동
  onChangeNextVideo() {
    this.setState({
      videoId: selectedVideo.id.next,
    });
  }

  // 이전 비디오로 이동
  onChangePrevVideo() {
    this.setState({
      videoId: selectedVideo.id.prev,
    });
  }

  render() {
    return (
      <div>
        <YouTube videoId={this.state.videoId} onReady={this.onReady} />
        <button onClick={this.onChangePrevVideo}>Prev</button>
        <button onClick={this.onPlayVideo} className={this.state.event_map.play ? "invisible" : ""}>Play</button>
        <button onClick={this.onPauseVideo} className={!this.state.event_map.play ? "invisible" : ""}>Pause</button>
        <button onClick={this.onChangeNextVideo}>Next</button>
      </div>
    );
  }
}




export default PlayController

