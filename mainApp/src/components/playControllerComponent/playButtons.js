/**
 * Created by @sujinleeme on 2017. 4
 */

import React from 'react';


class PlayButtons extends React.Component {
  constructor() {
    super();
  }


  render(){
    return(
        <div>
            <button>previous</button>
            <button>play</button>
            <button>pause</button>
            <button>next</button>

        </div>
    )
  }

}

export default PlayButtons


