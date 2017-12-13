package com.personnel.service;

import com.github.pagehelper.PageInfo;
import com.personnel.common.ServerResponse;
import com.personnel.pojo.Department;
import com.personnel.pojo.User;

/**
 * Created by Administrator on 2017/12/6.
 */
public interface IDepartmentService {

    ServerResponse<Department> add_department(Department department, Integer hostId);

    ServerResponse delete_department(User user, Integer departmentId);

    ServerResponse updateDepartment(User user, Department department);

    ServerResponse<PageInfo> getDepartmentsByHost(Integer hostId, int pageNum, int pageSize);

}
