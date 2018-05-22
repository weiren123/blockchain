"use strict";
var WebsiteAcPs = function (text) {
	if (text){
			var obj = JSON.parse(text)
			this.websiteName = obj.websiteName;
			this.website = obj.website;
			this.accountName = obj.accountName;
			this.password = obj.password;		
	}else{
		this.websiteName = "";
		this.website = "";
		this.accountName = "";
		this.password = "";
	}
}
WebsiteAcPs.prototype = {
	toString:function(){
		return JSON.stringify(this);
	}
}
var MasterCoutract = function () {
	LocalContractStorage.defineMapProperty(this,"Account"),
	LocalContractStorage.defineMapProperty(this,"Items")
}
MasterCoutract.prototype={
	init:function(){},
	createAccount:function(password, address){
		address = address || Blockchain.transaction.from;
		if(this._testAccount(address)){
			throw new Error("此地址已经注册，请登录");
		}
		this.Account.set(address,password);
	},
	_testAccount:function(address){
		var address = address || Blockchain.transaction.from;
		var res = this.Account.get(address);
		if(!res){
			  return false;
		}
		return true;
	},
	getAccount:function (address,password) {
		address = address || Blockchain.transaction.from;
		var pass = this.Account.get(address);
		if( pass === password){
			return "0";
		};
		if(pass === ""||pass === null||pass === undefined){
			return "2";
		};
		if(pass!==password){
			return "1";
		};
	},
	addAtPd:function(a,b,c,d,addr){
			var obj = new WebsiteAcPs();
			obj.websiteName = a||"";
			obj.website = b||"";
			obj.password = d||"";
			obj.accountName = c||"";
			var address = Blockchain.transaction.from;
			if (address!==addr){
				throw new Error("登录的地址账户和钱包地址不符");
			}
			var res = this.getAllAtPd();
			var itemsArr = JSON.parse(res);
			itemsArr.push(obj);
			var arr = JSON.stringify(itemsArr);
			return this.Items.set(address,arr);
	},
	getAllAtPd: function(address){
		var address = address || Blockchain.transaction.from;
		var itemsArry = this.Items.get(address);
		if (itemsArry==="" || itemsArry=== undefined|| itemsArry == null){
			itemsArry = "[]";
		}
		return itemsArry;
	},
	delAtPd:function (text,addr) {
		var address = Blockchain.transaction.from;
		if (addr !== address){
			 throw new Error("登录的地址和钱包地址不符");
		};
		var items = this.getAllAtPd();
		items = JSON.parse(items);
		var delNum = false;
		for(var i=0;i<items.length;i++){
			 if(items[i].website===text){
					delNum = i;
					break;
			 }
		};
		if (delNum === false){
			return false;
		};
		items.splice(delNum,1);
		var arr = JSON.stringify(items);
		this.Items.set(address,arr);
		return true;
	}
}
module.exports = MasterCoutract;