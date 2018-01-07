/**
 * @description 袁婷的路由
 * @author 袁婷
 * 
 */

import login from "../view/user/login"; //登陆
import userManage from "../view/user/userManage"; //用户管理
import finTaxManage from "../view/user/finTaxManage"; //财税用户管理（暂不使用）
import addManager from "../view/user/addManager"; //暂不使用
import alterUserInform from "../view/user/alterUserInform" //修改用户个人信息

export default [{ //登陆
        path: '/login',
        name: 'login',
        component: login
    },
    { //用户管理
        path: '/userManage',
        name: 'userManage',
        component: userManage
    },
    { //财税用户管理
        path: '/finTaxManage',
        name: 'finTaxManage',
        component: finTaxManage
    },

    { //暂不使用
        path: '/addManager',
        name: 'addManager',
        component: addManager
    },

    { //修改个人信息（用户）
        path: '/alterUserInform',
        name: 'alterUserInform',
        component: alterUserInform
    }
]