'use strict'
var LetterItem = function(text){
    if(text){
        var obj = JSON.parse(text);
        this.address = obj.address;
        this.pwd = obj.pwd;
    }
};

LetterItem.prototype = {
    toString : function(){
        return JSON.stringify(this)
    }
};

var TheUser = function () {
    LocalContractStorage.defineMapProperty(this, "data", {
        parse: function (text) {
            return new LetterItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};
TheUser.prototype ={
    init:function(){

    },
    regist:function(address,pwd){
         if(!address || !pwd){
            throw new Error("empty address or pwd")
        }
        var letterItem1 = this.data.get(address);
         var newsaddress = letterItem1.address;
         if(newsaddress == address){
             return 0;
         }else {
         var letterItem = new LetterItem();
         letterItem.address = address;
         letterItem.pwd = pwd;

        this.data.put(address,letterItem);
        return 1;
         }
    },
    login:function(address,pwd){
        if(!address){
            throw new Error("empty address")
        }
        var letterItem1 = this.data.get(address);
        var pwd1 = letterItem1.pwd;
        console.log(pwd1)
        if(pwd1 == pwd){
            return "1";
        }else {
             return "0";
        }
    }
}
module.exports = TheUser;