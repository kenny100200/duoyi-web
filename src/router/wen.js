/**
 * @description 彭达文的路由
 * @author 彭达文
 * 
 */
import menu from "../view/menu";
import roleModule from "../view/roleModule";
import moduleManagement from "../view/moduleManagement";

export default [
   
    {
        path: '/menu',           //菜单
        name: 'menu',
        component: menu
    },
    {
        path:'/role',           //角色管理
        name:'role',
        component:roleModule
    },
    {
        path:'/module',         //模块管理
        name:'module',
        component:moduleManagement
    },
  

]