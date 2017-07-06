//第一个活动的时间周期
var begdate = "2016/07/12 00:00:00";
var stopdate = "2016/07/28 23:59:00";
//第二个活动的状态
var stdate = new Array(3); //充值前三名活动倒计时开始时间
stdate[0] = "2016/07/14 00:00:00";
stdate[1] = "2016/07/20 00:00:00";
stdate[2] = "2016/07/28 00:00:00";
var endate = new Array(3); //充值前三名活动倒计时结束时间
endate[0] = "2016/07/14 10:00:00";
endate[1] = "2016/07/20 10:00:00";
endate[2] = "2016/07/28 10:00:00";
//页面计时器
var timer = 0;
//默认三选二页面
var selectCharge = 3000;
/*提示信息*/
function showTipsWindow(tipsFileName, width, high) {
	$.layer({
		type: 2,
		title: false,
		shade: [0.8, '#393D49'],
		shadeClose: false,
		maxmin: false,
		fix: true,
		border: [0],
		area: [width, high],
		iframe: {
			src: tipsFileName
		}
	});
}
/*页面初始显示及事件*/
$(function() {
	var browser = navigator.appName
	var b_version = navigator.appVersion
	var version = b_version.split(";");
	var trim_Version = version[1].replace(/[ ]/g, "");
	if(browser == "Microsoft Internet Explorer" && trim_Version == "MSIE7.0") {
		alert("您的浏览器暂不支持，请升级");
	} else if(browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") {
		alert("您的浏览器暂不支持，请升级");
	}

	//样式控制
	hoverChange('.ipadfamily img', 'images/btn_prize.png');
	hoverChange('.btnfirst', 'images/oct10.png');
	hoverChange('.lastfirst', 'images/oct15.png');
	hoverChange('#lotteryBtn', 'images/oct4.png');

	function hoverChange(somebody, name) {
		var nameh = name.replace('.', '_h.');
		$(somebody).hover(
			function() {
				$(this).attr("src", nameh);
			},
			function() {
				$(this).attr("src", name);
			}
		)
	}
	$('.tab1').click(function() {
		$('.tab1').css({
			'background': '#9d21f4',
			'color': '#fff'
		});
		$('.tab2').css('background', '#fff505');
		$('.sec_main').hide();
		$('.one_main').show();
		//改变赋值
		selectCharge = 2000;
	})
	$('.tab2').click(function() {
		$('.tab2').css('background', '#fff505');
		$('.tab1').css('background', '#9d21f4');
		$('.one_main').hide();
		$('.sec_main').show();
		//改变赋值
		selectCharge = 3000;
	})
	$('.tab1').hover(
		function() {
			if($('.prize1').css('display') == 'none') {
				$(this).addClass('bg2');
			}
		},
		function() {
			$(this).removeClass('bg2');
		}
	)
	$('.tab2').hover(
			function() {
				if($('.prize1').css('display') == 'block') {
					$(this).addClass('bg1');
				}
			},
			function() {
				$(this).removeClass('bg1');
			}
		)
		//倒计时
	$("button").each(function(i, n) {
		var stdt = new Date(stdate[i]);
		var cc = diff(stdt); //要用拆分的方法，判断是不是一天；
		if(cc == 0) {
			//开始倒计时(初始值，并1秒后开始定时事件)
			$("#enIndex").text(i);
			$("#enId").text($(n).attr("id"));
			$(n).css('background', 'url(images/time.png) no-repeat');
			timer = setInterval(matTime, 1000);
			matTime();
		} else if(cc == 1) {
			//尚未开始
			$(n).css('background', 'url(images/expect.png) no-repeat');
		} else {
			//已经结束
			$(n).css('background', 'url(images/over.png) no-repeat');
		}
	});

})

