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

// $('input[type=range]').on('input', function(e){
//   let min = e.target.min,
//       max = e.target.max,
//       val = e.target.value;
  
//   $(e.target).css({
//     'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
//   });
// }).trigger('input');


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
        <div>
          {/*<YouTube onStateChange={this.onPlayerStateChange} videoId={this.state.videoId} opts={this.opts} onReady={this.onReady} />*/}
        </div>
        <div className="ap">
          <div className="ap__inner">
            <div className="ap__item ap__item--playback">
              {/*이전 재생*/}
              <button className="ap__controls ap__controls--prev" onClick={this.onChangePrevVideo}>
                <svg className="icon-prev" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#333" width="30" height="30" viewBox="0 0 24 24">
                  <path d="M9.516 12l8.484-6v12zM6 6h2.016v12h-2.016v-12z"></path>
                </svg>
              </button>
              {/*이전 재생*/}
              <button onClick={this.onPlayVideo} className={this.state.event_map.playing ? "invisible ap__controls ap__controls--toggle" : "ap__controls ap__controls--toggle"}>
                <svg className="icon-play" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#333" width="30" height="30" viewBox="0 0 36 36" data-play="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z" data-pause="M 12,26 16.33,26 16.33,10 12,10 z M 20.66,26 25,26 25,10 20.66,10 z">
                  <path d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z"></path>
                </svg>                      
              </button>

              <button onClick={this.onPauseVideo} className={!this.state.event_map.playing ? "invisible ap__controls ap__controls--toggle" : "ap__controls ap__controls--toggle"}>
                <svg className="icon-pause" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#e91e63" width="30" height="30" viewBox="0 0 36 36">
                  <path d="M 12,26 16.33,26 16.33,10 12,10 z M 20.66,26 25,26 25,10 20.66,10 z"></path>
                </svg>
              </button>

              <button className="ap__controls ap__controls--next" onClick={this.onChangeNextVideo}>
                <svg className="icon-next" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#333" width="30" height="30" viewBox="0 0 24 24">
                  <path d="M15.984 6h2.016v12h-2.016v-12zM6 18v-12l8.484 6z"></path>
                </svg>
              </button>
          </div>

          <div className="ap__item ap__item--track">
            <img className="track__image" src="https://i.ytimg.com/vi/d7zpnNkdQDM/hqdefault.jpg" />
            <div className="track">
              <div className="track__title">The Best of Bach</div>
                <div className="track__time">
                  <span className="track__time--current">{this.state.event_map.curTime}</span>
                  <span> / </span>
                  <span className="track__time--duration">{this.state.event_map.totalTime}</span>
                </div>
                <div className="progress-container">
                  <input id="seekBar" orient="horizontal" type="range" min="0" max={this.state.event_map.maxProgressBar}
                  value={this.state.event_map.curProgressBar} step="0.1" onChange={this.moveSeekBar} />
                </div>
              </div>
          </div>
          <div className="ap__item ap__item--settings">
            <div className="ap__controls volume-container">
          <button onClick={this.onSound} className={this.state.event_map.soundOn ? "invisible" : ""}>
            <svg className="icon-volume-off" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#333" width="30" height="30" viewBox="0 0 24 24">
              <path d="M12 3.984v4.219l-2.109-2.109zM4.266 3l16.734 16.734-1.266 1.266-2.063-2.063q-1.734 1.359-3.656 1.828v-2.063q1.172-0.328 2.25-1.172l-4.266-4.266v6.75l-5.016-5.016h-3.984v-6h4.734l-4.734-4.734zM18.984 12q0-2.391-1.383-4.219t-3.586-2.484v-2.063q3.047 0.656 5.016 3.117t1.969 5.648q0 2.25-1.031 4.172l-1.5-1.547q0.516-1.266 0.516-2.625zM16.5 12q0 0.422-0.047 0.609l-2.438-2.438v-2.203q2.484 1.219 2.484 4.031z"></path>
            </svg>
          </button>

          <button onClick={this.offSound} className={!this.state.event_map.soundOn ? "invisible" : ""}>
            <svg className="icon-volume-on" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#333" width="30" height="30" viewBox="0 0 24 24">
              <path d="M14.016 3.234q3.047 0.656 5.016 3.117t1.969 5.648-1.969 5.648-5.016 3.117v-2.063q2.203-0.656 3.586-2.484t1.383-4.219-1.383-4.219-3.586-2.484v-2.063zM16.5 12q0 2.813-2.484 4.031v-8.063q2.484 1.219 2.484 4.031zM3 9h3.984l5.016-5.016v16.031l-5.016-5.016h-3.984v-6z"></path>
            </svg>
          </button>
          <div className="volume">

          <input id="volumeBar" orient="vertical" type="range" min="0" 
          max="100" defaultValue={this.state.event_map.volume} step="1" onChange={this.moveVolumeBar} />
          </div>
          </div>
        </div>
        </div>
      </div>
      </div>
    );
  }
}

export default PlayController
