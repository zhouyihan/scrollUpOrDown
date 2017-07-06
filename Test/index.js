$(document).ready(function(){
  	var num = 120;
  	var timer = null;
  	var securitycode = null;
  	var obj ={};
  	var imgdata = null;
  	
  	$("#getcode").on("click",function(){

		var phonetext = $("#phone").val();
		console.log(phonetext);
		obj.phone = phonetext;
		checkPhone(phonetext);
		if(imgdata!=""){
				obj.imgdata = $("#securitycode").val();
		}
		getSecurityCode(obj);
		$("#securitycode").val("");
    })
  	
  	$("#submit").on("click",function(){
  		
  		
  		var phone = $("#phone").val().trim();
  		var pwd = $("#password").val().trim();
  		var code = $("#codenum").val().trim();
		var pwd2 = $("#password2").val().trim();
		var obj = {};
  		obj.phone = phone;
  		obj.pwd = pwd;
  		obj.code = code;
  		console.log(obj);
  		
  		checkPhone(phone);
  		checkPwd(pwd);
  		checkPwd1AndPwd2(pwd ,pwd2);
  		getSecurityCode(obj);
		$.post("http://guanjia.ykxing.com:8000/User_mobileReg", obj,
          function(data){
				console.log(data);
        });
  		
  	})
  	
  	//获取验证码
  	function getSecurityCode(obj){
  		$.post("http://guanjia.ykxing.com:8000/User_getRegValidCode", obj,
	          function(data){
	          console.log("结果:"+data);
			  var obj = JSON.parse(data);
			  imgdata = obj.img;
	          $("#codeimg").attr("src",obj.img);
        });
  		
  	}
  	
  	function checkPhone(str){
  		var mbRegex = /^1[3|4|5|8][0-9]\d{8}$/;
  		var isPhone = mbRegex.test(str);
  		if(!isPhone){
  			alert("请输入正确的号码");
  		}
  		
  	}
  	
  	
  	function checkPwd(str){
  		var pwdRegex=/^[0-9a-zA-Z]{6,16}$/;
  		var isPwd = pwdRegex.test(str);
  		if(!isPwd){
  			alert("请输入正确的密码格式");
  		}
  	}
  	
  	
  	function checkPwd1AndPwd2(str1,str2){
  		
  		console.log(str1+":"+str2);
  		if(str1==str2){
  			alert("111");
  		}
  	}
  	
  
});




