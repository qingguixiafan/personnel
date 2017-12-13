package com.personnel.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.common.collect.Lists;
import com.personnel.common.Const;
import com.personnel.common.ServerResponse;
import com.personnel.dao.DepartmentMapper;
import com.personnel.dao.UserMapper;
import com.personnel.pojo.Department;
import com.personnel.pojo.User;
import com.personnel.service.IDepartmentService;
import com.personnel.vo.DepartmentDetailVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2017/12/6.
 */
@Service("iDerpartmentService")
public class DepartmentServiceImpl implements IDepartmentService {

    @Autowired
    private DepartmentMapper departmentMapper;

    @Autowired
    private UserMapper userMapper;

    public ServerResponse<Department> add_department(Department department, Integer hostId) {
        int departmentId = departmentMapper.selectDepartmentIdByHostId(hostId);
        department.setParentId(departmentId);
        // 判读部门主管是否是管理员角色;
        if (userMapper.checkRole(department.getHost())!= Const.Role.ROLE_ADMIN) {
            return ServerResponse.createByErrorMessage("新增的部门管理员还不是管理员身份");
        }

        int count = departmentMapper.insertSelective(department);
        if (count>0) {
            return ServerResponse.createBySuccess("新增部门成功", department);
        } else {
            return ServerResponse.createByErrorMessage("新增部门失败");
        }
    }


    // 这里写的很垃圾，应该做成事务或者将这些功能分割成多个小功能
    public ServerResponse delete_department(User user, Integer departmentId) {
        // 1 检查用户是否是部门的上级(分两步)
        int lowerHost = departmentMapper.selectHostIdByDeaprtmentId(departmentId);
        int upDepartment = departmentMapper.selectDepartmentIdByHostId(user.getId());
        int count = userMapper.checkUserAndDepartment(lowerHost, upDepartment);
        if (count<=0){
            return ServerResponse.createByErrorMessage("您无权删除该部门");
        }

        // 2 修改被删除部门所有员工的部门id
        int updateDepartmentIdCount = userMapper.updateUserDepartmentId(upDepartment, departmentId);

        // 3 修改被删除部门主管的角色
        User updateUser = new User();
        updateUser.setId(lowerHost);
        updateUser.setRole(Const.Role.ROLE_USER);
        int updateRoleCount = userMapper.updateByPrimaryKeySelective(updateUser);

        // 4 删除部门
        Department department = new Department();
        department.setId(departmentId);
        department.setIsDelete(Const.IsDelete.DELETE);
        int deleteDepartment = departmentMapper.updateByPrimaryKeySelective(department);
        if (deleteDepartment>0) {
            return ServerResponse.createBySuccess("删除一个部门成功");
        }
        return ServerResponse.createByErrorMessage("删除部门失败");
    }


    // 这个同样垃圾，也是事务的原因
    public ServerResponse updateDepartment(User user, Department department) {
        // 检查用户是否是部门的上级(分两步)
        int lowerHost = departmentMapper.selectHostIdByDeaprtmentId(department.getId());
        int upDepartment = departmentMapper.selectDepartmentIdByHostId(user.getId());
        int count = userMapper.checkUserAndDepartment(lowerHost, upDepartment);
        if (count<=0){
            return ServerResponse.createByErrorMessage("您无权修改该部门信息");
        }

        Department updateDepartment = new Department();
        updateDepartment.setId(department.getId());
        updateDepartment.setName(department.getName());
        updateDepartment.setHost(department.getHost());
        // 判断下是否修改了部门主管，然后修改部门主管的角色,新主管的部门id
        if (null!=department.getHost() && !"".equals(department.getHost())) {
            User oldHost = new User();
            oldHost.setId(lowerHost);
            oldHost.setRole(Const.Role.ROLE_USER);
            userMapper.updateByPrimaryKeySelective(oldHost);

            User newHost = new User();
            newHost.setId(department.getHost());
            newHost.setRole(Const.Role.ROLE_ADMIN);
            newHost.setDepartmentId(upDepartment);
            userMapper.updateByPrimaryKeySelective(newHost);
        }

        int updateCount = departmentMapper.updateByPrimaryKeySelective(updateDepartment);
        if (updateCount>0) {
            return ServerResponse.createBySuccess(updateDepartment);
        }
        return ServerResponse.createByErrorMessage("修改部门信息失败");
    }

    public ServerResponse<PageInfo> getDepartmentsByHost(Integer hostId, int pageNum, int pageSize) {
        int departmentId = departmentMapper.selectDepartmentIdByHostId(hostId);
        PageHelper.startPage(pageNum,pageSize);
        List<Department> departments = departmentMapper.selectSonDeaprtents(departmentId);
        List<DepartmentDetailVo> departmentDetailVoList = this.assemblyDepartmentDetailVo(departments);

        PageInfo resultList = new PageInfo(departments);
        resultList.setList(departmentDetailVoList);
        return ServerResponse.createBySuccess(resultList);
    }

    private List<DepartmentDetailVo> assemblyDepartmentDetailVo(List<Department> departments) {
        List<DepartmentDetailVo> departmentDetailVoList = Lists.newArrayList();
        for (Department department : departments) {
            // 根据部门hostid查询部门领导信息
            User host = userMapper.selectByPrimaryKey(department.getHost());

            DepartmentDetailVo departmentDetailVo = new DepartmentDetailVo();
            departmentDetailVo.setDepartmentId(department.getId());
            departmentDetailVo.setDepartmentName(department.getName());
            departmentDetailVo.setParentId(department.getParentId());
            departmentDetailVo.setHostName(host.getName());
            departmentDetailVo.setHostId(host.getId());
            departmentDetailVo.setHostSex(host.getSex());
            departmentDetailVo.setHostPhone(host.getPhone());
            departmentDetailVoList.add(departmentDetailVo);
        }
        return departmentDetailVoList;
    }
}

