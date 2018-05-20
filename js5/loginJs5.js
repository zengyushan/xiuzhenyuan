
var user;
var pass;
var userhint = document.getElementById("login-body_hintuser");
var passhint = document.getElementById("login-body_hintpass");
var sbmt = document.getElementById("sbmt");
var rtxt;

var xmlhttp;
if(window.XMLHttpRequest){
	xmlhttp = new XMLHttpRequest();
}else{
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
sbmt.onclick = function(){
	user = document.getElementById("user").value;
	pass = document.getElementById("pass").value;

	var data = "name="+user+"&pwd="+pass;
	xmlhttp.open("post","/carrots-admin-ajax/a/login",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	
	
	var userReg = /^(\w){5,10}/;
	var passReg = /^(.){6,10}/;
	
	userhint.style.display = "none";
	passhint.style.display = "none";
		
		//表单验证
		if(!userReg.test(user)){
			userhint.innerHTML = "用户名请输入由5-10位字母，下划线，数字或汉字组成"
			userhint.style.display = "block";
			
		}else if(!passReg.test(pass)){
			passhint.innerHTML = "密码请输入6-10位除换行符外的任意字符"
			passhint.style.display = "block";
		}else{
			xmlhttp.send(data);
			xmlhttp.onreadystatechange = function(){
				if(xmlhttp.readyState == 4){
					rtxt = xmlhttp.responseText;
					console.log(rtxt);
					if(JSON.parse(rtxt).message == "success"){
						window.location.href = "../js5/success.html";
					}else if(JSON.parse(rtxt).message == "用户不存在"){
						alert("登录失败，账号错误！");
					}else if(JSON.parse(rtxt).message == "密码错误"){
						alert("登录失败，密码错误！");
					}
				}
			}
		}

}

