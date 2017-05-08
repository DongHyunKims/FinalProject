/**
 * Created by donghyunkim on 2017. 5. 2..
 */
import React, {Component} from 'react';
import AlbumListItem from './AlbumListItem';
import Modal from './Modal';



class AlbumList extends Component {

    constructor(props){
        super(props);
        this.state = {
            isAddClicked : false,
        };
        this.addItemClickHandler = this.addItemClickHandler.bind(this);
        this.addItemCancelClickHandler = this.addItemCancelClickHandler.bind(this);
        this.renderAddItemModal = this.renderAddItemModal.bind(this);
    }

    addItemClickHandler(event){
        this.setState({isAddClicked: true});
        event.stopPropagation();

    }
    addItemCancelClickHandler(event){
        this.setState({isAddClicked: false});
        event.stopPropagation();

    }

    renderAddItemModal(isAddClicked,addAlbumSubmitHandler){

        return isAddClicked ? <Modal
                addItemCancelClickHandler={this.addItemCancelClickHandler}
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
        let { items,albumClickHandler,deleteAlbumClickHandler, addAlbumSubmitHandler }= this.props;


        let {isAddClicked} = this.state;
        //console.log(isAddClicked);
        let renderingAlbumList = null;
        if(items){
            //console.log("items12321",typeof newItems);
            renderingAlbumList = this.makeListItem(items,albumClickHandler,deleteAlbumClickHandler);
        }

        return (
            <div className="albumListWrap">
                <ul className="albumList">
                    {renderingAlbumList}
                    <li id="addItem" onClick={this.addItemClickHandler}>

                    </li>
                    {this.renderAddItemModal(isAddClicked,addAlbumSubmitHandler)}

                </ul>
            </div>
        )
    }

}

//               <ul className="albumList" onScroll={this.props.moreVideoList}>

export default AlbumList;