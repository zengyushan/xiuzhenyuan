$(function(){
	var lis = sessionStorage.getItem("randomAllPlayers").split(",");
	var liTxt = "";
	for(var i=0;i<lis.length;i++){
		if(lis[i] == "civilian"){
			liTxt += "<li><div class='vote-list_box'><div class='vote-list_identity'>平民</div><h4>"+(i+1)+"号</h4></div><div class='vote-list_kill'><em></em></div></li>";
		}else{
			liTxt += "<li><div class='vote-list_box'><div class='vote-list_identity'>杀手</div><h4>"+(i+1)+"号</h4></div><div class='vote-list_kill'><em></em></div></li>";
		}
	}
	
	//li文本写入dom元素
	$(".vote-list ul").html(liTxt);
	
	//获取已经死亡的玩家状态
//	console.log(sessionStorage.getItem("deadArr"));
	if(null != sessionStorage.getItem("deadArr")){
		var deadArr = sessionStorage.getItem("deadArr").split(",");
		$(".vote-list > ul > li").each(function(){
			for(var i=0;i<deadArr.length;i++){
				if($(this).index() == deadArr[i]){
					$(this).addClass("dead");
				}
			}
		})
	}

	
	//获取有限状态机的状态
	var dateNum = parseInt(sessionStorage.getItem("dateNum"))-1;
	var machineState = sessionStorage.getItem("dayNum"+dateNum);
	console.log("machineState="+machineState);
	
	//点击玩家
	$(".vote-list_box").on("click",function(){
		//如果此玩家没有死亡 并且 不是杀手玩家
		if(!$(this).parent().hasClass("dead") && $(this).find(".vote-list_identity").text() != "杀手"){
			$(this).parent().addClass("on").siblings().removeClass("on");
		}
	})
	
	//点击杀死此玩家
	$(".vote-list_kill em").on("click",function(){
		$(this).parent().parent().addClass("dead").addClass("temp").siblings(".dead.temp").removeClass("dead").removeClass("temp");
		
	})
	

	//确定
	$(".vote-btn a").on("click",function(){
		if($("li.temp").size() > 0){
			console.log(deadPlayerArr);
			if(null == sessionStorage.getItem("deadArr")){
				var deadPlayerArr = [];
			}else{
				var deadPlayerArr = sessionStorage.getItem("deadArr").split(",");
			}
			if(null == sessionStorage.getItem("deadIdent")){
				var deadIdent = [];
			}else{
				var deadIdent = sessionStorage.getItem("deadIdent").split(",");
			}
			
			console.log("deadPlayerArr========"+deadPlayerArr);
			//此次被杀死玩家号码存进数组
			deadPlayerArr.push($("li.temp").index());
			deadIdent.push($("li.temp .vote-list_identity").text());
			//把已死玩家号的数组存起来
			sessionStorage.setItem("deadArr",deadPlayerArr);
			sessionStorage.setItem("deadIdent",deadIdent);

			
			window.location.href = "法官台本.html";
		}
	})
})
