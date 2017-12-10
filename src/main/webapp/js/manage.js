/**
 * Created by Administrator on 2017/12/8.
 */
function init(){

    // 获取所有下属员工信息
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8686/personnel/manage/department/get_departments_by_host.do?pageNum=1&pageSize=3',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        success: function(data){
            console.log(data);
            // 1 循环data，填充表单内容
            for (var i=0; i<data.data.list.length; i++) {
                var tr = document.createElement('tr');
                var button_td = document.createElement('td');
                var depar_name_td = document.createElement('td');
                var depar_host_td = document.createElement('td');

                var depar_name_input = document.createElement('input');
                var depar_host_input = document.createElement('input');
                var update_but = document.createElement('button');
                var delete_but = document.createElement('button');

                depar_name_input.setAttribute("id", "input_name_"+data.data.list[i].departmentId);
                depar_name_input.value = data.data.list[i].departmentName;
                depar_host_input.setAttribute("id","input_host_"+data.data.list[i].hostId);
                depar_host_input.value = data.data.list[i].hostName;
                button_td.setAttribute("colspan", "2");
                update_but.innerHTML = "修改";
                delete_but.innerHTML = "删除";

                // 利用闭包循环添加修改按钮的点击事件
                (function(depar_id, depar_name_input_id, depar_host_id_input_id){
                    update_but.onclick = function() {
                        updateDepartment(depar_id, depar_name_input_id, depar_host_id_input_id);
                    }
                })(data.data.list[i].departmentId, depar_name_input.getAttribute("id"), depar_host_input.getAttribute("id"));

                // 利用闭包循环添加删除按钮的点击事件
                (function(depar_id){
                    delete_but.onclick = function() {
                        deleteDepartment(depar_id);
                    }
                })(data.data.list[i].departmentId);


                tr.setAttribute("class", "add_tr");

                tr.appendChild(depar_name_td);
                tr.appendChild(depar_host_td);
                tr.appendChild(button_td);

                depar_name_td.appendChild(depar_name_input);
                depar_host_td.appendChild(depar_host_input);
                button_td.appendChild(update_but);
                button_td.appendChild(delete_but);

                document.getElementById("department_info").appendChild(tr);

            }


            // 2 生成下方的导航栏（超链接）
            var p = document.createElement("p");
            p.innerHTML = "共"+data.data.total+"条 "+data.data.pageNum+"/"+data.data.lastPage;
            p.setAttribute("id", "depar_page_p");
            var redirect = document.createElement("button");
            var redirectNum = document.createElement("input");
            var pageFont = document.createElement("p");
            pageFont.innerHTML = "页";
            redirect.innerHTML = "转到";

            // 添加跳转事件
            redirect.onclick = function()
            {
                deparRedirect(redirectNum.value)
            };

            document.getElementsByClassName("left")[0].appendChild(p);
            document.getElementsByClassName("left")[0].appendChild(redirect);
            document.getElementsByClassName("left")[0].appendChild(redirectNum);
            document.getElementsByClassName("left")[0].appendChild(pageFont);

        },
        error: function(jqXHR){
            console.log(jqXHR);
            window.location.href="http://localhost:8686/personnel/pages/error.html";
        },
    })


    // 获取自己所有直接下属员工的信息
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8686/personnel/manage/user/get_all.do?pageNum=1&pageSize=3',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        success: function(data){
            console.log(data);
            // 1 循环data，填充表单内容
            for (var i=0; i<data.data.list.length; i++) {
                var tr = document.createElement('tr');
                var user_id_td = document.createElement('td');
                var user_name_td = document.createElement('td');
                var user_role_td = document.createElement('td');
                var user_salary_td = document.createElement('td');
                var button_td = document.createElement('td');

                var role = document.createElement('select');
                var role_admin = document.createElement('option');
                var role_user = document.createElement('option');
                role_admin.setAttribute("value", "1");
                role_admin.innerHTML = "部门主管";
                role_user.setAttribute("value", "0");
                role_user.innerHTML = "普通员工";
                role.appendChild(role_admin);
                role.appendChild(role_user);
                role.value = data.data.list[i].role;
                var user_salary_input = document.createElement('input');
                user_salary_input.value = data.data.list[i].salary;

                role.setAttribute("id","role_id_"+data.data.list[i].id);
                user_salary_input.setAttribute("id","salart_id_"+data.data.list[i].id);

                user_id_td.innerHTML = data.data.list[i].id;
                user_name_td.innerHTML = data.data.list[i].name;
                user_role_td.appendChild(role);
                user_salary_td.appendChild(user_salary_input);

                var button = document.createElement('button');
                button.innerHTML = "修改";

                // 利用闭包循环添加点击事件
                (function(user_id, role_select_id, salary_input_id){
                    button.onclick = function() {
                        updateUser(user_id, role_select_id, salary_input_id);
                    }
                })(data.data.list[i].id, role.getAttribute("id"), user_salary_input.getAttribute("id"));

                button_td.appendChild(button);
                tr.appendChild(user_id_td);
                tr.appendChild(user_name_td);
                tr.appendChild(user_role_td);
                tr.appendChild(user_salary_td);
                tr.appendChild(button_td);

                document.getElementById("user_info").appendChild(tr);
            }

            // 2 生成下方的导航栏（超链接）
            var p = document.createElement("p");
            p.setAttribute("id", "user_page_p");
            p.innerHTML = "共"+data.data.total+"条 "+data.data.pageNum+"/"+data.data.lastPage;
            var user_div_redirect_button = document.createElement("button");
            var user_div_redirect_num = document.createElement("input");
            var pageFont = document.createElement("p");
            pageFont.innerHTML = "页";
            user_div_redirect_button.innerHTML = "转到";

            // 添加跳转事件
            user_div_redirect_button.onclick = function()
            {
                userRedirect(user_div_redirect_num.value);
            };

            document.getElementsByClassName("right")[0].appendChild(p);
            document.getElementsByClassName("right")[0].appendChild(user_div_redirect_button);
            document.getElementsByClassName("right")[0].appendChild(user_div_redirect_num);
            document.getElementsByClassName("right")[0].appendChild(pageFont);
        },
        error: function(jqXHR){
            console.log(jqXHR);
            window.location.href="http://localhost:8686/personnel/pages/error.html";
        },
    })
}

