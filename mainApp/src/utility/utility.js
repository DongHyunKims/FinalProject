/**
 * Created by donghyunkim on 2017. 4. 11..
 */
/**
 * Created by donghyunkim on 2017. 4. 3..
 */
const utility = {
    $ : document,
    $selector : function(selector){
        return document.querySelector(selector);
    },
    //ajax 실행 메소드
    runAjax : function(reqListener, method, url){
        let xhr = new XMLHttpRequest();
        //reqListener 제일 마지막에 실행된다.
        xhr.addEventListener("load", reqListener);
        xhr.open(method, url);
        xhr.send();
    },
    runAjaxData : function(reqListener, method, url, data, contentType){

        let xhr = new XMLHttpRequest();
        //reqListener 제일 마지막에 실행된다.

        xhr.open(method, url);
        //xhr.setRequestHeader("Content-Type","application/json");
        if(contentType !== undefined){
            xhr.setRequestHeader("Content-Type",contentType);
        }

        xhr.send(data);
        xhr.addEventListener("load", reqListener);
    },
    //객체 생성 메소드
    makeObject : function (property, proto){
        //프로토 타입에 넣을 메소드를 모두 지정한다
        let obj = Object.create(proto);
        Object.keys(property).forEach(function(val){
            //해당 프로퍼티가 없으면 만든후 할당하고 아니면 덮어쓴다
            obj[val] = property[val];
        });
        return obj;
    },

    //duration ms -> 00:00:00 변환
    changeDuration : function(duration){
      let sec = 0,
          min = 0,
          hour = 0,
          time = 0,
          str = "";
  //hour
      time = duration / 1000;
      if(time / 3600 >= 1){
        hour = Math.floor(time / 3600);
        if(hour < 10){
          str = str.concat("0"+hour+":");
        }else{
          str = str.concat(hour+":");
        }
      }else{
        hour = 0;
        str = str.concat("00:")
      }
  //min
      time = time % 3600;
      if(time / 60  >= 1){
        min = Math.floor(time / 60);
        if(min < 10){
          str = str.concat("0"+min+":");
        }else{
          str = str.concat(min+":");
        }
      }else{
        min = 0;
        str = str.concat("00:")
      }
  //sec
      sec = time % 60;
      if(sec < 10){
        str = str.concat("0"+sec);
      }else{
        str = str.concat(sec);
      }

      //console.log(str)
      //console.log("hour = "+hour+" min = "+min+" sec = "+sec)
      return str
    }
};

export default utility;
