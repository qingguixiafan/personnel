/**
 * Created by Administrator on 2017/12/12.
 */
function init() {
    manage_depar(1);

}

function manage_depar(pageNum) {
    // 1 删除所有tr,创建第一行
    $("#right").empty();

    var desc = $("<tr></tr>");
    var desc_depar_name = $("<td>部门名称</td>");
    var desc_depar_host = $("<td>部门主管</td>");
    var desc_button = $("<td>管理部门</td>");
    desc.append(desc_depar_name);
    desc.append(desc_depar_host);
    desc.append(desc_button);
    $("#right").append(desc);

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

                document.getElementById("right").appendChild(tr);
            }
            // 显示下方的分页导航
            var p = document.createElement("p");
            p.innerHTML="共"+data.data.total+"条 "+data.data.pageNum+"/"+data.data.lastPage;
            var navigate_button = document.createElement("button");
            var navigate_num = document.createElement("input");
            navigate_button.innerHTML="转到";

            // 添加导航事件
            navigate_button.onclick = function()
            {
                manage_depar(navigate_num.value);
            };
            document.getElementById("right").appendChild(p);
            document.getElementById("right").appendChild(navigate_button);
            document.getElementById("right").appendChild(navigate_num);

        },
        error: function(jqXHR){
            console.log(jqXHR);
            window.location.href="http://localhost:8686/personnel/pages/login.html";
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

function manage_user(pageNum) {
    // 1 删除所有tr,创建第一行
    $("#right").empty();
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
    $("#right").append(desc);

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

                document.getElementById("right").appendChild(tr);
            }

            // 2 生成下方的导航栏（超链接）
            var p = document.createElement("p");
            p.setAttribute("id", "user_page_p");
            p.innerHTML = "共"+data.data.total+"条 "+data.data.pageNum+"/"+data.data.lastPage;
            var user_div_redirect_button = document.createElement("button");
            var user_div_redirect_num = document.createElement("input");
            user_div_redirect_button.innerHTML = "转到";

            // 添加跳转事件
            user_div_redirect_button.onclick = function()
            {
                manage_user(user_div_redirect_num.value);
            };

            document.getElementById("right").appendChild(p);
            document.getElementById("right").appendChild(user_div_redirect_button);
            document.getElementById("right").appendChild(user_div_redirect_num);
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

function add_depar_div() {
    $("#right").empty();
    var depar_name_tr = document.createElement("tr");
    var depar_name_td = document.createElement("td");
    var depar_name_input_td = document.createElement("td");
    var depar_name = document.createElement("text");
    depar_name.innerHTML="部门名称";
    var depar_name_input = document.createElement("input");
    depar_name_input.setAttribute("id", "depar_name_input");
    depar_name_td.appendChild(depar_name);
    depar_name_input_td.appendChild(depar_name_input);
    depar_name_tr.appendChild(depar_name_td);
    depar_name_tr.appendChild(depar_name_input_td);

    var depar_host_tr = document.createElement("tr");
    var depar_host_td = document.createElement("td");
    var depar_host_input_td = document.createElement("td");
    var depar_host = document.createElement("text");
    depar_host.innerHTML="部门主管";
    var depar_host_input = document.createElement("input");
    depar_host_input.setAttribute("id", "depar_host_input");
    depar_host_td.appendChild(depar_host);
    depar_host_input_td.appendChild(depar_host_input);
    depar_host_tr.appendChild(depar_host_td);
    depar_host_tr.appendChild(depar_host_input_td);

    var button = document.createElement("button");
    button.innerHTML="新增部门";
    button.onclick = function()
    {
        add_depar_envet();
    };
    document.getElementById("right").appendChild(depar_name_tr);
    document.getElementById("right").appendChild(depar_host_tr);
    document.getElementById("right").appendChild(button);

}

function add_depar_envet() {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8686/personnel//manage/department/add_department.do',
        data: {
            name : document.getElementById("depar_name_input").value,
            host : document.getElementById("depar_host_input").value
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

function querySalary() {
    $("#right").empty();
    var min_salary_text = document.createElement("text");
    var min_salary_input = document.createElement("input");
    min_salary_input.setAttribute("id", "min_salary_input");
    var sex_text = document.createElement("text");
    var sex_select = document.createElement("select");
    sex_select.setAttribute("id", "sex_select");
    var button = document.createElement("button");
    min_salary_text.innerHTML="最低工资";
    sex_text.innerHTML="性别";
    button.innerHTML="查询";
    var sex_option_man = document.createElement("option");
    var sex_option_female = document.createElement("option");
    sex_option_man.setAttribute("value", "1");
    sex_option_female.setAttribute("value", "0");
    sex_option_man.innerHTML="男";
    sex_option_female.innerHTML="女";
    sex_select.appendChild(sex_option_man);
    sex_select.appendChild(sex_option_female);

    var table=document.createElement("table");
    table.setAttribute("id", "group_result");

    button.onclick = function()
    {
        query_salary_event();
    };

    document.getElementById("right").appendChild(min_salary_text);
    document.getElementById("right").appendChild(min_salary_input);
    document.getElementById("right").appendChild(sex_text);
    document.getElementById("right").appendChild(sex_select);
    document.getElementById("right").appendChild(button);
    document.getElementById("right").appendChild(table);
}

function query_salary_event() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8686/personnel/manage/user/get_user_by_min_salary_and_sex.do',
        data: {
            sex: document.getElementById("sex_select").value,
            minSalary: document.getElementById("min_salary_input").value
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










function deparRedirect(pageNum) {
    // 1 删除所有tr,创建第一行
    $("#right").empty();

    var desc = $("<tr></tr>");
    var desc_depar_name = $("<td>部门名称</td>");
    var desc_depar_host = $("<td>部门主管</td>");
    var desc_button = $("<td>管理部门</td>");
    desc.append(desc_depar_name);
    desc.append(desc_depar_host);
    desc.append(desc_button);
    $("#right").append(desc);

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

                document.getElementById("right").appendChild(tr);
            }

            // 显示下方的分页导航
            var p = document.createElement("p");
            p.innerHTML="共"+data.data.total+"条 "+data.data.pageNum+"/"+data.data.lastPage;
            var navigate_button = document.createElement("button");
            var navigate_num = document.createElement("input");
            navigate_button.innerHTML="转到";

            // 添加导航事件
            navigate_button.onclick = function()
            {
                deparRedirect(navigate_num.value);
            };
            document.getElementById("right").appendChild(p);
            document.getElementById("right").appendChild(navigate_button);
            document.getElementById("right").appendChild(navigate_num);
        },
        error: function(jqXHR){
            console.log(jqXHR);
            window.location.href="http://localhost:8686/personnel/pages/login.html";
        },
    })
}
