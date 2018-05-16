$(function(){
	var deadArr = sessionStorage.getItem("deadArr").split(",");
	var deadIdents = sessionStorage.getItem("deadIdent").split(",");
	
	//剩余杀手和平民人数
	var randomAllPlayers = sessionStorage.getItem("randomAllPlayers").split(",");
	var surplusKiller = 0,surplusCivilian = 0,civilian = 0,killer = 0,deadCivilian = 0,deadKiller = 0;
	randomAllPlayers.filter(function(surplus){
		if(surplus == "civilian"){
			civilian ++;
		}else{
			killer ++;
		}
	})
	deadIdents.filter(function(deadIdent){
		if(deadIdent == "杀手"){
			deadKiller ++;
		}else{
			deadCivilian ++;
		}
	})
	surplusKiller = randomAllPlayers.length - civilian-deadKiller;
	surplusCivilian = randomAllPlayers.length - killer-deadCivilian;
	//覆盖剩余玩家dom元素
	$("#surplusKillerNum").text("杀手"+surplusKiller+"人");
	$("#surplusCivilianNum").text("平民"+surplusCivilian+"人");
	
	
	var liTxt = "";
	var ddTxtDay = "";
	var ddTxtNight = "";
	var tempDD = "";
	for(var i=0,j=0;i<deadArr.length;i++){
		var dayNum = Math.floor(i/2) + 1;
		//如果是晚上
		if(i%2 == 0){
			ddTxtDay += "<dd>晚上："+ (parseInt(deadArr[i])+1) +"号被杀手杀死，"+(parseInt(deadArr[i])+1)+"号是"+deadIdents[i]+"</dd>";
			ddTxtNight = "";
//			console.log(ddTxtDay);
			tempDD += ddTxtDay;
			//如果晚上过后游戏结束了
			if(i == deadArr.length - 1){
				liTxt += "<li><dl><dt>第"+dayNum+"天</dt>"+ tempDD+"</dl><span>0小时07分</span></li>";
			}
		}
		//如果是白天
		if(i%2 == 1){
			ddTxtNight += "<dd>白天："+ (parseInt(deadArr[i])+1) +"号被全民投票投死，"+ (parseInt(deadArr[i])+1) +"号是"+deadIdents[i]+"</dd>";
			ddTxtDay = "";
//			console.log(ddTxtNight);
			tempDD += ddTxtNight;
		}
		
		
		j += 0.5;
		if(dayNum == j){
			liTxt += "<li><dl><dt>第"+dayNum+"天</dt>"+ tempDD+"</dl><span>0小时07分</span></li>";
			tempDD = "";

		}

	}
	
	//覆盖写入dom元素
	$(".result-detail ul").html(liTxt);
	
	var days = parseInt(sessionStorage.getItem("dateNum"));
	$(".result-btn a").on("click",function(){
		for(var i=0;i<days;i++){
			console.log("dayNum"+i);
			sessionStorage.removeItem("dayNum"+i);
		}
		
		sessionStorage.removeItem("dateNum");
		sessionStorage.removeItem("deadArr");
		sessionStorage.removeItem("deadIdent");
		sessionStorage.removeItem("pNum");
		sessionStorage.removeItem("randomAllPlayers");
		
		window.location.href = "设置页面.html";
	})
})
