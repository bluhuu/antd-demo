String.prototype.trim = function(){
return this.replace(/(^\s*)|(\s*$)/g, "");
}

String.prototype.ltrim = function(){
return this.replace(/(^\s*)/g, "");
}

String.prototype.rtrim = function() {
return this.replace(/(\s*$)/g, "");
}

Date.prototype.format = function(format) {
   var date = {
          "M+": this.getMonth() + 1,
          "d+": this.getDate(),
          "h+": this.getHours(),
          "m+": this.getMinutes(),
          "s+": this.getSeconds(),
          "q+": Math.floor((this.getMonth() + 3) / 3),
          "S+": this.getMilliseconds()
   };
   if (/(y+)/i.test(format)) {
          format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
   }
   for (var k in date) {
          if (new RegExp("(" + k + ")").test(format)) {
                 format = format.replace(RegExp.$1, RegExp.$1.length == 1
                        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
          }
   }
   return format;
}

Date.getDayOfMonth = function (y, Mm) {
    if (typeof y == 'undefined') { y = (new Date()).getFullYear(); }
    if (typeof Mm == 'undefined') { Mm = (new Date()).getMonth(); }
    var Feb = (y % 4 == 0) ? 29 : 28;
    var aM = new Array(31, Feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    return  aM[Mm];
}
Date.prototype.getDateOfPreMonth = function () {
    var y = (this.getMonth() == 0) ? (this.getFullYear() - 1) : this.getFullYear();
    var m = (this.getMonth() == 0) ? 11 : this.getMonth() - 1;
    var preM = Date.getDayOfMonth(y, m);
    var d = (preM < this.getDate()) ? preM : this.getDate();
    return new Date(y, m, d);
}
Date.prototype.getDateOfNextMonth = function () {
    var y = (this.getMonth() == 11) ? (this.getFullYear() + 1) : this.getFullYear();
    var m = (this.getMonth() == 11) ? 0 : this.getMonth() + 1;
    var preM = Date.getDayOfMonth(y, m);
    var d = (preM < this.getDate()) ? preM : this.getDate();
    return new Date(y, m, d);
};

