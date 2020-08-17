import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/views/Login"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'Login',
      component: Login
    },
    {
      path:'/Home',
      name:'Home',
      component:()=>import(/* webpackChunkName: "Home"*/"../views/Home.vue" ),
      children:[{
        path:'/Insert',
        name:'insert',
        component:()=>import(/* webpackChunkName: "Insert"*/"../views/Insert.vue" ),
      },
      {
        path:"/Search",
        name:"Search",
        component:()=>import(/* webpackChunkName: "Search"*/"../views/Search.vue" ),
      },
      {
        path:"/Modify",
        name:"Modify",
        component:()=>import(/* webpackChunkName: "Modify"*/"../views/Modify.vue" ),
      },
      {
        path:"/History",
        name:"History",
        component:()=>import(/* webpackChunkName: "History"*/"../views/SearchHistory.vue" ),
      }
      ,
      {
        path:"/Success",
        name:"Success",
        component:()=>import(/* webpackChunkName: "Success"*/"../views/Success.vue" ),
      }]
    }
  ]
})
