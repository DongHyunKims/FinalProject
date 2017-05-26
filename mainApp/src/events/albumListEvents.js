/**
 * Created by donghyunkim on 2017. 5. 15..
 */
/**
 * Created by donghyunkim on 2017. 5. 15..
 */



import utility from '../utility/utility';
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

    addAlbumSubmitHandler(data){


        utility.runAjaxData(privateAlbumList._albumReqListener.bind(null,ACTION_CONFIG.addAlbum),"post","/albumList/addAlbum",utility.createFormData(data));

    },

    deleteAlbumClickHandler(albumId,event){

        console.log("dddd",albumId);

        this.setState(()=>{
            return {deletedAlbumId:albumId}

        },()=>{
            utility.runAjax(privateAlbumList._albumReqListener.bind(null,ACTION_CONFIG.deleteAlbum), "GET", "/albumList/deleteAlbum/"+albumId);
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

    updateAlbumClickHandler(data,_id,event){
        utility.runAjaxData(privateAlbumList._albumReqListener.bind(null,ACTION_CONFIG.updateAlbum),"post","/albumList/updateAlbum/"+_id,utility.createFormData(data));
        event.stopPropagation();
    },


    albumClickHandler(_id,idx,event){
        utility.runAjax(privatePlayList._getAlbumReqListener.bind(null,ACTION_CONFIG.resetPlayList), "GET", "/albumList/getAlbum/"+_id);
    }



}
