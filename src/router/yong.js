/**
 * @description 王志勇的路由
 * @author 王志勇
 * 
 */
import grid from "../view/gridDemo/grid.vue";
import company from "../view/company/list/index.vue";
//测试修改
export default [
    {
        path: '/grid',
        name: 'grid',
        component: grid
      },
      {
          path:"/company",
          name:"company",
          component:company
      }
]