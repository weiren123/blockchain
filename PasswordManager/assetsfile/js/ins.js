function innerlist(){   //将数组以列表li形式放入ul中  并添加style
    var arrs = new Array()
    arrs[0] = "Saab"
    arrs[1] = "Volvo"
    arrs[2] = "BMW"
   var list = '';
   var arr = new Array();
   for (j=0 ; j <arrs.length;j++){
    arr = arrs[j].split('  ');
    alert(arr[3]);
        if (arr[3]=='0'){
         list += '<li style='+'"'+'color:green'+'"'+'>'+arrs[j]+'</li>';
    }
    else{
          list += '<li style='+'"'+'color:red'+'"'+'>'+arrs[j]+'</li>';
    }
         document.getElementById("list").innerHTML=list;
    }
}