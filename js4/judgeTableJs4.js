$(function(){
	
	var dateNum = parseInt(sessionStorage.getItem("dateNum"));
	var prevTxt = decodeURI(document.referrer).split("js4/")[1].split(".html")[0];

	sessionStorage.setItem("dayNum"+(dateNum-1),fsm.state);
	if(undefined == sessionStorage.getItem("tempState")){
//		fsm.step2();
//		sessionStorage.setItem("dayNum"+(dateNum-1),fsm.state);
//		fsm.step2();
		sessionStorage.setItem("tempState","kill");
	}
	if(sessionStorage.getItem("tempState") == "deadwords"){
		sessionStorage.setItem("dayNum"+(dateNum-1),"deadwords");
	}
	if(sessionStorage.getItem("tempState") == "playerwords"){
		sessionStorage.setItem("dayNum"+(dateNum-1),"playerwords");
	}

	//打印当前是第几天的状态
	console.log("dayNum"+(dateNum-1) + "=" + sessionStorage.getItem("dayNum"+(dateNum-1)));
	
	//最新一天的状态
	var lastDayState = sessionStorage.getItem("dayNum"+(dateNum-1));
	var lastDay = dateNum-1;
	console.log("lastDay="+lastDay);
	
	//重写li列表
	var tableLiTxt = "";
	for(var i=0;i<=lastDay;i++){
		tableLiTxt += '<li><div class="stage-head">第'+(i+1)+'天</div><div class="stage-body"><div class="stage-body_left"></div><div class="stage-body_right"><ul><li class="sssr already"><a href="#">杀手杀人</a><h4>3号被杀手杀死，真实身份是平民</h4></li><li class="wlfb already"><a href="#">亡灵发表遗言</a></li><li class="wjdy already"><a href="#">玩家依次发言</a></li><li class="qmtp already"><a href="#">全名投票</a></li></ul></div></div></li>';
	}
	$(".stage > ul").html(tableLiTxt);
	$(".stage >ul > li .stage-body").hide();
	$(".stage >ul > li:last-child").find(".stage-body").show();
	$(".stage >ul > li:last-child .sssr,.stage >ul > li:last-child .wlfb,.stage >ul > li:last-child .wjdy,.stage >ul > li:last-child .qmtp").removeClass("already");
	$(".stage-head").on("click",function(){
		if($(this).parent().find(".stage-body").is(":visible")){
			$(this).parent().find(".stage-body").slideUp();
		}else{
			$(this).parent().find(".stage-body").slideDown();
			$(this).parent().siblings().find(".stage-body").slideUp();		
		}

	})
	

	//是否结束游戏
	var allPlayers = sessionStorage.getItem("randomAllPlayers").split(",");
	var killerNum = allPlayers.filter(function(killer){
		return killer == "killer";
	})
	var civilianNum = allPlayers.filter(function(civilian){
		return civilian == "civilian";
	})
	var deadKiller = 0,deadCivilian = 0;
	if(null != sessionStorage.getItem("deadArr")){
		var deadArr = sessionStorage.getItem("deadArr").split(",");
		var deadIdent = sessionStorage.getItem("deadIdent").split(",");
		for(var i=0;i<deadArr.length;i++){
			if(deadIdent[i] == "杀手"){
				deadKiller ++;
			}else{
				deadCivilian ++;
			}
		}
		//如果已死亡杀手人数等于杀手总人数 || 剩余杀手人数大于等于平民人数时
		if(deadKiller == killerNum.length || (civilianNum.length-deadCivilian) <= (killerNum.length-deadKiller)){
			bootbox.dialog({
			  // dialog的内容
			  message: "本轮游戏结束",
			  // dialog的标题
	//		  title: "Custom title",
			  // 退出dialog时的回调函数，包括用户使用ESC键及点击关闭
			  onEscape: function() {},
			  // 是否显示此dialog，默认true
			  show: true,
			  // 是否显示body的遮罩，默认true
			  backdrop: true,
			  // 是否显示关闭按钮，默认true
			  closeButton: false,
			  // 是否动画弹出dialog，IE10以下版本不支持
			  animate: true,
			  // dialog的类名
			  className: "my-modal",
			  // dialog底端按钮配置
			  buttons: {
			    // 其中一个按钮配置
			    success: {   
			      // 按钮显示的名称
			      label: "确定",
			      // 按钮的类名
	//		      className: "btn-success",
			      // 点击按钮时的回调函数
			      callback: function() {
			      	window.location.href = "结果页.html";
			      }
			    },
			    // 另一个按钮配置
			    "取消": {
	//		      className: "btn-close",
			      callback: function() {}
			    }
			  }
			});
		}
	}

	switch(lastDayState){
		case "initial":
			break;
		case "kill":
			$(".stage > ul > li:last-child .sssr").addClass("already");
			break;
		case "deadwords":
			$(".stage > ul > li:last-child .sssr").addClass("already");
			$(".stage > ul > li:last-child .wlfb").addClass("already");
			break;
		case "playerwords":
			$(".stage > ul > li:last-child .sssr").addClass("already");
			$(".stage > ul > li:last-child .wlfb").addClass("already");
			$(".stage > ul > li:last-child .wjdy").addClass("already");
			break;
	}
	
	//如果杀手杀人步骤已过
	if($(".stage > ul > li:last-child .sssr.already").size() > 0){
		var deadArr = sessionStorage.getItem("deadArr");
		var deadArrLast = parseInt(deadArr[deadArr.length-1]) + 1;
		console.log(deadArrLast);
		$(".stage > ul > li:last-child .sssr h4").text(deadArrLast + "号被杀手杀死，真实身份是平民");
		$(".stage > ul > li:last-child .sssr h4").show();

	}
	

	$(".stage > ul > li:last-child .sssr > a").on("click",function(){
		if(sessionStorage.getItem("dayNum"+(dateNum-1)) == "initial"){
			window.location.href = "杀手杀人.html";
		}
		return false;
	})



	$(".stage > ul > li:last-child .wlfb > a").on("click",function(){
		if(sessionStorage.getItem("dayNum"+(dateNum-1)) == "kill"){			
		
			bootbox.dialog({
			  // dialog的内容
			  message: "请死者亮明身份发表遗言",
			  // dialog的标题
	//		  title: "Custom title",
			  // 退出dialog时的回调函数，包括用户使用ESC键及点击关闭
			  onEscape: function() {},
			  // 是否显示此dialog，默认true
			  show: true,
			  // 是否显示body的遮罩，默认true
			  backdrop: true,
			  // 是否显示关闭按钮，默认true
			  closeButton: false,
			  // 是否动画弹出dialog，IE10以下版本不支持
			  animate: true,
			  // dialog的类名
			  className: "my-modal",
			  // dialog底端按钮配置
			  buttons: {
			    // 其中一个按钮配置
			    success: {   
			      // 按钮显示的名称
			      label: "确定",
			      // 按钮的类名
	//		      className: "btn-success",
			      // 点击按钮时的回调函数
			      callback: function() {
			      	$(".stage > ul > li:last-child .wlfb").addClass("already");
			      	fsm.step2();
			      	sessionStorage.setItem("dayNum"+lastDay,fsm.state);
			      	console.log("dayNum"+(dateNum-1));
			      	console.log(fsm.state);
			      	sessionStorage.setItem("tempState","deadwords");
			      }
			    },
			    // 另一个按钮配置
			    "取消": {
	//		      className: "btn-close",
			      callback: function() {}
			    }
			  }
			});
		}
		return false;
	})		

	
	
	$(".stage > ul > li:last-child .wjdy > a").on("click",function(){
		if(sessionStorage.getItem("dayNum"+(dateNum-1)) == "deadwords"){
			bootbox.dialog({
			  // dialog的内容
			  message: "玩家依次发言讨论",
			  // dialog的标题
	//		  title: "Custom title",
			  // 退出dialog时的回调函数，包括用户使用ESC键及点击关闭
			  onEscape: function() {},
			  // 是否显示此dialog，默认true
			  show: true,
			  // 是否显示body的遮罩，默认true
			  backdrop: true,
			  // 是否显示关闭按钮，默认true
			  closeButton: false,
			  // 是否动画弹出dialog，IE10以下版本不支持
			  animate: true,
			  // dialog的类名
			  className: "my-modal",
			  // dialog底端按钮配置
			  buttons: {
			    // 其中一个按钮配置
			    success: {   
			      // 按钮显示的名称
			      label: "确定",
			      // 按钮的类名
	//		      className: "btn-success",
			      // 点击按钮时的回调函数
			      callback: function() {
			      	$(".stage > ul > li:last-child .wjdy").addClass("already");
			      	console.log(decodeURI(document.referrer).split("js4/")[1].split(".html")[0]);
			      	if(fsm.state == "kill"){
			      		fsm.step2();
			      	}
			      	fsm.step3();
			      	
			      	console.log("dayNum"+(dateNum-1));
			      	
			      	sessionStorage.setItem("dayNum"+lastDay,fsm.state);
			      	
			      	sessionStorage.setItem("tempState","playerwords");
			      }
			    },
			    // 另一个按钮配置
			    "取消": {
	//		      className: "btn-close",
			      callback: function() {}
			    }
			  }
			});
		}
		return false;
	})
	
	$(".stage > ul > li:last-child .qmtp > a").on("click",function(){
		if(sessionStorage.getItem("dayNum"+(dateNum-1)) == "playerwords"){
			window.location.href = "投票.html";
		}
		return false;
	})		


})
