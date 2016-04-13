/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData(city_input,value_input,city_tip,value_tip,add_tip) {
    var flag = true;

    if (!value_input.value.trim() || !isPosInt(value_input.value.trim())) {
        // 输出当前提示，清除没用提示
        value_tip.innerHTML = "请输入一个正整数";
        add_tip.innerHTML = "";
        city_tip.innerHTML = "";

        //如果出错，光标定位到出错处,清除原有值。因为用户从上到下输入，逆序排input的判断句。
        value_input.value = "";
        value_input.focus();

        flag = false;
    }
    if (!city_input.value.trim() || !isChEN(city_input.value.trim())) {
        city_tip.innerHTML = "请输入中文或英文";
        add_tip.innerHTML = "";
        city_input.value = "";
        flag = false;
        city_input.focus();
    }
    // 如果表单验证正确，执行赋值
    if (flag) {
        aqiData[city_input.value] = value_input.value;
        add_tip.innerHTML = "success";
        city_tip.innerHTML = "";
        value_tip.innerHTML = "";
        city_input.value = "";
        value_input.value = "";
        city_input.focus();
    }
}

//验证是中文和英文
function isChEN(str) {
    // ^表示开头，\u4E00-\u9FA5表示中文，+表示重复，$表示结束，g表示全局搜索
    var pattern = /^[\u4E00-\u9FA5\a-\z\A-\Z]+$/g;

    return pattern.test(str);
}

//验证是非负整数
function isPosInt(str) {
    var pattern = /^[0-9]+$/g;

    return pattern.test(str);
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var table = document.getElementById("aqi-table");
    var data = "";

    //如果aqiData没有属性不加载aqilist标题，有才加载
    for (var item in aqiData) {
        data += "<tr><td>" + item + "</td><td>" + aqiData[item] + "</td><td><button>删除</button></td></tr>";
    }
    table.innerHTML = item ? data : "";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle(city_input,value_input,city_tip,value_tip,add_tip) {
    addAqiData(city_input,value_input,city_tip,value_tip,add_tip);
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
    // do sth.
    var button_delete = event.target;
    var city_delete = button_delete.parentNode.parentNode.firstChild;

    delete aqiData[city_delete.innerHTML];
    renderAqiList();
}

function init() {
    var add_btn = document.getElementById("add-btn"),
        table = document.getElementById("aqi-table");
    var city_input = document.getElementById("aqi-city-input"),
        value_input = document.getElementById("aqi-value-input");
    var city_tip = document.createElement("span"),
        value_tip = document.createElement("span"),
        add_tip = document.createElement("span");

    //在city，value和add后面加一个span，设置初始样式
    city_input.parentNode.parentNode.appendChild(city_tip);
    value_input.parentNode.parentNode.appendChild(value_tip);
    table.parentNode.appendChild(add_tip);
    city_tip.style.color = "#f00";
    value_tip.style.color = "#f00";
    add_tip.style.color = "#0f0";

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    add_btn.addEventListener("click", function () {
        addBtnHandle(city_input,value_input,city_tip,value_tip,add_tip);
    });
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    table.addEventListener("click", delBtnHandle);
}
window.onload = init;
