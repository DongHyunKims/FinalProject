/**
 * Created by donghyunkim on 2017. 5. 2..
 */
import React, {Component} from 'react';
import AlbumListItem from './AlbumListItem';
import Modal from './Modal';
import config from '../../../utility/config'



class AlbumList extends Component {

    constructor(props){
        super(props);

    }


    renderAddItemModal(isAddClicked,addAlbumSubmitHandler,addItemCancelClickHandler,albumList){
        return isAddClicked ? <Modal
                itemCancelClickHandler={addItemCancelClickHandler}
                itemSubmitHandler={addAlbumSubmitHandler}
                modalTitle="Add Album"
                btnTitle="앨범 생성"
                dataList={albumList}
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
                            <img src={config.DEFAULT_SERVER_URL + "/images/default/Add-100.png"} className="icon"/>

                    </li>
                </ul>
                {this.renderAddItemModal(isAddClicked,addAlbumSubmitHandler,addItemCancelClickHandler,albumList)}
            </div>


        )
    }

}


export default AlbumList;