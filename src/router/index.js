import Vue from 'vue';
import Router from 'vue-router';
import Home from '../view/home.vue';
import yong from "./yong";
import wen from "./wen";
import ting from "./ting";

Vue.use(Router)


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
    
  ].concat(yong,wen,ting)
})
