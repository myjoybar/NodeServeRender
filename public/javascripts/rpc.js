
//var backend_url = "http://dingtone.me:8080";
var backend_url = "/service";

function validateEmail(email) {
	var re = /^([A-Za-z0-9\._%\+\-]+)@([A-Za-z0-9\.\-]+)\.([A-Za-z]{2,4})$/;
	return re.test(email);
}


String.format = function(src){ 
	if (arguments.length == 0)
		return null; 
	var args = Array.prototype.slice.call(arguments, 1); 
	
	return src.replace(/\{(\d+)\}/g, function(m, i){ 
		return args[i]; 
		}); 
};

function checkIsChinese() {
	var language = ($('#language') == null) ? "en" : $('#language').val();
	return 'cn' == language;
}

var ssb_lock = false;
var savedEmail = new Array();
function isAlreadySaved(email) {
	for(var i = 0; i < savedEmail.length; i++) {
		if(savedEmail[i] == email) {
			return true;
		}
	}
	return false;
}

function submitSubscribe(deviceType, callback) {
	if(ssb_lock) {
		return;
	}else {
		ssb_lock = true;
	}
	if(deviceType == null || deviceType == '') {
		deviceType = "Android";
	}
	
	var isChinese = checkIsChinese();
	
	var emailError = new Array("Invalid email address!", "邮件地址错误！");
	var succeedTips = new Array("You have subscribed to the Dingtone " + deviceType + " news letter.", "邮件已保存。");
	var failTips = new Array("Request failed. Error Code:\{0\}", "请求失败。错误码：\{0\}");
	var reqError = new Array("Request error.", "请求出错。");
	var submiting = new Array("Submiting...", "提交中。。。");
	
	var email = $('#email').val();

	
	if(!validateEmail(email)) {
		$('#tips').css("color", "#F00");
		$('#tips').html(emailError[isChinese ? 1 : 0]);
		
		ssb_lock=false;
		
		return;
	}
	if(isAlreadySaved(email)) {
		ssb_lock=false;
		return;
	}
	
	var _referer = getCookie("_referer");
	if(_referer == null) {
		_referer = "";
	}

	var params = "email=" + encodeURIComponent(email) + "&referer=" + _referer + "&deviceType=" + deviceType;
	
	$('#tips').html("");
	$.ajax({
		type: "post",
		url: backend_url + "/subscription",
		data: params,
		cache: false,
		beforeSend: function(XMLHttpRequest){
			$('#tips').css("color", "#3fa407");
			$('#tips').html(submiting[isChinese ? 1 : 0]);
		},
		success: function(json, textStatus){
			
			if(json.Result == 1){
				$('#tips').css("color", "#3fa407");
				$('#tips').html(succeedTips[isChinese ? 1 : 0]);	
			}else {
				$('#tips').css("color", "#F00");
				$('#tips').html(String.format(failTips[isChinese ? 1 : 0], json.ErrCode));	
			}
			savedEmail.push(email);
			if(callback != null) {
				setTimeout(callback, 1000);
			}else {
				callback = function() {
					ssb_lock = false;
				}
				setTimeout(callback, 10000);
			}
			
		},
		complete: function(XMLHttpRequest, textStatus){
			//ssb_lock = false;
		},
		error: function(){
			$('#tips').css("color", "#F00");
			$('#tips').html(reqError[isChinese ? 1 : 0]);
			ssb_lock = false;
		}
	});
}


