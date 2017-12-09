package com.personnel.dao;

import com.personnel.pojo.Department;

import java.util.List;

public interface DepartmentMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Department record);

    int insertSelective(Department record);

    Department selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Department record);

    int updateByPrimaryKey(Department record);

    List<Department> getDepartments();

    int selectDepartmentIdByHostId(int hostId);

    int selectHostIdByDeaprtmentId(int departmentId);

    List<Department> selectSonDeaprtents(int departmentId);
}