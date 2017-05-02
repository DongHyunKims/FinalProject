/**
 * Created by donghyunkim on 2017. 5. 2..
 */


import React, {Component} from 'react';
import SearchInputBox from "./SearchInputSection";
import AlbumList from "./AlbumList";
import "./mainList.css";
import utility from '../../../utility/utility';




class MainList extends Component {

    constructor(props){
        super(props);
        this.state = {
            items: null,
        };
        this.requestListener = this.requestListener.bind(this)
    }

    componentDidMount(){

        utility.runAjax(this.requestListener,"GET","/albumListData.json");

    }

    requestListener(res){
        let items = res.currentTarget.responseText;
        items = JSON.parse(items);

        this.setState({items: items});
    }



    render(){
        let { items } = this.state;

        return(
            <div className="rightArea">
                <SearchInputBox
                    searchVideo = {this.searchVideo}
                />
                <AlbumList items={items} />
            </div>
        )
    }

}


export default MainList;