/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var trim=function(str){
    return str.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');
}

function addAqiData() {
	var cityInput=document.getElementById('aqi-city-input').value;
	var cityReg= /^[\u4e00-\u9fa5aa-zA-z]+$/i;
	if(!cityReg.test(trim(cityInput))){
		alert("输入的城市名必须为中英文字符");
		return;
	}
	var valueInput=document.getElementById('aqi-value-input').value;
	var valueReg=/^[0-9]/;
	if(!valueReg.test(trim(valueInput))){
		alert("空气质量指数必须为整数");
		return;
	}
	aqiData[cityInput]=valueInput;
}



/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table=document.getElementById('aqi-table');
	var data="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";

	for(input in aqiData)
	{
		data+= "<tr><td>" + input + "</td><td>" + aqiData[input] + "</td><td><button>删除</button></td></tr>";
	}
	table.innerHTML=data;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(obj) {
  // do sth.
  

  var cityInput = obj.target.parentNode.parentNode.firstChild.innerHTML;
  delete aqiData[cityInput];	
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	document.getElementById("add-btn").addEventListener("click",function(){
		addBtnHandle();
	});
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	document.getElementById("aqi-table").onclick = delBtnHandle;

}

init();