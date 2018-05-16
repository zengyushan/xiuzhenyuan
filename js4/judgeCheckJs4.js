$(function(){
	//接收传递过来的配比数组
	var passRandomAllPlayers = sessionStorage.getItem("randomAllPlayers").split(",");
	var txt = "";
	for(var i=0;i<passRandomAllPlayers.length;i++){
		if(passRandomAllPlayers[i] == "civilian"){
			txt += "<li><div class='judgecheck-box'><div class='judgecheck-identity'>平民</div><h4>"+(i+1)+"号</h4></div></li>";
		}else{
			txt += "<li><div class='judgecheck-box'><div class='judgecheck-identity'>杀手</div><h4>"+(i+1)+"号</h4></div></li>";
		}
	}
	$(".judgecheck ul").html(txt);
	console.log(passRandomAllPlayers);
	
	$(".judgecheck-btn a").on("click",function(){
		sessionStorage.setItem("dateNum",1);
		window.location.href = "法官台本.html";
	})


})