function init5() {
    var pAry = document.getElementsByTagName("p");
    for (var i = 0; i < pAry.length; i++) {
        pAry[i].onclick = function(arg) {
            return function() {
                alert(arg);
            }
        }(i);
    }
}
