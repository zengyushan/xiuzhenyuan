//首页(点击选择简化版)
if(document.getElementById("simpleGame")){
	document.getElementById("simpleGame").onclick = function(){
		window.location.href = "设置页面.html";
	}
}
	
var randomAllPlayers = [];
var allPlayers = [];
//点击设置，分配角色比例
if(document.getElementById("setpage-matching_edit")){
	var setpage_matching_players_ul = document.getElementById("setpage-matching_players_ul");
	var setpage_matching_edit = document.getElementById("setpage-matching_edit");
	setpage_matching_edit.onclick = function(){
		randomAllPlayers = [];
		var playerNum = document.getElementById("playerNum").value;
		var rangeNumDom = document.getElementById("rangeNum");
		var civilian,killer;
		var allplayers = [];
		
		if(playerNum < 4){
			alert("游戏人数不足！");
		}else if(playerNum>=4 && playerNum<=8){
			killer = 1;
			civilian = playerNum - killer;
		}else if(playerNum>=9 && playerNum<=11){
			killer = 2;
			civilian = playerNum - killer;
		}else if(playerNum>=12 && playerNum<=15){
			killer = 3;
			civilian = playerNum - killer;
		}else if(playerNum>=16 && playerNum<=18){
			killer = 4;
			civilian = playerNum - killer;
		}else{
			alert("游戏人数超出！");
		}
		
		//将平民玩家元素添加到数组
		for(var i=0;i<civilian;i++){
			allplayers.push("civilian");
		}
		//将杀手玩家元素添加到数组
		for(var i=0;i<killer;i++){
			allplayers.push("killer");
		}
		
		//对所有玩家进行乱序
		randomAllPlayers = shuffle(allplayers);
		
		var txt = "";
		for(var i = 0;i < randomAllPlayers.length;i++){
			
			if(randomAllPlayers[i] == "civilian"){
				txt += "<li class='col1'>平民1人</li>";
			}
			if(randomAllPlayers[i] == "killer"){
				txt += "<li class='col2'>杀手1人</li>";
			}
		}
		setpage_matching_players_ul.innerHTML = txt;
		allPlayers = randomAllPlayers;
		return false;
	}
}


//设置页面(点击去发牌)
if(document.getElementById("deal")){
	var setpage_matching_players_ul = document.getElementById("setpage-matching_players_ul");
	var deal = document.getElementById("deal");
	//点击发牌按钮
	deal.onclick = function(){
		//对所有玩家进行乱序
//		var randomAllPlayers = shuffle(allPlayers);
		
//		var txt = "";
//		for(var i = 0;i < randomAllPlayers.length;i++){
//			
//			if(randomAllPlayers[i] == "civilian"){
//				txt += "<li class='col1'>平民1人</li>";
//			}
//			if(randomAllPlayers[i] == "killer"){
//				txt += "<li class='col2'>杀手1人</li>";
//			}
//		}
//		
//		setpage_matching_players_ul.innerHTML = txt;
//		console.log(randomAllPlayers);
		if(allPlayers.length == 0){
			alert("还未分配玩家！");
		}else if(allPlayers.length > 0){
//			alert("玩家配比处已随机分配！");
//			setTimeout("window.location.href='翻牌.html?randomAllPlayers="+randomAllPlayers+"&pNum="+1+"'",3000);
			window.location.href = "翻牌.html"+"?"+"randomAllPlayers="+allPlayers+"&pNum="+1;
		}
	}
}


//数组乱序函数
function shuffle(array) {
	var _array = array.concat();
	for(var i=_array.length;i>0;i--){
		//生成数组元素下标的随机数
		var randomIndex = Math.floor(Math.random()*(i));
		//将最后一个元素与前面的一个随机元素替换位置
		var temp = _array[i-1];
		_array[i-1] = _array[randomIndex];
		_array[randomIndex] = temp;
		
	}
	return _array;
}
			
//设置页面滑动杆
if(document.getElementById("rangeNum")){
	var leftBtn = document.getElementById("setpage-num_left");
	var rightBtn = document.getElementById("setpage-num_right");
	var rangeNum = document.getElementById("rangeNum");
	var playerNum = document.getElementById("playerNum");
	
	//点击减少人数按钮
	leftBtn.onclick = function(){
		if(playerNum.value > 4){
			playerNum.value--;
			rangeNum.value--;
		}
		return false;
	}
	
	//点击增加人数按钮
	rightBtn.onclick = function(){
		if(playerNum.value < 18){
			playerNum.value++;
			rangeNum.value++;
		}
		return false;
	}
	
	//拖动滑动杆动态改变输入框值
	function rangeChange(){
		playerNum.value = rangeNum.value;
	}
	
	//输入框人数动态改变滑动杆的值
	function numChange(){
		rangeNum.value = playerNum.value;
	}
}

//左侧菜单栏弹出与缩回
if(document.getElementById("header-menu")){
	var headerMenu = document.getElementById("header-menu");
	var sideMenu = document.getElementById("side-menu");
	var layout = document.getElementById("layout");
	
	headerMenu.onclick = function(){
		layout.classList.toggle("on");
		sideMenu.classList.toggle("on");

		return false;
	}
}




//获取url中的参数对应的值
function getUrl(href){
	var reg = new RegExp("(^|&)"+ href +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	//unescape解码
	if(r!=null)return unescape(r[2]); return null;
}
