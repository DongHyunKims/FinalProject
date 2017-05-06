/**
 * Created by donghyunkim on 2017. 5. 2..
 */
import React, {Component} from 'react';
import AlbumListItem from './AlbumListItem';


class AlbumList extends Component {

    constructor(props){
        super(props);
    }

    makeListItem(items,albumClickHandler,deleteAlbumClickHandler){

        if(!items){
            return null;
        }

        return items.map((data, idx) => {
            //console.log(data)
            return <AlbumListItem key={data._id} data={data} albumClickHandler={albumClickHandler} deleteAlbumClickHandler={deleteAlbumClickHandler} idx={idx} />
        })
    }

    render(){
        let { items,albumClickHandler,deleteAlbumClickHandler }= this.props;
        let renderingAlbumList = null;
        if(items){
            //console.log("items12321",typeof newItems);
            renderingAlbumList = this.makeListItem(items,albumClickHandler,deleteAlbumClickHandler);
        }

        return (
            <div className="albumListWrap">
                <ul className="albumList">
                    {renderingAlbumList}

                    <li id="defaultItem">

                    </li>
                </ul>
            </div>
        )
    }

}

//               <ul className="albumList" onScroll={this.props.moreVideoList}>

export default AlbumList;