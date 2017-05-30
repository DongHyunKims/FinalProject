/**
 * Created by donghyunkim on 2017. 5. 15..
 */
/**
 * Created by donghyunkim on 2017. 5. 15..
 */



import utility from '../utility/utility';
import config from '../utility/config';
import privateAlbumList from "../privateMethod/albumList"
import privatePlayList from "../privateMethod/playList"


const ACTION_CONFIG = {
    addPlayList : "addPlayList",
    deletePlayList : "deletePlayList",
    resetPlayList : "resetPlayList",
    deleteAlbum : "deleteAlbum",
    getAllAlbum : "getAllAlbum",
    addAlbum : "addAlbum",
    updateAlbum:"updateAlbum"
};




export default {

    addItemClickHandler(event){
        this.setState(()=>{
            return {isAddClicked: true}
        });
        event.stopPropagation();

    },

    addItemCancelClickHandler(event){
        this.setState(()=>{
            return {isAddClicked: false}
        });
        event.stopPropagation();
    },

    addAlbumSubmitHandler(data,albumId,titleChecked){
        console.log(titleChecked);

        if(!titleChecked){
            return;
        }
        let {HTTP_METHOD} = config;
        utility.runAjaxData(privateAlbumList._albumReqListener.bind(null,ACTION_CONFIG.addAlbum),HTTP_METHOD.POST,"/albumList/albums",utility.createFormData(data));

        /*
        let {albumList,titleChecked} = this.state;
        let {title} = data;
        let titleCheckedList = albumList.filter((val)=>{
            return val.title === title;
        });

        if(!titleCheckedList.length) {
            this.setState(()=>{
                return {
                    titleChecked : true
                }
            });
            return;
        }

        this.setState(()=>{
            return {
                titleChecked : false
            }
        },()=>{
            utility.runAjaxData(privateAlbumList._albumReqListener.bind(null,ACTION_CONFIG.addAlbum),HTTP_METHOD.POST,"/albumList/albums",utility.createFormData(data));
        });
        */
    },

    deleteAlbumClickHandler(albumId,event){
        let {HTTP_METHOD} = config;
        this.setState(()=>{
            return {deletedAlbumId:albumId}

        },()=>{
            utility.runAjax(privateAlbumList._albumReqListener.bind(null,ACTION_CONFIG.deleteAlbum),HTTP_METHOD.DELETE, "/albumList/albums/"+albumId);
        });


        event.stopPropagation();
    },


    updateItemClickHandler(data,event){
        this.setState(()=>{
            return {
                isAlbumUpdateClicked: true,
                updateAlbum: data
            }
        });
        event.stopPropagation();

    },

    updateItemCancelClickHandler(event){
        this.setState(()=>{
            return {
                isAlbumUpdateClicked: false,
                updateAlbum: null,
            }
        });


            event.stopPropagation();

    },

    updateAlbumClickHandler(data,albumId,titleChecked,event){
        if(!titleChecked){
            return;
        }
        let {HTTP_METHOD} = config;
        utility.runAjaxData(privateAlbumList._albumReqListener.bind(null,ACTION_CONFIG.updateAlbum),HTTP_METHOD.PUT,"/albumList/albums/"+albumId,utility.createFormData(data));
        if(event) {
            event.stopPropagation();
        }
    },


    albumClickHandler(albumId,idx,event){
        let {HTTP_METHOD} = config;
        utility.runAjax(privatePlayList._getAlbumReqListener.bind(null,ACTION_CONFIG.resetPlayList), HTTP_METHOD.GET, "/albumList/albums/"+albumId);
    }



}
