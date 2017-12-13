/**
 * Created by Administrator on 2017/12/7.
 */
function onSubmit(){
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8686/personnel/user/login.do',
        data: {
            username: info.name.value,
            password: info.password.value
        },
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        success: function(data){
            if (data.status==0){
                window.location.href='http://localhost:8686/personnel/pages/userInfo.html';
            } else {
                alert("登陆失败，请检查用户名和密码");
            }

        },
        error: function(jqXHR){
            console.log(jqXHR);
            window.location.href="http://localhost:8686/personnel/pages/error.html";
        },
    })
}

