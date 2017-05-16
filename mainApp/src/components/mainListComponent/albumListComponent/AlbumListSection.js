/**
 * Created by donghyunkim on 2017. 5. 2..
 */


import React, {Component} from 'react';
import SearchInputBox from "./SearchInputSection";
import AlbumList from "./AlbumList";
import "./albumListSection.css";
import Modal from './Modal';




class MainList extends Component {

    constructor(props){
        super(props);
    }


    renderUpdateItemModal(isAlbumUpdateClicked,updateAlbumClickHandler,updateItemCancelClickHandler){
        return isAlbumUpdateClicked ? <Modal
                itemCancelClickHandler={updateItemCancelClickHandler}
                itemSubmitHandler={updateAlbumClickHandler}
                title="Update Album"
                btnTitle="앨범 수정"
            /> : null;
    }





    render(){
        let { albumList, albumClickHandler, deleteAlbumClickHandler,addAlbumSubmitHandler, addItemClickHandler,addItemCancelClickHandler ,isAddClicked,isAlbumUpdateClicked, updateAlbumClickHandler,updateItemClickHandler,updateItemCancelClickHandler} = this.props;

        return(
            <div>
                <SearchInputBox
                    searchVideo = {this.searchVideo}
                />
                <AlbumList
                    items={albumList}
                    isAddClicked={isAddClicked}

                    albumClickHandler={albumClickHandler}
                    deleteAlbumClickHandler={deleteAlbumClickHandler}
                    addAlbumSubmitHandler={addAlbumSubmitHandler}
                    addItemClickHandler={addItemClickHandler}
                    addItemCancelClickHandler={addItemCancelClickHandler}
                    updateItemClickHandler={updateItemClickHandler}
                />

                {this.renderUpdateItemModal(isAlbumUpdateClicked,updateAlbumClickHandler,updateItemCancelClickHandler)}



            </div>
        )
    }

}


export default MainList;