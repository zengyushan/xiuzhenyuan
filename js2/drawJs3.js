$(function(){
	var randomAllPlayers = sessionStorage.getItem("randomAllPlayers").split(",");
	var passAllPlayers = sessionStorage.getItem("randomAllPlayers").split(",");

	var playerNum = sessionStorage.getItem("pNum");
	var pNum  = playerNum;
	console.log(randomAllPlayers);
	if(pNum == 1){
		$("#identityNum").text(pNum);
		$("#checkIdentityNum").html("查看"+pNum+"号身份");
	}


	//删除掉数组的第一项并返回数组
	function playersArray(arr){
		var m = arr.slice(0);
		m.shift();
		return m;
	}
	
	//显示当前第几号
	function showThisNum(currentNum){
		$("#identityNum").text(currentNum);
	}
	
	//显示按钮文本
	function showBtnTxt(pNumTxt){
		if($("#card0").css("display") != "none"){
			$("#checkIdentityNum").text("查看"+pNumTxt+"号身份");
		}else{
			$("#checkIdentityNum").text("隐藏并传递给"+(parseInt(pNumTxt)+1)+"号");
		}
		
	}
	
	//点击按钮
	$("#checkIdentityNum").on("click",function(){
		if($("#checkIdentityNum").text() == "法官查看"){
			window.location.href = "法官查看.html";
			return false;
		}
		
		//如果当前显示card0
		if($("#card0").css("display") != "none"){
			$("#card0").hide();
			//如果下一个时civilian
			if(randomAllPlayers[0] == "civilian"){
				$("#cardCivilian").show();
				showThisNum(pNum);
				showBtnTxt(pNum);
			}else{
				$("#cardKiller").show();
				showThisNum(pNum);
				showBtnTxt(pNum);
			}
			
			//删掉玩家数组的第一个
			randomAllPlayers = playersArray(randomAllPlayers);
		}else{
			pNum = parseInt(pNum)+1;
			//如果当前显示的是平民
			if($("#cardCivilian").css("display") != "none"){
				$("#cardCivilian").hide();
				$("#card0").show();
				showThisNum(pNum);
				showBtnTxt(pNum);
			}else{
				$("#cardKiller").hide();
				$("#card0").show();
				showThisNum(pNum);
				showBtnTxt(pNum);
			}
		}
		console.log($("#checkIdentityNum").text()+"========"+randomAllPlayers +"=====pNum:"+pNum);
		
		//如果当前显示最后一号 && 当前显示翻牌.html
		if(passAllPlayers.length == pNum && $("#card0").css("display") == "none"){
			$("#checkIdentityNum").text("法官查看");
		}
		
		
		return false;
	})
//				function changeIdent(){
//					
//					if($(".draw-card_imgs").eq(0).is(":hidden")){
//						pNum = sessionStorage.getItem("pNum");
//						$("#identityNum").text(pNum);
//						$(".draw-card_imgs").eq(0).show().siblings(".draw-card_imgs").hide();
//						$("#checkIdentityNum").html("查看"+pNum+"号身份");
//						console.log("翻页.html"+pNum);
//					}else if(randomAllPlayers[pNum-1] == "civilian"){
//						console.log("randomAllPlayers[pNum-1]=civilian----"+randomAllPlayers[pNum-1]);
//						$("#identityNum").text(pNum);
//						$(".draw-card_imgs").eq(1).show().siblings(".draw-card_imgs").hide();
//						$("#checkIdentityNum").html("隐藏并传递给"+(parseInt(pNum)+1)+"号");
//						sessionStorage.setItem("pNum",parseInt(pNum)+1);
//					}else if(randomAllPlayers[pNum-1] == "killer"){
//						console.log("killer");
//						$("#identityNum").text(pNum);
//						$(".draw-card_imgs").eq(2).show().siblings(".draw-card_imgs").hide();
//						$("#checkIdentityNum").html("隐藏并传递给"+(parseInt(pNum)+1)+"号");
//						sessionStorage.setItem("pNum",parseInt(pNum)+1);
//					}
//				}
//				
//				
//				
//				$("#checkIdentityNum").on("click",function(){
//					
////					console.log(randomAllPlayers[pNum-1]);
//					randomAllPlayers = playersArray(randomAllPlayers);
////					sessionStorage.setItem("pNum",parseInt(pNum));
//					changeIdent();
//					return false;
//				})

})