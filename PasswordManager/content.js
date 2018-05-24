'use strict'
var CoinItem = function(text){
    if(text){
        var obj = JSON.parse(text);
        this.name = obj.name;
        this.time = obj.time;
        this.price = obj.price;
        this.place = obj.place;
    }
};

CoinItem.prototype ={
     toString : function(){
        return JSON.stringify(this)
    }
};

var TheContent= function () {
    LocalContractStorage.defineMapProperty(this, "data", {
        parse: function (text) {
            return new CoinItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

TheContent.prototype = {
    init:function(){

    },
     save:function(name,time,price,place){
        if(!name || !time || !price || !place){
            throw new Error("empty content")
        }
        var coinItem = new CoinItem();
        coinItem.name = name;
        coinItem.time = time;
        coinItem.price = price;
        coinItem.place = place;
        this.data.put(name,coinItem);
        return coinItem.name;
    },
    get:function(name){
          return this.data.get(name);
    }
}
module.exports = TheContent;