/*获取二选一、或者三选二的礼物*/
function getGift() {
	//第一步先判断是否在活动期间
	var a = new Date().getTime();
	var bet1 = new Date(begdate).getTime();
	var bet2 = new Date(stopdate).getTime();
	if(parseInt(bet1 - a) <= 0 && parseInt(bet2 - a) >= 0) {
		$.ajax({
			type: "POST",
			url: "../../activity/getCtGift",
			data: {
				"selectCharge": selectCharge
			},
			dataType: "json",
			async: false,
			success: function(data) {
				if(!data.flag) {
					if(data.status == "1") {
						showTipsWindow("unLogin.html?toParent=ctwheel.html", "400px", "180px");
					}
					if(data.status == "2") {
						showTipsWindow("unFee.html", "400px", "180px");
					}
					if(data.status == "3") {
						showTipsWindow("seleGift.html", "400px", "180px");
					}
				} else {
					showTipsWindow("giftRecord.html", "400px", "460px");
				}
			}
		});
	} else if(parseInt(bet1 - a) >= 0) {
		alert("活动尚未开始!");
		return false;
	} else {
		alert("活动已经结束!");
		return false;
	}
}
/*充值活动*/
function getCtCharge(ct, i) {
	//第一步先判断是否在活动期间
	var a = new Date().getTime();
	if(ct == "1") {
		//判断是否在周期内
		var bet1 = new Date(begdate).getTime();
		var bet2 = new Date(stopdate).getTime();
		if(parseInt(bet1 - a) <= 0 && parseInt(bet2 - a) >= 0) {
			$.ajax({
				type: "POST",
				url: "../../activity/getCtGift",
				data: {
					"selectCharge": 987654321
				},
				dataType: "json",
				async: false,
				success: function(data) {
					if(!data.flag && data.status == "1") {
						showTipsWindow("unLogin.html?toParent=ctwheel.html", "400px", "180px");
					} else {
						location.href = "../../member/acc/pay?rechLimit=" + selectCharge;
					}
				}
			});
		} else if(parseInt(bet1 - a) >= 0) {
			alert("活动尚未开始!");
			return false;
		} else {
			alert("活动已经结束!");
			return false;
		}
	} else {
		//是否在周期内
		var bet1 = new Date(endate[parseInt(i)]).getTime(); //开始
		var bet = new Date(stdate[parseInt(i)]).getTime();
		var bet2 = parseInt(bet) + 1000 * 60 * 59 * 24; //结束
		if(parseInt(bet1 - a) <= 0 && parseInt(bet2 - a) >= 0) {
			$.ajax({
				type: "POST",
				url: "../../activity/getCtGift",
				data: {
					"selectCharge": 987654321
				},
				dataType: "json",
				async: false,
				success: function(data) {
					if(!data.flag && data.status == "1") {
						showTipsWindow("unLogin.html?toParent=ctwheel.html", "400px", "180px");
					} else {
						location.href = "../../member/acc/pay?rechLimit=" + ct;
					}
				}
			});
		} else if(parseInt(bet1 - a) >= 0) {
			alert("活动尚未开始!");
			return false;
		} else {
			alert("活动已经结束!");
			return false;
		}
	}
}
//判断是否为同一天
function diff(dt) {
	var ln = new Date();
	var y = parseInt(dt.getFullYear());
	var y1 = parseInt(ln.getFullYear());
	var m = parseInt(dt.getMonth());
	var m1 = parseInt(ln.getMonth());
	var d = parseInt(dt.getDate());
	var d1 = parseInt(ln.getDate());
	if(y == y1 && m == m1 && d == d1) {
		//现在式
		return 0;
	} else if(y == y1 && m == m1 && d > d1) {
		//未来式
		return 1;
	} else if(y == y1 && m == m1 && d < d1) {
		//过去式
		return -1;
	} else {
		//其他情况
		return 2;
	}
}
//获取时分秒倒计时初始时间
function matTime() {
	var mat = "";
	var i = $("#enIndex").text();
	var id = $("#enId").text();
	if(i == 5) {
		alert("没有正确的结束时间");
		return false;
	}
	var endt = parseInt(new Date(endate[i]).getTime());
	var ln = parseInt(new Date().getTime());
	var dt = (endt - ln) / 1000;
	if(dt < 0) {
		clearInterval(timer);
		mat = "";
		$("#" + id).css('background', 'url(images/ctload.png) no-repeat');
		$("#" + id).parent().children('img').css('display', 'block');
	} else {
		var hours = Math.floor(dt / 3600);
		var lo = dt % 3600;
		var minutes = Math.floor(lo / 60);
		var se = lo % 60;
		var seconds = Math.floor(se);

		function matNum(num) {
			if(parseInt(num) < 10) {
				return "0" + num;
			} else {
				return num;
			}
		}
		var h = matNum(hours);
		var m = matNum(minutes);
		var s = matNum(seconds);
		mat = h + ":" + m + ":" + s;
	}
	$("#" + id).html(mat);
}

