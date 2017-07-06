/*提示信息*/
function showTipsWindow(tipsFileName,width,high){
	$.layer({
		type : 2,
		title: false,
		shade:[0.8, '#393D49'],
		shadeClose: false,
		maxmin: false,
		fix : true,
		border: [0] ,
		area: [width, high],                     
		iframe: {
			src : tipsFileName
		}
	});
}
/*关闭所有iframe层*/
function  colseT(){
	var index = parent.layer.getFrameIndex(window.name); //获取当前窗体索引
	parent.layer.close(index);
}
$(function(){
	//显示控制
    var seleCharge = parent.selectCharge;
    if(parseInt(seleCharge)==2000){
    	$("#s_2").css('display','block');
    	$("#s_3").css('display','none');
    	$("#ctvalid").val("2");
    }else if(parseInt(seleCharge)==3000){
    	$("#s_2").css('display','none');
    	$("#s_3").css('display','block');
    	$("#ctvalid").val("3");
    }else{
    	$("#s_2").css('display','none');
    	$("#s_3").css('display','none');
    }
});
var giftname="";
/*页面校验部分*/
function checkValide(){
	//校验单选框和多选框
	giftname="";
	$("#valerr").text("");
	var ctv = $("#ctvalid").val();
	if(ctv==0){
		$("#valerr").text("没有正确选择礼物");
		return false;
	}else if(ctv==2){
		 var vradio=$('input:radio[name="gift"]:checked');
		 giftname=vradio.parent().text();
         if(vradio.val()==null){
        	 $("#valerr").text("请选择一件礼物");
             return false;
         }
	}else {
		var vbox=$('input:checkbox[name="gift3"]:checked');
		 if(vbox.length == 2){
			 vbox.each(function(){
				 giftname +=$(this).parent().text()+"|";
			 });
		 }else if(vbox.length > 2){
			 $("#valerr").text("只能选择两件礼物");
             return false;
		 }
	}
	//校验必填项
	 var corpname = $("#corpname").val();
	 var username = $("#username").val();
	 var mobile = ctrim($("#mobile").val());
	 var address = $("#address").val();
	 var email = ctrim($("#email").val());
	 if(corpname==""||corpname==null||username==""||username==null||mobile==""
		 ||mobile==null||address==""||address==null||email==""||email==null){
		 $("#valerr").text("请检查必填项！不能为空");
         return false;
	 }
	 if(!cMobile(mobile)&&!cTel(mobile)){
		 $("#valerr").text("请输入正确的联系电话");
		 return false;
	 }     
	 if(!cmail(email)){
		 $("#valerr").text("请输入正确的邮箱");
		 return false;
	 }
	 return true;
}
/*获取二选一、或者三选二的礼物*/
function sub(){
	if(checkValide()){
		$.ajax({
			type : "POST",
			url : "../../activity/ctGiftSelect",
			data:{
				"username":$("#username").val(),
				"mobile": $("#mobile").val(),
				"address": $("#address").val(),
				"email": $("#email").val(),
				"corpname": $("#corpname").val(),
				"ctvalid": $("#ctvalid").val(),
				"giftname":giftname
			},
			dataType : "json",
			async:false,
			success : function(data) {
				if(data.flag){
					alert("恭喜您成功领取奖品，活动结束后统一发放");
					var index = parent.layer.getFrameIndex(window.name); //获取当前窗体索引
					parent.layer.close(index);
				}else{
					 $("#valerr").text(data.msg);
				}
			}
		});
	}
}

function ctrim(msg) {  
	  var m = msg.match(/^\s*(\S+(\s+\S+)*)\s*$/);  
	  return (m == null) ? "" : m[1];  
}
function cMobile(msg) {  
  return (/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(msg));  
}

 function cTel(msg)
{
    //"兼容格式: 国家代码(2到3位)-区号(2到3位)-电话号码(7到8位)-分机号(3位)"
    return (/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(msg));
}
function cmail(msg){
	 //校验是否为正确的邮箱
	return  (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(msg));
}