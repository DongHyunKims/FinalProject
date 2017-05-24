import utility from '../utility/utility';
import config from '../utility/config';
import libs from '../utility/libs';
import privatePlayList from "../privateMethod/playList"
import privateSearchList from "../privateMethod/searchList"

const ACTION_CONFIG = {
    addPlayList : "addPlayList",
    deletePlayList : "deletePlayList",
    resetPlayList : "resetPlayList",
    deleteAlbum : "deleteAlbum",
    getAllAlbum : "getAllAlbum",
    addAlbum : "addAlbum"
};

export default {

    searchVideo(keyword){
        this.setState({
            items : [],
            nextPageToken : "",
            selectedVideoArr : [],
            isSearched : true,
            isSelectedArr : false

        });
        let encodedKeword = encodeURI(keyword);
        this.searchUrl = config.DEFAULT_YOUTUBE_SEARCH_URL + "?part=snippet&maxResults=15&q="+encodedKeword+"&key="+config.YOUTUBE_KEY+"&type=video"

        //this._searchAgainVideo(this.searchUrl);
        privateSearchList._getVideoInfo(this.searchUrl);
    },

    addSelectedVideo(index){
        let selectedItem = this.state.items[index];
        let totalDuration = this.state.totalDuration + selectedItem.duration;

        this.setState({
            selectedVideoArr : this.state.selectedVideoArr.concat(selectedItem),
            isSelectedArr : true,
            totalDuration : totalDuration
        })
    },

    delSelectedVideo(videoId){
        let selectedVideoArr = [];
        let isSelectedArr = false;

        let totalDuration = 0;

        selectedVideoArr = [...this.state.selectedVideoArr];

        selectedVideoArr.forEach((data, index)=>{
            if(data.videoId === videoId){
                totalDuration = this.state.totalDuration - selectedVideoArr[index].duration;
                selectedVideoArr.splice(index, 1);
            }
        });

        if(selectedVideoArr.length !== 0){
            isSelectedArr = true;
        }

        this.setState({
            selectedVideoArr : [...selectedVideoArr],
            isSelectedArr : isSelectedArr,

            totalDuration : totalDuration
        })
    },

    changeIsAllClearAddBtn(){
        this.setState({
            isAllClearAddBtn : false
        })
    },

    addSelectedVideoToAlbum(_id){
        let utilLayer = document.querySelector(".utilLayer");
        utilLayer.classList.remove("show");

        let insertData = {
            albumId : _id,
            selectedVideoArr : this.state.selectedVideoArr,
            totalDuration : this.state.totalDuration
        };
        let jsonData = JSON.stringify(insertData);

        utility.runAjaxData(function(e){
          let status = e.target.status;
          if(status === 500){
            console.log("No Album")
            //alert("album을 등록해주세요.")
            libs.showBanner("album을 등록해주세요.");
            this.setState({
                selectedVideoArr: [],
                isSelectedArr: false,
                isAllClearAddBtn: true,
                totalDuration:0
            });
          }else{
            utility.runAjax(privatePlayList._getAlbumReqListener.bind(null,ACTION_CONFIG.addPlayList), "GET", "/albumList/getAlbum/"+_id);
          }
        }.bind(this), "POST", "/playList/videos", jsonData, "application/json")
    },

    moreVideoList(){
        const url = this.searchUrl.concat("&pageToken="+this.state.nextPageToken);

        let searchList = document.querySelector(".searchList");
        let scrollHeight  = searchList.scrollHeight;
        let clientHeight  = searchList.clientHeight;
        let scrollTop  = searchList.scrollTop;

        if((scrollHeight - scrollTop) === clientHeight){
            //this._searchAgainVideo(url)
            privateSearchList._getVideoInfo(url)
        }
    },


    initSearchList(){
        this.setState({
            selectedVideoArr : [],
            isSelectedArr : false,
            isAllClearAddBtn : false,
            totalDuration : 0
        })
    }


}