function deparRedirect(pageNum) {
    // 1 删除所有tr,创建第一行
    $("#department_info").empty();

    var desc = $("<tr></tr>");
    var desc_depar_name = $("<td>部门名称</td>");
    var desc_depar_host = $("<td>部门主管</td>");
    var desc_button = $("<td>管理部门</td>");
    desc.append(desc_depar_name);
    desc.append(desc_depar_host);
    desc.append(desc_button);
    $("#department_info").append(desc);

    // 2 循环产生多个tr
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8686/personnel/manage/department/get_departments_by_host.do?pageNum='+pageNum+'&pageSize=3',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        success: function(data){
            console.log(data);
            // 1 循环data，填充表单内容
            for (var i=0; i<data.data.list.length; i++) {
                var tr = document.createElement('tr');
                var button_td = document.createElement('td');
                var depar_name_td = document.createElement('td');
                var depar_host_td = document.createElement('td');

                var depar_name_input = document.createElement('input');
                var depar_host_input = document.createElement('input');
                var update_but = document.createElement('button');
                var delete_but = document.createElement('button');

                depar_name_input.setAttribute("id", "input_name_"+data.data.list[i].departmentId);
                depar_name_input.value = data.data.list[i].departmentName;
                depar_host_input.setAttribute("id","input_host_"+data.data.list[i].hostId);
                depar_host_input.value = data.data.list[i].hostName;
                update_but.innerHTML = "修改";
                delete_but.innerHTML = "删除";

                // 利用闭包循环添加点击事件
                (function(depar_id, depar_name_input_id, depar_host_id_input_id){
                    update_but.onclick = function() {
                        updateDepartment(depar_id, depar_name_input_id, depar_host_id_input_id);
                    }
                })(data.data.list[i].departmentId, depar_name_input.getAttribute("id"), depar_host_input.getAttribute("id"));

                // 利用闭包循环添加删除按钮的点击事件
                (function(depar_id){
                    delete_but.onclick = function() {
                        deleteDepartment(depar_id);
                    }
                })(data.data.list[i].departmentId);

                tr.appendChild(depar_name_td);
                tr.appendChild(depar_host_td);
                tr.appendChild(button_td);

                depar_name_td.appendChild(depar_name_input);
                depar_host_td.appendChild(depar_host_input);
                button_td.appendChild(update_but);
                button_td.appendChild(delete_but);

                document.getElementById("department_info").appendChild(tr);
            }
            // 修改下方的分页显示信息
            document.getElementById("depar_page_p").innerHTML = "共"+data.data.total+"条 "+pageNum+"/"+data.data.lastPage;
        },
        error: function(jqXHR){
            console.log(jqXHR);
            window.location.href="http://localhost:8686/personnel/pages/login.html";
        },
    })
}

