package com.personnel.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import com.personnel.common.Const;
import com.personnel.common.ServerResponse;
import com.personnel.dao.DepartmentMapper;
import com.personnel.dao.UserMapper;
import com.personnel.pojo.Department;
import com.personnel.pojo.User;
import com.personnel.service.IUserService;
import com.personnel.util.MD5Util;
import com.sun.corba.se.spi.activation.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

/**
 * Created by Administrator on 2017/12/4.
 */
@Service("iUserService")
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private DepartmentMapper departmentMapper;

    public ServerResponse login(String username, String password) {
        int resultCount = userMapper.checkUsername(username);
        if(resultCount == 0 ){
            return ServerResponse.createByErrorMessage("用户名不存在");
        }

        String md5Password = MD5Util.getMD5(password);
        User user  = userMapper.selectLogin(username,md5Password);
        if(user == null){
            return ServerResponse.createByErrorMessage("密码错误");
        }

        user.setPassword(org.apache.commons.lang3.StringUtils.EMPTY);
        return ServerResponse.createBySuccess("登录成功",user);
    }

    public ServerResponse<String> register(User user) {
        ServerResponse validResponse = this.checkValid(user.getName());
        if(!validResponse.isSuccess()){
            return validResponse;
        }
        user.setPassword(MD5Util.getMD5(user.getPassword()));
        int resultCount = userMapper.insert(user);
        if(resultCount == 0){
            return ServerResponse.createByErrorMessage("注册失败");
        }
        return ServerResponse.createBySuccessMessage("注册成功");
    }

    public ServerResponse<User> get_user_info(int userId) {
        User user = userMapper.selectByPrimaryKey(userId);
        if(user == null){
            return ServerResponse.createByErrorMessage("找不到当前用户");
        }
        user.setPassword(org.apache.commons.lang3.StringUtils.EMPTY);
        return ServerResponse.createBySuccess(user);
    }


    public ServerResponse<String> checkValid(String username) {
        int resultCount = userMapper.checkUsername(username);
        if(resultCount > 0 ){
            return ServerResponse.createByErrorMessage("用户名已存在");
        } else {
            return ServerResponse.createBySuccessMessage("校验成功");
        }
    }

    public ServerResponse addUserToDepartment(int userId, int departmentId) {
        User user = new User();
        user.setId(userId);
        user.setDepartmentId(departmentId);
        int updateCount = userMapper.updateByPrimaryKeySelective(user);
        if (updateCount > 0) {
            return ServerResponse.createBySuccess("用户所属部门修改成功",user);
        } else {
            return ServerResponse.createByErrorMessage("用户所属部门修改失败");
        }
    }

    public ServerResponse<User> update(User user){
        User updateUser = new User();
        updateUser.setName(user.getName());
        updateUser.setSex(user.getSex());
        updateUser.setPhone(user.getPhone());

        int updateCount = userMapper.updateByPrimaryKeySelective(user);
        if(updateCount > 0){
            return ServerResponse.createBySuccess("更新个人信息成功",updateUser);
        }
        return ServerResponse.createByErrorMessage("更新个人信息失败");
    }

    public ServerResponse<List<User>> getUserByMinSalaryAndSex(User user,  Integer sex, Integer minSalary) {
        List<User> userList = Lists.newArrayList();
        this.getAllByRecursion(userList, user, sex, minSalary);
        return ServerResponse.createBySuccess(userList);
    }

    public ServerResponse<PageInfo> getAll(User user, int pageNum, int pageSize) {
        int departmentId = departmentMapper.selectDepartmentIdByHostId(user.getId());
        PageHelper.startPage(pageNum, pageSize);
        List<User> users = userMapper.selectByDepartmentId(departmentId);
        PageInfo resultList = new PageInfo(users);
        return ServerResponse.createBySuccess(resultList);
    }

    public ServerResponse cancel(User user) {
        int count = userMapper.cancel(user.getId());
        if (count>0){
            return ServerResponse.createBySuccessMessage("用户注销成功");
        } else {
            return ServerResponse.createByErrorMessage("用户注销失败");
        }
    }



    // 新写的递归查询所有用户的方法
    private List<User> getAllByRecursion(List<User> userList, User user, Integer sex, Integer minSalary){
        // 这里可能会有bug，如果一个人的身份是管理员，但并没有一个部门的主管是他，
        // departmentId可能会是0，这是不允许的，待测试
        int departmentId = departmentMapper.selectDepartmentIdByHostId(user.getId());
        List<User> users = userMapper.selectByDepartmentId(departmentId);
        for (User currentUser : users) {
            if (currentUser.getSex()==sex && currentUser.getSalary()>=minSalary){
                currentUser.setPassword(org.apache.commons.lang3.StringUtils.EMPTY);
                userList.add(currentUser);
            }
            // 这里不要检查用户角色是否为空，数据库设置角色默认为0
            if (currentUser.getRole() == Const.Role.ROLE_ADMIN) {
                getAllByRecursion(userList, currentUser, sex, minSalary);
            }
        }
        return userList;
    }



    /**
     * 校验是否是管理员
     * @param user
     * @return
     */
    public ServerResponse checkAdminRole(User user){
        if(user != null && user.getRole().intValue() == Const.Role.ROLE_ADMIN){
            return ServerResponse.createBySuccess();
        }
        return ServerResponse.createByError();
    }
}
