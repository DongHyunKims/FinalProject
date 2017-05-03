/**
 * Created by donghyunkim on 2017. 5. 2..
 */
import React, {Component} from 'react';
import AlbumListItem from './AlbumListItem';


class AlbumList extends Component {

    constructor(props){
        super(props);
    }

    makeListItem(items,albumClickHandler){

        return items.map((data, index) => {
            //console.log(data)
            return <AlbumListItem key={data._id} data={data} onClick={albumClickHandler} />
        })
    }

    render(){
        let { items,albumClickHandler }= this.props;
        let renderingAlbumList = null;
        if(items){
            //console.log("items12321",typeof newItems);
            renderingAlbumList = this.makeListItem(items,albumClickHandler);
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