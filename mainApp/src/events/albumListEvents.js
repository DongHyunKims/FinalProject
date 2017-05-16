/**
 * Created by donghyunkim on 2017. 5. 15..
 */
/**
 * Created by donghyunkim on 2017. 5. 15..
 */



import utility from '../utility/utility';


const ACTION_CONFIG = {
    addPlayList : "addPlayList",
    deletePlayList : "deletePlayList",
    resetPlayList : "resetPlayList",
    deleteAlbum : "deleteAlbum",
    getAllAlbum : "getAllAlbum",
    addAlbum : "addAlbum"
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

    addAlbumSubmitHandler(data,event){


        let formData = new FormData();
        //FormData 에 파일과 이메일을 append 메소드를 통해 등록

        for(let key in data){
            let inputData = data[key];
            if(key === "category"){
                inputData = JSON.stringify(inputData);
            }
            formData.append(key, inputData);
        }

        utility.runAjaxData(this._albumReqListener.bind(null,ACTION_CONFIG.addAlbum),"post","/albumList/addAlbum",formData);

    },

    deleteAlbumClickHandler(albumId,event){
        utility.runAjax(this._albumReqListener.bind(null,ACTION_CONFIG.deleteAlbum), "GET", "/albumList/deleteAlbum/"+albumId);
        event.stopPropagation();
    },

    updateItemClickHandler(event){
        this.setState(()=>{
            return {isAlbumUpdateClicked: true}
        });
        event.stopPropagation();

    },

    updateItemCancelClickHandler(event){
        this.setState(()=>{
            return {isAlbumUpdateClicked: false}
        });
        event.stopPropagation();
    },


    updateAlbumClickHandler(albumId,event){

        console.log("fff");
        event.stopPropagation();
    },


    albumClickHandler(_id,idx,event){
        utility.runAjax(this._getAlbumReqListener.bind(null,ACTION_CONFIG.resetPlayList), "GET", "/albumList/getAlbum/"+_id);
    }



}
