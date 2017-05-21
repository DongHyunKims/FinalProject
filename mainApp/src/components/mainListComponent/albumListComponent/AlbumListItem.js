/**
 * Created by donghyunkim on 2017. 5. 2..
 */
import React,{Component} from "react"
import libs from '../../../utility/libs';

const albumListItemStyle = {
    albumItemContStyle : {
        "height" : "100%",
        "backgroundColor": "rgba(253,0,97,0.4)"
    },
    albumTitleStyle : {
         "position": "absolute",
         "top": "40%",
         "fontSize": "1.3em",
         "fontWeight": "bold",
         "lineHeight": "1",
         "display" : "block",
    },
    albumDurationStyle : {
        "position": "absolute",
        "top": "50%",
        "display": "block",
    },


};

class AlbumListItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isToggled: false,
        };

    }

    render(){
        let { data, albumClickHandler,idx,deleteAlbumClickHandler,updateItemClickHandler,playingAlbum } = this.props;
        let { coverImgUrl,title, totalDuration, _id } = data;

        let albumItemContStyle = null;
        let albumTitleStyle = null;
        let  albumDurationStyle = null;

        if(playingAlbum){
            if(_id === playingAlbum._id){
                albumItemContStyle = albumListItemStyle.albumItemContStyle;
                albumTitleStyle = albumListItemStyle.albumTitleStyle;
                albumDurationStyle = albumListItemStyle.albumDurationStyle;
            }
        }




        return(
            <li onClick={albumClickHandler.bind(null,_id,idx)}>
                <div className="albumThum">
                    <img src={coverImgUrl} className="albumImg"/>
                </div>

                <div className="albumItemCont" style={albumItemContStyle}>

                    <div className="albumItemIntro">
                        <div className="albumTitle" style={albumTitleStyle}> {title}</div>
                        <div className="albumTotDuratison" style={albumDurationStyle}>{libs.changeDuration(totalDuration)}</div>
                         <div className="albumMenu" >
                                <img src="./images/default/menu.png" />
                                <div className="albumMenuBtn">
                                    <button onClick={deleteAlbumClickHandler.bind(null,_id)}>앨범 삭제</button>
                                    <button onClick={updateItemClickHandler.bind(null,data)}>앨범 수정</button>
                                </div>
                         </div>
                    </div>

                </div>

            </li>
        )
    }
}



export default AlbumListItem;


/*

 <li>
 <p className="thum"><img src={data.thumbUrl}/></p>
 <div className="itemCont">
 <p className="title">{data.title}</p>
 <p className="info">
 <span className="duration">{data.duration}</span>
 <span className="date">{data.publishedAt}</span>
 <span className="viewCount">{data.viewCount} Views</span>
 </p>
 <button className="addBtn" onClick={this.props.clickAddButton.bind(this, this.props.index)}>Add</button>
 </div>
 </li>
 */