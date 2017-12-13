/**
 * Created by Administrator on 2017/12/12.
 */
var global_data = {
    user_info : null
}
function fun_one() {
    global_data.user_info = 1;
}

function fun_two() {
    console.log(global_data.user_info);

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8686/personnel/user/get_user_info.do',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        success: function(data){
            global_data.user_info = data;
        },
        error: function(jqXHR){
            console.log(jqXHR+"请求失败");
        },
    })
}

function fun_three(){
    console.log(global_data.user_info);
}