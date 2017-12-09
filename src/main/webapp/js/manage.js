/**
 * Created by Administrator on 2017/12/8.
 */
function init(){

    // 获取所有下属员工信息
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8686/personnel//manage/department/get_departments_by_host.do?pageNum=1&pageSize=3',
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
                var button = document.createElement('button');

                depar_name_input.setAttribute("id", "input_name_"+data.data.list[i].departmentId);
                depar_name_input.value = data.data.list[i].departmentName;
                depar_host_input.setAttribute("id","input_host_"+data.data.list[i].hostId);
                depar_host_input.value = data.data.list[i].hostName;
                button.innerHTML = "修改";
                // 修改button的id和添加onclick事件

                tr.appendChild(depar_name_td);
                tr.appendChild(depar_host_td);
                tr.appendChild(button_td);

                depar_name_td.appendChild(depar_name_input);
                depar_host_td.appendChild(depar_host_input);
                button_td.appendChild(button);

                document.getElementById("department_info").appendChild(tr);

            }


            // 2 生成下方的导航栏（超链接）


        },
        error: function(jqXHR){
            console.log(jqXHR);
            window.location.href="http://localhost:8686/personnel/pages/error.html";
        },
    })


    // 获取自己所有直接下属员工是管理员身份时管理的部门信息
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8686/personnel/manage/user/get_all.do?pageNum=1&pageSize=3',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        success: function(data){
            console.log(data);
        },
        error: function(jqXHR){
            console.log(jqXHR);
            window.location.href="http://localhost:8686/personnel/pages/error.html";
        },
    })
}
