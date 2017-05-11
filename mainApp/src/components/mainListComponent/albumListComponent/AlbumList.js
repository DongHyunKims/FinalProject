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
                addItemCancelClickHandler={addItemCancelClickHandler}
                addAlbumSubmitHandler={addAlbumSubmitHandler}
            /> : null;
    }



    makeListItem(items,albumClickHandler,deleteAlbumClickHandler){

        if(!items){
            return null;
        }

        return items.map((data, idx) => {
            //console.log(data)
            return <AlbumListItem
                key={data._id}
                data={data}
                albumClickHandler={albumClickHandler}
                deleteAlbumClickHandler={deleteAlbumClickHandler}
                idx={idx} />
        })
    }

    render(){
        let { items,albumClickHandler,deleteAlbumClickHandler, addAlbumSubmitHandler,addItemClickHandler, addItemCancelClickHandler,isAddClicked }= this.props;

        let renderingAlbumList = null;
        if(items){
            renderingAlbumList = this.makeListItem(items,albumClickHandler,deleteAlbumClickHandler);
        }

        return (
            <div className="albumListWrap">
                <ul className="albumList">
                    {renderingAlbumList}
                    <li id="addItem" onClick={addItemClickHandler}>

                    </li>
                    {this.renderAddItemModal(isAddClicked,addAlbumSubmitHandler,addItemCancelClickHandler)}

                </ul>
            </div>
        )
    }

}


export default AlbumList;