

const assert = chai.assert;



// 어떤 테스트 인지 설명
describe("utility selector test",function(){


    //Create Test
    it("should be document when use $", function(){

        assert.equal(utility.$,document);
    });

    it("should be document when return dom element", function(){
        let element = utility.$selector("#mocha");
        assert.equal(element.id,"mocha");
    });

});


//비동기 테스트는 모든 수행이끝나고 동작된다
// done 메소드 필요, reqListener는 모든 동작이 끝나고 동작한다. done 는 테스트의 끝은 여기다 라고 명시하는 것이다. 비동기에서는 it이 먼저 실행되고 그 다음 reqListener가 실행 되기 때문에 조심해이햔다



describe("utility Ajax test",function(){


    //Create Test
    it("should get Album data when receive runAjax request and response", function(done){
        const url = "./albumListData.json";
        let reqListener = function(event){
            let resData = JSON.parse(event.currentTarget.response);
            resData.forEach((val)=>{
                assert.equal(Array.isArray(val.playList),Array.isArray([]));
            });
            //done은 비동기가 정상적으로 완료 되었을때 실행시켜 주면 된다

            done();
        };
        utility.runAjax(reqListener,"GET",url);

    });




});



describe("utility createFormData test",function(){


    //Create Test
    it("should get formData when input Object", function(){


        let testObj = {
            title : "title",
            // coverImgUrl : file,
            category : [1,2]
        };



        let resultFormData = utility.createFormData(testObj);

        assert.equal(resultFormData.get("title"), "title");
        // assert.deepEqual(resultFormData.get("coverImgUrl"), file);
        assert.deepEqual(resultFormData.get("category"), JSON.stringify([1,2]));


    });


});