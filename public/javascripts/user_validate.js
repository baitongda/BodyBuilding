$(function () {
	//signin
	$('#username').on('blur',function () {
		var _this = $(this);
		var username = _this.val();
		$.ajax({
			type:'post',
			data:'name='+username,
			url: '/admin/username',
			dataType: 'json',
			success: function (data,status) {
				_this.siblings('.username_ok').show()
			}
		})
		
	});
	//signup
	$('#username_r').on('keyup',function () {
		if($(this).val().length >10 || $(this).val().length < 4) return;
		var _this = $(this);
		var username = _this.val();
		$.ajax({
			type:'post',
			data:'name='+username,
			url:'/admin/username_r',
			dataType: 'json',
			success:function (data) {
				if(data.status == 0){ //失败
					console.log(data.mes);
					_this.siblings('.glyphicon-ok').addClass('hidden');
				}else{
					console.log(data.mes);
					_this.siblings('.glyphicon-ok').removeClass('hidden');
				}
			}
		})
	})



	$('#signinForm').validate({
		rules:{
			'user[name]':{
				required:true,
				minlength:4,
				maxlength:10
			},
			'user[password]':{
				required:true,
				minlength:4,
				maxlength:10
			}
		},
		messages:{
			username:{ 
				required:"必须填写用户名",
				minlength:"用户名最小为4位",
				maxlength:"用户名最大为10位"
			},
			password:{
				required: "必须填写密码",
				minlength: "密码最小为4位",
				maxlength: "密码最大为16位"
			}

		}
		
	});
	$('#signupForm').validate({
		rules:{
			'user[name]':{
				required:true,
				minlength:4,
				maxlength:10
			},
			'user[password]':{
				required:true,
				minlength:4,
				maxlength:10
			},
			'user[conPassword]':{
				equalTo:'#password_r'
			}
		},
		messages:{
			username:{ 
				required:"必须填写用户名",
				minlength:"用户名最小为4位",
				maxlength:"用户名最大为10位"
			},
			password:{
				required: "必须填写密码",
				minlength: "密码最小为4位",
				maxlength: "密码最大为16位"
			}

		}
	});
})