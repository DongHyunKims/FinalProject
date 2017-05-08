/**
 * Created by donghyunkim on 2017. 5. 2..
 */
import React,{Component} from "react"



class AlbumListItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isToggled: false,
        };

    }


    render(){
        let { data, albumClickHandler,idx,deleteAlbumClickHandler } = this.props;
        let { coverImgUrl,title, totalDuration, _id } = data;


        return(
            <li onClick={albumClickHandler.bind(null,_id,idx)}>
                <div className="albumThum">
                    <img src={coverImgUrl} className="albumImg"/>
                </div>

                <div className="albumItemCont" >
                    <div className="albumTitle"> {title}</div>
                    <div className="albumTotDuration">{totalDuration}</div>
                     <div className="albumMenu" >
                            <img src="./images/default/menu.png" />
                            <div className="albumMenuBtn">
                                <button onClick={deleteAlbumClickHandler.bind(null,_id)}>앨범 삭제</button>
                                <button>앨범 수정</button>
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