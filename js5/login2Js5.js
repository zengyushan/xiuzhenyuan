$(function(){
	var user;
	var pass;
	var sbmt = $("#sbmt");
	
	sbmt.on("click",function(){
		user = $("#user").val();	
		pass = $("#pass").val();
		var userReg = /^(\w){5,10}/;
		var passReg = /^(.){6,10}/;
		$("#login-body_hintuser").hide();
		$("#login-body_hintpass").hide();
		
		if(!userReg.test(user)){
			
			$("#login-body_hintuser").text("用户名请输入由5-10位字母，下划线，数字或汉字组成");
			$("#login-body_hintuser").show();
		}else if(!passReg.test(pass)){
			$("#login-body_hintpass").text("密码请输入6-10位除换行符外的任意字符");
			$("#login-body_hintpass").show();
		}else{
			$.ajax({
				type:"post",
				url:"/carrots-admin-ajax/a/login",
				async:true,
				contentType:"application/x-www-form-urlencoded",
				data:{"name":user,"pwd":pass},
				success:function(result){
					alert(result);
					if(JSON.parse(result).message == "success"){
						window.location.href = "../js5/success.html";
					}else if(JSON.parse(result).message == "用户不存在"){
						alert("登录失败，账号错误！");
					}else if(JSON.parse(result).message == "密码错误"){
						alert("登录失败，密码错误！");
					}
				}
			});
		}

	})
})
