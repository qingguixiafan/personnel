/**
 * Created by Administrator on 2017/12/6.
 */

function getAllDepartmentNameAndId(){
    console.log("getAllDepartmentNameAndId method");
    $.get(
        "http://localhost:8686/personnel/department/get_department_names.do",
        function(data){
            var departmentNameAndId = data.data; //声明为全局变量
            for (var i=0; i<departmentNameAndId.length; i++){
                var option = document.createElement('option');
                option.setAttribute('value', departmentNameAndId[i].id); // 设置属性
                option.innerHTML = departmentNameAndId[i].name; // 设置文本内容
                document.getElementById("department_id").appendChild(option);
            }
        },
        "json"
    )
}

function onSubmit(){
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8686/personnel/user/register.do',
        data: {
            name: info.name.value,
            password: info.password.value,
            sex: info.sex.value,
            phone: info.phone.value,
            departmentId:info.departmentId.value
        },
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        success: function(data){
            console.log(data);
            window.location.href='http://localhost:8686/personnel/pages/userInfo.html';
        },
        error: function(jqXHR){
            console.log(jqXHR);
            // todo: 注册失败，跳转到错误页面
            window.location.href="http://localhost:8686/personnel/pages/error.html";
        },
    })
}
