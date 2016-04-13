
function addEvent(obj, type, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(type, fn, false);
    } else if (obj.addEventListener) {
        obj.attachEvent('on' + type, fn);
    } else {
        obj["on" + type] = fn;
    }
}
window.onload = function() {
    var oText = document.getElementById('text-in');
    var leftIn = document.getElementById('left-in');
    var rightIn = document.getElementById('right-in');
    var leftOut = document.getElementById('left-out');
    var rightOut = document.getElementById('right-out');
    var oBox = document.getElementById('box');


    addEvent(leftIn, 'click', function() {
        var pattern=/^[0-9]+$/g;
        var span = document.createElement('span');
        span.innerHTML = oText.value;
        if(pattern.test(oText.value)){
            oBox.insertBefore(span,oBox.firstChild);
            alert(oText.value)
        }else{
            alert('请输入整数');
        }
        oText.value="";
    });
    addEvent(rightIn,'click',function(){
        var pattern=/^[0-9]+$/g;
        var span = document.createElement('span');
        span.innerHTML = oText.value;
        if(pattern.test(oText.value)){
            oBox.appendChild(span);
            alert(oText.value)
        }else{
            alert('请输入整数');
        }
        oText.value="";
    });
    addEvent(leftOut, 'click', function(){
    	if(oBox.firstChild!==null) {
    		oBox.removeChild(oBox.firstChild);
        }else{
            alert("空");
        }});
    addEvent(rightOut, 'click', function(){
    	if(oBox.lastChild!==null) {
    		oBox.removeChild(oBox.lastChild);
        }else{
            alert("空");
    	}});
    
};
