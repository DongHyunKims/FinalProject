const assert = chai.assert;

describe("ChangeDuration function Test",function(){
    it("0ms Type Check ", function(){
        let duration = 0;
        let result = libs.changeDuration(duration)
        assert.equal(result,  "00:00:00");
    });

    it("1 second Type Check ", function(){
        let duration = 1000;
        let result = libs.changeDuration(duration)
        assert.equal(result,  "00:00:01");
    });

    it("32 second Type Check ", function(){
        let duration = 32000;
        let result = libs.changeDuration(duration)
        assert.equal(result,  "00:00:32");
    });

    it("1 minute Type Check ", function(){
        let duration = 60000;
        let result = libs.changeDuration(duration)
        assert.equal(result,  "00:01:00");
    });

    it("12 minute 30 second Type Check ", function(){
        let duration = 750000;
        let result = libs.changeDuration(duration)
        assert.equal(result,  "00:12:30");
    });

    it("1 hour Type Check ", function(){
        let duration = 3600000;
        let result = libs.changeDuration(duration)
        assert.equal(result,  "01:00:00");
    });

    it("30 hour 30 minute 12 second Type Check ", function(){
        let duration = 109812000;
        let result = libs.changeDuration(duration)
        assert.equal(result,  "30:30:12");
    });
});

describe("checkNumUnit function Test", function(){

  it("from 0 to 0", function(){
    let num = 0;
    let result = libs.checkNumUnit(num);
    assert.equal(result, "0");
  })

  it("from 100 to 100", function(){
    let num = 100;
    let result = libs.checkNumUnit(num);
    assert.equal(result, "100");
  })

  it("from 132 to 132", function(){
    let num = 132;
    let result = libs.checkNumUnit(num);
    assert.equal(result, "132");
  })

  it("from 1000 to 1,000", function(){
    let num = 1000;
    let result = libs.checkNumUnit(num);
    assert.equal(result, "1,000");
  })

  it("from 2130 to 2,130", function(){
    let num = 2130;
    let result = libs.checkNumUnit(num);
    assert.equal(result, "2,130");
  })

  it("from 1000000 to 1,000,000", function(){
    let num = 1000000;
    let result = libs.checkNumUnit(num);
    assert.equal(result, "1,000,000");
  })

  it("from 9230000 to 9,230,000", function(){
    let num = 9230000;
    let result = libs.checkNumUnit(num);
    assert.equal(result, "9,230,000");
  })
})
