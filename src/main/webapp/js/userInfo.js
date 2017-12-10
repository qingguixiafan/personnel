/**
 * Created by Administrator on 2017/12/7.
 */
function isLogin(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8686/personnel/user/get_user_info.do',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        success: function(data){
            // todo: 判断用户登录是否成功，不成功就重新登陆
            if (data.status==0){
                // 将数据保存起来，等待页面加载完成，然后将数据绑定到dom
                // 上面的想法暂时实现不了，等页面加载完成后直接重新发起请求拿数据好了，菜
            } else {
                window.location.href='http://localhost:8686/personnel/pages/login.html';
            }
        },
        error: function(jqXHR){
            console.log(jqXHR);
            // todo: 登陆失败，跳转到一个比较友好的页面
        },
    })
}

function bindData() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8686/personnel/user/get_user_info.do',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        success: function(data){
            // todo: 判断用户登录是否成功，不成功就重新登陆
            if (data.status==0){
                document.getElementById("name").value = data.data.name;
                document.getElementById("sex").value = data.data.sex;
                document.getElementById("phone").value = data.data.phone;
                document.getElementById("salary").innerHTML = data.data.salary;

            } else {
                window.location.href='http://localhost:8686/personnel/pages/login.html';
            }
        },
        error: function(jqXHR){
            console.log(jqXHR);
            window.location.href="http://localhost:8686/personnel/pages/error.html";
        },
    })
}

function onSubmit() {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8686/personnel/user/update.do',
        dataType: 'json',
        data: {
            name:  form.name.value,
            sex: form.sex.value,
            phone: form.phone.value
        },
        contentType: 'application/x-www-form-urlencoded',
        success: function(data){
            if (data.status==0){
                document.getElementById("name").value = data.data.name;
                document.getElementById("sex").value = data.data.sex;
                document.getElementById("phone").value = data.data.phone;
                alert("修改信息成功");
            } else {
                alert("更新信息失败。。");
            }
        },
        error: function(jqXHR){
            console.log(jqXHR);
            window.location.href="http://localhost:8686/personnel/pages/error.html";
        },
    })
}

function addHostButton(){
    console.log("addHostButton method is run");
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8686/personnel/user/get_user_info.do',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        success: function(data){
            if (data.data.role==1) {
                //console.log("addHostButton method in run");
                var h2 = document.createElement("h2");
                h2.innerHTML = "您可以点击下方按钮去管理您的部门";
                document.body.appendChild(h2);
                var but = document.createElement("button");
                but.setAttribute("onclick", "goManagePage()");
                but.innerHTML = "点我跳转";
                document.body.appendChild(but);
            }
        },
        error: function(jqXHR){
            console.log(jqXHR);
            window.location.href="http://localhost:8686/personnel/pages/error.html";
        },
    })
}

function goManagePage(){
    window.location.href="http://localhost:8686/personnel/pages/manage.html";
}