$(function() {
	showP(1, 1); //初始化动画方块位置
	var timeOut = function() { //超时函数
		$(".rotate-bg").rotate({
			angle: 0,
			duration: 10000,
			animateTo: 2160, //这里是设置请求超时后返回的角度，所以应该还是回到最原始的位置，2160是因为我要让它转6圈，就是360*6得来的
			callback: function() {
				//hidePopSorry();
				alert('亲！没有中奖哦！！')
			}
		});
	};
	var rotateFunc = function(awards, angle) { //awards:奖项，angle:奖项对应的角度
		$('.rotate-bg').stopRotate();
		$(".rotate-bg").rotate({
			angle: 0,
			duration: 5000,
			animateTo: angle + 1440, //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^.
			callback: function() {
				//alert(text)
				/*	if(awards.indexOf('20')!=-1) {
						$('.20').show();
						$('.50').hide();
						$("#mask").show();
						$("#get").show();
						$("body").bind("touchmove", function(event) {
							event.preventDefault();
						}, false);
					} else if(awards.indexOf('50')!=-1) {
						$('.50').show();
						$('.20').hide();
						$("#mask").show();
						$("#get").show();
						$("body").bind("touchmove", function(event) {
							event.preventDefault();
						}, false);
					} else {
						$("#mask").show();
						$("#sorry").show();
						$("body").bind("touchmove", function(event) {
							event.preventDefault();
						}, false);
					}*/
			}
		});
	};

	$("#lotteryBtn").rotate({
		bind: {
			click: function() {
				//先校验是否能够抽奖
				rotateFunc("啦啦啦", 20);
				/*if(checkTel()){
					$.ajax({
						type : "POST",
						url : "../../activity/mobile/toRotary",
						data:{"activityId":activityId,
							   "tel":$("#tel").val()
							},
						dataType : "json",
						async:false,
						success : function(data) {
							if(data.flag){//抽奖成功
							   rotateFunc(data.awards, data.angle);
							}else{
								if(data.msgType==1){
									alert("抱歉您不是活动期间注册的用户暂时不能抽奖");
								}else if(data.msgType==2){
									alert("不在活动时间内");
								}else if(data.msgType==3){
									alert("您已参加过一次活动，不能再抽奖了。");
								}else {
									alert("活动已结束");
								}
							}
						},
						error:function(){
							timeOut();
						}
					});
				}*/
			}
		}

	});

})
document.onmousemove = function(evt) {
	evt = evt || window.event;
	showP(evt.clientX, evt.clientY);
}

function showP(x, y) {
	xP = (x - 500) / 500;
	yP = (y - 250) / 250;
	var out = 0;
	/*	if(screen.width < 1920) {
			out = (1920 - screen.width) / 2;
		}*/

	document.getElementById("animate1").style.left = (xP * 20 - out) + "px";
	document.getElementById("animate1").style.top = (yP * 20) + "px";
}