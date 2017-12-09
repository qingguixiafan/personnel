package com.personnel.controller.backend;

import com.github.pagehelper.PageInfo;
import com.personnel.common.Const;
import com.personnel.common.ResponseCode;
import com.personnel.common.ServerResponse;
import com.personnel.pojo.Department;
import com.personnel.pojo.User;
import com.personnel.service.IDepartmentService;
import com.personnel.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

/**
 * Created by Administrator on 2017/12/6.
 */
@Controller
@RequestMapping("/manage/department")
public class DepartmentMangerController {

    @Autowired
    private IUserService iUserService;

    @Autowired
    private IDepartmentService iDepartmentService;


    @RequestMapping(value = "add_department.do", method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse<Department> addDepartment(Department department, HttpSession session) {
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user == null) {
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(), "用户未登录,请登录管理员");
        }
        if (iUserService.checkAdminRole(user).isSuccess()) {
            return iDepartmentService.add_department(department, user.getId());
        } else {
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }

    @RequestMapping(value = "delete_department.do", method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse deleteDepartment(Integer departmentId, HttpSession session) {
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user == null) {
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(), "用户未登录,请登录管理员");
        }
        if (iUserService.checkAdminRole(user).isSuccess()) {
            return iDepartmentService.delete_department(user, departmentId);
        } else {
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }

    @RequestMapping(value = "update_department.do", method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse updateDepartment(HttpSession session, Department department) {
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user == null) {
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(), "用户未登录,请登录管理员");
        }
        if (iUserService.checkAdminRole(user).isSuccess()) {
            return iDepartmentService.updateDepartment(user, department);
        } else {
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }

    @RequestMapping(value = "get_departments_by_host.do", method = RequestMethod.GET)
    @ResponseBody
    public ServerResponse<PageInfo> getDepartmentsByHost(HttpSession session, @RequestParam(value = "pageNum",defaultValue = "1") int pageNum, @RequestParam(value = "pageSize",defaultValue = "10") int pageSize) {
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user == null) {
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(), "用户未登录,请登录管理员");
        }
        if (iUserService.checkAdminRole(user).isSuccess()) {
            return iDepartmentService.getDepartmentsByHost(user.getId(), pageNum, pageSize);
        } else {
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }
}
