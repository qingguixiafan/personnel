/**
 * Created by Administrator on 2017/12/10.
 */
function logout() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8686/personnel/user/logout.do',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        success: function(data){
            if (data.status==0){
                alert("退出成功");
                window.location.href="http://localhost:8686/personnel/pages/login.html";
            } else {
                window.location.href="http://localhost:8686/personnel/pages/error.html";
            }
        },
        error: function(jqXHR){
            console.log(jqXHR);
            window.location.href="http://localhost:8686/personnel/pages/error.html";
        },
    })
}

function cancel() {
    $.ajax({
        type: 'DELETE',
        url: 'http://localhost:8686/personnel/user/cancel.do',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        success: function(data){
            if (data.status == 0) {
                alert("注销账号成功");
                window.location.href="http://localhost:8686/personnel/pages/login.html";
            } else {
                alert("注销账号失败");
                window.location.href="http://localhost:8686/personnel/pages/error.html";
            }
        },
        error: function(jqXHR){
            console.log(jqXHR);
            window.location.href="http://localhost:8686/personnel/pages/error.html";
        },
    })
}