function userRedirect(pageNum) {
    // 1 删除所有tr,创建第一行
    $("#user_info").empty();
    var desc = $("<tr></tr>");
    var desc_user_id = $("<td>员工编号</td>");
    var desc_user_name = $("<td>员工姓名</td>");
    var desc_user_role = $("<td>员工角色</td>");
    var desc_user_salary = $("<td>员工薪水</td>");
    var desc_button = $("<td>管理员工</td>");
    desc.append(desc_user_id);
    desc.append(desc_user_name);
    desc.append(desc_user_role);
    desc.append(desc_user_salary);
    desc.append(desc_button);
    $("#user_info").append(desc);

    // 2循环产生多个tr
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8686/personnel/manage/user/get_all.do?pageNum='+pageNum+'&pageSize=3',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        success: function(data){
            console.log(data);
            // 循环data，填充表单内容
            for (var i=0; i<data.data.list.length; i++) {
                var tr = document.createElement('tr');
                var user_id_td = document.createElement('td');
                var user_name_td = document.createElement('td');
                var user_role_td = document.createElement('td');
                var user_salary_td = document.createElement('td');
                var button_td = document.createElement('td');

                var role = document.createElement('select');
                var role_admin = document.createElement('option');
                var role_user = document.createElement('option');
                role_admin.setAttribute("value", "1");
                role_admin.innerHTML = "部门主管";
                role_user.setAttribute("value", "0");
                role_user.innerHTML = "普通员工";
                role.appendChild(role_admin);
                role.appendChild(role_user);
                role.value = data.data.list[i].role;
                var user_salary_input = document.createElement('input');
                user_salary_input.value = data.data.list[i].salary;

                role.setAttribute("id","role_id_"+data.data.list[i].id);
                user_salary_input.setAttribute("id","salart_id_"+data.data.list[i].id);

                user_id_td.innerHTML = data.data.list[i].id;
                user_name_td.innerHTML = data.data.list[i].name;
                user_role_td.appendChild(role);
                user_salary_td.appendChild(user_salary_input);

                var button = document.createElement('button');
                button.innerHTML = "修改";

                // 利用闭包循环添加点击事件
                (function(user_id, role_select_id, salary_input_id){
                    button.onclick = function() {
                        updateUser(user_id, role_select_id, salary_input_id);
                    }
                })(data.data.list[i].id, role.getAttribute("id"), user_salary_input.getAttribute("id"));

                button_td.appendChild(button);
                tr.appendChild(user_id_td);
                tr.appendChild(user_name_td);
                tr.appendChild(user_role_td);
                tr.appendChild(user_salary_td);
                tr.appendChild(button_td);

                document.getElementById("user_info").appendChild(tr);
            }
            document.getElementById("user_page_p").innerHTML = "共"+data.data.total+"条 "+pageNum+"/"+data.data.lastPage;
        },
        error: function(jqXHR){
            console.log(jqXHR);
            window.location.href="http://localhost:8686/personnel/pages/error.html";
        },
    })
}

function updateDepartment(depar_id, depar_name_input_id, depar_host_input_id) {
    console.log(depar_id);
    console.log(document.getElementById(depar_name_input_id).value);
    console.log(document.getElementById(depar_host_input_id).value);

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8686/personnel//manage/department/update_department.do',
        data: {
            id: depar_id,
            name: document.getElementById(depar_name_input_id).value,
            host: document.getElementById(depar_host_input_id).value
        },
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        success: function(data){
            console.log(data);
            if (data.status==0){
                alert("修改部门信息成功");
            } else {
                alert("修改部门信息失败");
            }
        },
        error: function(jqXHR){
            console.log(jqXHR);
            window.location.href="http://localhost:8686/personnel/pages/error.html";
        },
    })
}

