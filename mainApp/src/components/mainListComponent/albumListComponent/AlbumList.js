/**
 * Created by donghyunkim on 2017. 5. 2..
 */
import React, {Component} from 'react';
import AlbumListItem from './AlbumListItem';
import Modal from './Modal';



class AlbumList extends Component {

    constructor(props){
        super(props);

    }


    renderAddItemModal(isAddClicked,addAlbumSubmitHandler,addItemCancelClickHandler){
        return isAddClicked ? <Modal
                itemCancelClickHandler={addItemCancelClickHandler}
                itemSubmitHandler={addAlbumSubmitHandler}
                modalTitle="Add Album"
                btnTitle="앨범 생성"
            /> : null;
    }



    makeListItem(albumList,albumClickHandler,deleteAlbumClickHandler,updateItemClickHandler,playingAlbum){

        if(!albumList){
            return null;
        }

        return albumList.map((data, idx) => {
            //console.log(data)
            return <AlbumListItem
                key={data._id}
                data={data}
                playingAlbum={playingAlbum}
                albumClickHandler={albumClickHandler}
                deleteAlbumClickHandler={deleteAlbumClickHandler}
                updateItemClickHandler={updateItemClickHandler}
                idx={idx} />
        })
    }

    render(){
        let {
            albumList,
            playingAlbum,
            albumClickHandler,
            deleteAlbumClickHandler,
            addAlbumSubmitHandler,
            addItemClickHandler,
            addItemCancelClickHandler,
            updateItemClickHandler,
            isAddClicked
        }= this.props;



        let renderingAlbumList = null;
        if(albumList){
            renderingAlbumList = this.makeListItem(albumList,albumClickHandler,deleteAlbumClickHandler,updateItemClickHandler,playingAlbum);
        }

        return (
            <div className="albumListWrap">
                <ul className="albumList">
                    {renderingAlbumList}
                    <li id="addItem" onClick={addItemClickHandler}>
                    </li>
                </ul>
                {this.renderAddItemModal(isAddClicked,addAlbumSubmitHandler,addItemCancelClickHandler)}
            </div>


        )
    }

}


export default AlbumList;