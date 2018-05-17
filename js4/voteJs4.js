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
	
	//li文本写入dom
	$(".vote-list ul").html(liTxt);
	
	//获取已死的玩家号
	var deadArr = sessionStorage.getItem("deadArr").split(",");
	var deadIdent = sessionStorage.getItem("deadIdent").split(",");
	
//	console.log(deadArr);
	
	$(".vote-list > ul > li").each(function(){
		for(var i=0;i<deadArr.length;i++){
			if($(this).index() == deadArr[i]){
				$(this).addClass("dead");
			}
		}
	})
	
	//点击玩家
	$(".vote-list_box").on("click",function(){
		if(!$(this).parent().hasClass("dead")){
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
			console.log(deadArr);
			//此次被杀死玩家号码存进数组
			deadArr.push($("li.temp").index());
			deadIdent.push($("li.temp .vote-list_identity").text());
			//把已死玩家号的数组存起来
			sessionStorage.setItem("deadArr",deadArr);
			sessionStorage.setItem("deadIdent",deadIdent);

			//保存新的一天的dateNum号
			var newDateNum = parseInt(sessionStorage.getItem("dateNum"))+1;

			sessionStorage.setItem("dayNum"+(newDateNum-1),fsm.state);

			sessionStorage.setItem("dateNum",parseInt(sessionStorage.getItem("dateNum"))+1);	
			
			sessionStorage.removeItem("tempState");
			
			window.location.href = "法官台本.html";
		}
	})
})
