/**
 * Created by donghyunkim on 2017. 5. 19..
 */
const libs = {

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
    },
    showBanner(words){
        let snackbar = document.querySelector("#snackbar");
        snackbar.innerHTML = words;
        snackbar.classList.add("show");
        setTimeout(function(){
            snackbar.classList.remove("show");
            snackbar.innerHTML = "";
        }, 4000);
    }

};

export default libs