function updateUser(user_id, role_select_id, salary_input_id) {
    //console.log(user_id);
    //console.log(role_select_id);
    //console.log(salary_input_id);

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8686/personnel/manage/user/update.do',
        data: {
            id: user_id,
            role: document.getElementById(role_select_id).value,
            salary: document.getElementById(salary_input_id).value
        },
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        success: function(data){
            console.log(data);
            if (data.status==0){
                alert("修改员工信息成功");
            } else {
                alert("修改员工信息失败");
            }
        },
        error: function(jqXHR){
            console.log(jqXHR);
            window.location.href="http://localhost:8686/personnel/pages/error.html";
        },
    })

}

function groupQuery(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8686/personnel/manage/user/get_user_by_min_salary_and_sex.do',
        data: {
            sex: document.getElementById("sex").value,
            minSalary: document.getElementById("minSalary").value
        },
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        success: function(data){
            console.log(data);
            // 1 移除原来的东西并重新生成表单的首行
            $("#group_result").empty();
            var desc = $("<tr></tr>");
            var desc_user_id = $("<td>员工编号</td>");
            var desc_user_name = $("<td>员工姓名</td>");
            var desc_user_role = $("<td>员工角色</td>");
            var desc_user_salary = $("<td>员工薪水</td>");
            desc.append(desc_user_id);
            desc.append(desc_user_name);
            desc.append(desc_user_role);
            desc.append(desc_user_salary);
            $("#group_result").append(desc);

            // 2 循环填充表单
            for (var i=0; i<data.data.length; i++) {
                var tr = document.createElement('tr');
                var user_id_td = document.createElement('td');
                var user_name_td = document.createElement('td');
                var user_role_td = document.createElement('td');
                var user_salary_td = document.createElement('td');

                var user_id = document.createElement("text");
                var user_name = document.createElement("text");
                var user_role = document.createElement("text");
                var user_salary = document.createElement("text");
                user_id.innerHTML = data.data[i].id;
                user_name.innerHTML = data.data[i].name;
                if(data.data[i].role==1) {
                    user_role.innerHTML = "部门主管";
                } else {
                    user_role.innerHTML = "普通员工";
                }
                user_salary.innerHTML = data.data[i].salary;

                user_id_td.appendChild(user_id);
                user_name_td.appendChild(user_name);
                user_role_td.appendChild(user_role);
                user_salary_td.appendChild(user_salary);
                tr.appendChild(user_id_td);
                tr.appendChild(user_name_td);
                tr.appendChild(user_role_td);
                tr.appendChild(user_salary_td);
                document.getElementById("group_result").appendChild(tr);
            }
        },
        error: function(jqXHR){
            console.log(jqXHR);
            window.location.href="http://localhost:8686/personnel/pages/error.html";
        },
    })
}

function deleteDepartment(department_id) {
    console.log(department_id);
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8686/personnel//manage/department/delete_department.do',
        data: {
            departmentId : department_id
        },
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        success: function(data){
            console.log(data);
            if(data.status == 0) {
                alert("删除部门成功");
                // 重新加载页面，其实不能这样写，这样就不能算是局部刷新了
                window.location.href="http://localhost:8686/personnel/pages/manage.html";

            } else {
                alert("删除部门失败");
            }
        },
        error: function(jqXHR){
            console.log(jqXHR);
            window.location.href="http://localhost:8686/personnel/pages/error.html";
        },
    })
}

function addDepartment() {
   /* console.log(document.getElementById("add_depar_name").value);
    console.log(document.getElementById("add_depar_host").value);*/
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8686/personnel//manage/department/add_department.do',
        data: {
            name : document.getElementById("add_depar_name").value,
            host : document.getElementById("add_depar_host").value
        },
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        success: function(data){
            console.log(data);
            if(data.status == 0) {
                alert("添加部门成功");
                // 重新加载页面，这里也不能这样写，这样就不能算是局部刷新了
                window.location.href="http://localhost:8686/personnel/pages/manage.html";
            } else {
                alert("添加部门失败");
            }
        },
        error: function(jqXHR){
            console.log(jqXHR);
            window.location.href="http://localhost:8686/personnel/pages/error.html";
        },
    })
}

function isAdmin() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8686/personnel/user/get_user_info.do',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        success: function(data){
            console.log(data);
            if(data.status!=0 || data.data.role!=1) {
                window.location.href="http://localhost:8686/personnel/pages/login.html";
            }
        },
        error: function(jqXHR){
            console.log(jqXHR);
            window.location.href="http://localhost:8686/personnel/pages/error.html";
        },
    })
}
