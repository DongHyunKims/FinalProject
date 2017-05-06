/**
 * Created by @sujinleeme on 2017. 4
 */
import React from 'react';
import YouTube from './Youtube';
import "./playController.css"
import utility from '../../utility/utility';

// 이전 버튼, 이후 버튼, 플레이리스트 내 컴포넌트를 클릭할 때마다 prev, current, next Video ID를 업데이트할 수 있는 메소드가 필요.
const selectedVideo = {id : {prev: 'XNoMw1Dmqzs', current: '-DX3vJiqxm4', next:'MmKlaGpmYig'}}


function toTimeString(seconds) {
  let time = (new Date(seconds * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
	time = time.replace(/00:/, "");
	return time
}

class PlayController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoState: null,
      videoId: selectedVideo.id.current,
      player: null,
      event_map: { playing: false,
                   curTime: '0:00', // 현재 재생 시간
                   totalTime: '0:00', // 전체 비디오 재생 시간 
                   curProgressBar: 0,
                   maxProgressBar: 0,
                   volume: 50, // 볼륨 조절
                   soundOn: true
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
    this.setCurrentTime = this.setCurrentTime.bind(this);
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    this.moveSeekBar = this.moveSeekBar.bind(this);

    //sound
    this.moveVolumeBar = this.moveVolumeBar.bind(this);
    this.onSound = this.onSound.bind(this);
    this.offSound = this.offSound.bind(this);

  }

  
     
  onReady(event) {
    this.setState({ player: event.target });
    this.state.player ? this.setDuration() : null
  }

  onPlayerStateChange(event) {
    if (!(event === undefined)){
      this.setState({ videoState: event.data });
      this.setDuration();
      if(event.data === 0) {          
        this.onPauseVideo();
      }
    }
  }

  setDuration() {
    let time = Math.floor(this.state.player.getDuration());
    this.setState({
      event_map: Object.assign({}, this.state.event_map, {
        totalTime: toTimeString(time),
        maxProgressBar: time
      })
    });
  }


  setCurrentTime() {
    if (this.state.event_map.playing){
      setInterval(() => { 
        let time = Math.floor(this.state.player.getCurrentTime());
        this.setState({ event_map: Object.assign({}, this.state.event_map, { curTime: toTimeString(time), curProgressBar: time })});
      }, 1000);
    }
  }

  onPlayVideo() {
    this.setState({
      event_map: Object.assign({}, this.state.event_map, { playing: true }), 
    });
    if (this.state.videoState !== 0)
    Promise.resolve()
      .then(this.state.player.playVideo())
      .then(this.opts.playerVars.autoplay = 1)
      .then(this.setCurrentTime)
  }
  
  onPauseVideo() {
    this.setState({
      event_map: Object.assign({}, this.state.event_map, { playing: false }),
    });
    this.state.player.pauseVideo();
    if (this.state.videoState === 0 && (this.state.event_map.curProgressBar === this.state.event_map.maxProgressBar)){
      Promise.resolve()
        .then(this.onChangeNextVideo());
    }
  }

  onEndVideo() {
    this.setState({
      event_map: Object.assign({}, this.state.event_map, { playing: false }),
    });
    this.state.player.endVideo();
    this.onChangeNextVideo();
  }
  
  onChangeNextVideo() {
    this.setState({ videoId: selectedVideo.id.next });
    Promise.resolve()
      .then(this.opts.playerVars.autoplay = 1)
      .then(this.onPlayVideo).then(this.onPlayerStateChange)
  }

  onChangePrevVideo() {
    this.setState({ videoId: selectedVideo.id.prev });
    Promise.resolve()
      .then(this.opts.playerVars.autoplay = 1)
      .then(this.onPlayVideo).then(this.onPlayerStateChange)
  }
  
  moveSeekBar(event){
    let bar = utility.$selector("#seekBar");
    let time = bar.value;
    // 현재는 play 버튼을 눌러야 seekBar 플레이됨.
    // [개선필요] seekBar 값을 통해 video durtaion값을 얻어야함.
   Promise.resolve()
    .then(this.state.player.seekTo(time, true))
    .then(this.onPlayVideo)
  } 

  moveVolumeBar(event){
    let bar = utility.$selector("#volumeBar");
    let volumeVal = bar.value;
    this.setState({
      event_map: Object.assign({}, this.state.event_map, { volume: volumeVal }),
    });
    
    this.state.player.setVolume(volumeVal);
    console.log(volumeVal, this.state.event_map.volume);
    if (this.state.event_map.volume <= 1){
      Promise.resolve()
        .then(this.offSound)
    }
    else {
      Promise.resolve()
        .then(this.onSound)
    }
  }

  onSound(){
    this.setState({
      event_map: Object.assign({}, this.state.event_map, { soundOn: true })
    });
    this.state.player.unMute();
  }

  offSound(){
    this.setState({
      event_map: Object.assign({}, this.state.event_map, { soundOn: false })
    });
    this.state.player.mute();
  }
  
  render() {
    return (
      <div>
        <YouTube onStateChange={this.onPlayerStateChange} videoId={this.state.videoId} opts={this.opts} onReady={this.onReady} />
        <button onClick={this.onChangePrevVideo}>Prev</button>
        <button onClick={this.onPlayVideo} className={this.state.event_map.playing ? "invisible" : ""}>Play</button>
        <button onClick={this.onPauseVideo} className={!this.state.event_map.playing ? "invisible" : ""}>Pause</button>
        <button onClick={this.onChangeNextVideo}>Next</button>
        <input id="seekBar" orient="horizontal" type="range" min="0" max={this.state.event_map.maxProgressBar}
         value={this.state.event_map.curProgressBar} step="0.1" onChange={this.moveSeekBar} />
        <button onClick={this.onSound} className={this.state.event_map.soundOn ? "invisible" : ""}>soundON</button>
        <button onClick={this.offSound} className={!this.state.event_map.soundOn ? "invisible" : ""}>soundOFF</button>
        <input id="volumeBar" orient="vertical" type="range" min="0" 
        max="100" defaultValue={this.state.event_map.volume} step="1" onChange={this.moveVolumeBar} />
        <h1>{this.state.event_map.curTime} / {this.state.event_map.totalTime}</h1>
        
      </div>
    );
  }
}


export default PlayController
