package com.personnel.common;

/**
 * Created by Administrator on 2017/12/4.
 */
public class Const {
    public static final String CURRENT_USER = "currentUser";

    public interface Role{
        int ROLE_USER = 0; //普通用户
        int ROLE_ADMIN = 1;//管理员
    }

    public interface IsDelete{
        int DELETE = 1; //已删除
        int UNDELETE = 0; //未删除
    }

}
