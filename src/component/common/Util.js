let Util = {
    getType:function(src){
        return Object.prototype.toString.call(src).slice(8,-1);
    },
    cloneObject:function(src){
        if(src===null)return null;
        if(src===undefined)return undefined;
        var key,result,srcClass = this.getType(src);
        if(srcClass==='Object'){
            result={};
        }else if(srcClass==='Array'){
            result=[];
        }else if(srcClass==='Date'){
            return new Date(+src);
        }else if(srcClass==='number'||srcClass==='String'||srcClass==='Boolean'){
            return src;
        }
        for(key in src){
            var attr=src[key];
            if(this.getType(attr)==='object'){
                result[key]=arguments.callee(attr);
            }else if(this.getType(attr)==='Array'){
                result[key].arguments.callee(attr);
            }else{
                result[key]=src[key];
            }
        }
        return result;
    },
    cloneObj: function(obj){
        var str, newobj = obj.constructor === Array ? [] : {};
        if(typeof obj !== 'object'){
            return;
        } else if(window.JSON){
            str = JSON.stringify(obj), //系列化对象
            newobj = JSON.parse(str); //还原
        } else {
            for(var i in obj){
                newobj[i] = typeof obj[i] === 'object' ?
                this.cloneObj(obj[i]) : obj[i];
            }
        }
        return newobj;
    },
    downloadFile: function(url) {
      try {
        var elemIF = document.createElement("iframe");
        elemIF.src = url;
        elemIF.style.display = "none";
        document.body.appendChild(elemIF);
      } catch (e) {
        console.log("出错：下载出错！ ",url);
      }
    }
}
export default Util;
