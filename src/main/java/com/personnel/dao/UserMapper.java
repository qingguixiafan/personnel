package com.personnel.dao;

import com.personnel.pojo.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

    int checkUsername(String username);

    User selectLogin(@Param("username") String username, @Param("password") String password);

    List<User> selectByDepartmentId(int departmentId);

    int cancel(int id);

    int checkRole(int userId);

    int checkUserAndDepartment(@Param("userId") Integer userId, @Param("departmentId") Integer departmentId);

    int updateUserDepartmentId(@Param("newDepartmentId")Integer newDepartmentId, @Param("oldDepartmentId")Integer oldDepartmentId);
}