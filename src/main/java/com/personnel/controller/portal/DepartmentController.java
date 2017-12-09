package com.personnel.controller.portal;

import com.personnel.common.ServerResponse;
import com.personnel.pojo.Department;
import com.personnel.service.IDepartmentService;
import com.personnel.vo.DepartmentNameAndIdVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;


/**
 * Created by Administrator on 2017/12/6.
 */
@Controller
@RequestMapping("/department/")
public class DepartmentController {

    @Autowired
    private IDepartmentService iDepartmentService;

    @RequestMapping(value = "get_department_names.do", method = RequestMethod.GET)
    @ResponseBody
    public ServerResponse<List<DepartmentNameAndIdVo>> getDepartemntNames() {
        return iDepartmentService.getDepartmentNames();
    }
}
