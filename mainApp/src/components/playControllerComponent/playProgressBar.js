/**
 * Created by @sujinleeme on 2017. 4
 */

import React from 'react';
class TextInput extends React.Component {
  constructor(){
    super();
    this.state = {currenttime: ''}
  }

  update(){
    this.setState({
      currenttime: this.currenttime.refs.input.value
    })
  }

  render(){
    return (
      <div>
        <Input ref={ component => this.currenttime = component}
        update={this.update.bind(this)}
        />
        <span>{this.state.currenttime}</span>

      </div>
    )
  }
}

class Input extends React.Component {
  render(){
    return <div><input ref="input" type="text" onChange={this.props.update}/></div>
  }
}


export default TextInput