var issue_lock = false;
function submitIssue() {
	if(issue_lock) {
		return;
	}else {
		issue_lock = true;
	}
	var isChinese = checkIsChinese();
	
	var nameEmptyError = new Array("Your name is required.", "请输入您的姓名！");
	var emailEmptyError = new Array("Your email is required.", "请输入您的邮箱！");
	var emailError = new Array("Invalid email address!", "邮件地址错误！");
	var deviceTypeError = new Array("Device type is required.", "请选择设备类型！");
	var issueTypeError = new Array("Type of issue is required.", "请选择问题类型！");
	var descEmptyError = new Array("Description is required.", "请输入问题描述！");
	
	var succeedTips = new Array("Your issue report was submitted.", "提交成功。");
	var failTips = new Array("Request failed. Error Code:\{0\}", "请求失败。错误码：\{0\}");
	var reqError = new Array("Request error.", "请求出错。");
	var submiting = new Array("Submiting...", "提交中。。。");
	
	var username = $('#name').val();
	var email = $('#email').val();
	var deviceType = $('#deviceType').val();
	var issueType = $('#issueType').val();
	var description = $('#description').val();
	var productname = $('#productname').val();

	var hasError = false;
	if(username == '') {
		$('#nameTips').html(nameEmptyError[isChinese ? 1 : 0]);
		hasError = true;
	}else if(username.length > 100){
		username = username.substring(0, 100);
	}else {
		$('#nameTips').html("&nbsp;");

	}
	if(email == '') {
		center($('#error'));
		$("#error").slideToggle();
		$(".mask").show();
		$('#emailTips').html(emailEmptyError[isChinese ? 1 : 0]);
		hasError = true;
	}else if (!validateEmail(email)) {
		$('#emailTips').html(emailError[isChinese ? 1 : 0]);
		hasError = true;
	}else if(email.length > 100){
		email = email.substring(0, 100);
	}else {
		$('#emailTips').html("&nbsp;");
	}
	if(deviceType == '') {
		$('#deviceTypeTips').html(deviceTypeError[isChinese ? 1 : 0]);
		hasError = true;
	}else {
		$('#deviceTypeTips').html("&nbsp;");
	}
	if(issueType == '') {
		$('#issueTypeTips').html(issueTypeError[isChinese ? 1 : 0]);
		hasError = true;
	}else {
		$('#issueTypeTips').html("&nbsp;");
	}
	if(description == '') {
		$('#descTips').css("color", "#F00");
		$('#descTips').html(descEmptyError[isChinese ? 1 : 0]);
		hasError = true;
	}else if(description.length > 2048){
		description = description.substring(0, 2048);
	}else {
		$('#descTips').html("&nbsp;");
	}
	if(hasError) {
		issue_lock = false;
		return;
	}
	
	var _referer = getCookie("_referer");
	if(_referer == null) {
		_referer = "";
	}
	
	var params = "username=" + encodeURIComponent(username) + "&email=" + encodeURIComponent(email);
	params += "&deviceType=" + encodeURIComponent(deviceType);
	params += "&issueType=" + encodeURIComponent(issueType) + "&description=" + encodeURIComponent(description);
	params += "&referer=" + _referer + "&productname=" + encodeURIComponent(productname);
	
	$.ajax({
		type: "post",
		url: backend_url + "/feedback",
		data: params,
		cache: false,
		beforeSend: function(XMLHttpRequest){
			$('#descTips').css("color", "#3fa407");
			$('#descTips').html(submiting[isChinese ? 1 : 0]);
		},
		success: function(json, textStatus){
			if(json.Result == 1){
				$('#descTips').css("color", "#3fa407");
				$('#descTips').html(succeedTips[isChinese ? 1 : 0]);	
			}else {
				$('#descTips').css("color", "#F00");
				$('#descTips').html(String.format(failTips[isChinese ? 1 : 0], json.ErrCode));	
			}
			alert("成功！")
		},
	
		complete: function(XMLHttpRequest, textStatus){
			issue_lock = false;
		},
		error: function(){
			alert("失败了！！！");
			$('#descTips').css("color", "#F00");
			$('#descTips').html(reqError[isChinese ? 1 : 0]);

		}
	});
}

var idea_lock = false;
function submitIdea() {
	if(idea_lock) {
		return;
	}else {
		idea_lock = true;
	}
	
	var isChinese = checkIsChinese();
	
	var titleError = new Array("Your idea is required.", "请输入您的建议！");
	var detailError = new Array("Description of your idea is required.", "请输入您的建议描述！");
	
	var succeedTips = new Array("Your idea was submitted.", "提交成功。");
	var failTips = new Array("Request failed. Error Code:\{0\}", "请求失败。错误码：\{0\}");
	var reqError = new Array("Request error.", "请求出错。");
	var submiting = new Array("Submiting...", "提交中。。。");
	
	var title = $('#idea_title').val();
	var detail = $('#idea_detail').val();

	var hasError = false;
	if(title == '') {
		$('#ideaTitleTips').html(titleError[isChinese ? 1 : 0]);
		hasError = true;
	}else if(title.length > 100){
		title = title.substring(0, 100);
	}else {
		$('#ideaTitleTips').html("&nbsp;");
	}
	
	if(detail == '') {
		$('#ideaDetailTips').css("color", "#F00");
		$('#ideaDetailTips').html(detailError[isChinese ? 1 : 0]);
		hasError = true;
	}else if(detail.length > 2048){
		detail = detail.substring(0, 2048);
	}else {
		$('#ideaDetailTips').html("&nbsp;");
	}
	if(hasError) {
		idea_lock = false;
		return;
	}
	
	var _referer = getCookie("_referer");
	if(_referer == null) {
		_referer = "";
	}
	
	var params = "title=" + encodeURIComponent(title) + "&detail=" + encodeURIComponent(detail);
	params += "&referer=" + _referer;
	
	$.ajax({
		type: "post",
		url: backend_url + "/suggestion",
		data: params,
		cache: false,
		beforeSend: function(XMLHttpRequest){
			$('#ideaDetailTips').css("color", "#3fa407");
			$('#ideaDetailTips').html(submiting[isChinese ? 1 : 0]);
		},
		success: function(json, textStatus){
			if(json.Result == 1){
				$('#ideaDetailTips').css("color", "#3fa407");
				$('#ideaDetailTips').html(succeedTips[isChinese ? 1 : 0]);	
			}else {
				$('#ideaDetailTips').css("color", "#F00");
				$('#ideaDetailTips').html(String.format(failTips[isChinese ? 1 : 0], json.ErrCode));	
			}
		},
	
		complete: function(XMLHttpRequest, textStatus){
			idea_lock = false;
		},
		error: function(){
			$('#ideaDetailTips').css("color", "#F00");
			$('#ideaDetailTips').html(reqError[isChinese ? 1 : 0]);
		}
	});
}

function saveInviteInfo(inviteKey,d) {
	var params = "inviteKey=" + encodeURIComponent(inviteKey);
	if(d != null && d != '') {
		params += "&d=" + d;
	}
	params += "&tzOffset=" + new Date().getTimezoneOffset();


	$.ajax({
		type: "post",
		url: backend_url + "/saveInviteInfo",
		data: params,
		cache: false,
		beforeSend: function(XMLHttpRequest){},
		success: function(json, textStatus){},
		complete: function(XMLHttpRequest, textStatus){},
		error: function(){}
	});
}
