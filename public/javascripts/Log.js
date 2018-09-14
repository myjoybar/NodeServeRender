const debug = false
function printLog(msg){
   if(debug){
       if(isEmpty(msg)){
           console.log("is empty");
           return
       }
       if(isJson(msg)){
           console.log(JSON.stringify(msg));
           //  console.log(msg);
       }else{
           console.log(msg);
       }
   }
}

function isEmpty(obj){
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
}

function isJson(obj) {
    var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
    return isjson;
}

module.exports = {
    printLog,
    isEmpty
}


