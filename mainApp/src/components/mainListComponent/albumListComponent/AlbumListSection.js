/**
 * Created by donghyunkim on 2017. 5. 2..
 */


import React, {Component} from 'react';
import SearchInputBox from "./SearchInputSection";
import AlbumList from "./AlbumList";
import "./albumListSection.css";
import utility from '../../../utility/utility';




class MainList extends Component {

    constructor(props){
        super(props);
        // this.requestListener = this.requestListener.bind(this)
    }


    render(){
        let { albumList, albumClickHandler, deleteAlbumClickHandler,addAlbumSubmitHandler } = this.props;
        return(
            <div>
                <SearchInputBox
                    searchVideo = {this.searchVideo}
                />
                <AlbumList
                    items={albumList}
                    albumClickHandler={albumClickHandler}
                    deleteAlbumClickHandler={deleteAlbumClickHandler}
                    addAlbumSubmitHandler={addAlbumSubmitHandler}
                />
            </div>
        )
    }

}


export default MainList;