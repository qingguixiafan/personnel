package com.personnel.service;


import com.github.pagehelper.PageInfo;
import com.personnel.common.ServerResponse;
import com.personnel.pojo.User;

import java.util.List;

/**
 * Created by Administrator on 2017/12/4.
 */
public interface IUserService {

    ServerResponse login(String username, String password);

    ServerResponse<String> register(User user);

    ServerResponse<User> get_user_info(int userId);

    ServerResponse checkAdminRole(User user);

    ServerResponse addUserToDepartment(int userId, int departmentId);

    ServerResponse<User> update(User user);

    ServerResponse<List<User>> getUserByMinSalaryAndSex(User user, Integer sex, Integer minSalary);

    ServerResponse<PageInfo> getAll(User user, int pageNum, int pageSize);

    ServerResponse cancel(User user);

    ServerResponse updateInfoByHost(User user);
}
