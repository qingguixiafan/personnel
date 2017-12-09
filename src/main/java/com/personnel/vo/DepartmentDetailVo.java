package com.personnel.vo;

/**
 * Created by Administrator on 2017/12/9.
 */
public class DepartmentDetailVo {
    private Integer departmentId;

    private String departmentName;

    private Integer parentId;

    private Integer hostId;

    private String hostName;

    private Integer hostSex;

    private String hostPhone;

    public Integer getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Integer departmentId) {
        this.departmentId = departmentId;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public Integer getHostId() {
        return hostId;
    }

    public void setHostId(Integer hostId) {
        this.hostId = hostId;
    }

    public String getHostName() {
        return hostName;
    }

    public void setHostName(String hostName) {
        this.hostName = hostName;
    }

    public Integer getHostSex() {
        return hostSex;
    }

    public void setHostSex(Integer hostSex) {
        this.hostSex = hostSex;
    }

    public String getHostPhone() {
        return hostPhone;
    }

    public void setHostPhone(String hostPhone) {
        this.hostPhone = hostPhone;
    }
}
