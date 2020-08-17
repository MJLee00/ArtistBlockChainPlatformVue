<template>
  <a-layout id="components-layout-demo-top-side">
    <a-layout-header class="header">
      <img class="logo" src="../assets/logo.jpg"/>
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['2']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1" @click="navi('/')">
          Login
        </a-menu-item>
        <a-menu-item key="2">
          Home
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item v-for="item in navigations"
        :key="item.name"
        >{{item.name}}</a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout style="padding: 24px 0; background: #fff">
        <a-layout-sider width="200" style="background: #fff">
          <a-menu
            mode="inline"
            :default-selected-keys="['1']"
            :default-open-keys="['sub1']"
            style="height: 100%"
          >
              <a-menu-item key="1" @click="navi('Insert')">
               <a-icon type="plus" />
               <span>Insert</span>
              </a-menu-item>
                  <a-menu-item key="2" @click="navi('Modify')">
               <a-icon type="edit" />
               <span>Modify</span>
              </a-menu-item>
              <a-menu-item key="3" @click="navi('Search')">
               <a-icon type="search" />
               <span>Search</span>
              </a-menu-item>
             <a-menu-item key="4" @click="navi('History')">
               <a-icon type="history" />
               <span>History</span>
              </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout-content :style="{ padding: '0 24px', minHeight: '700px' }">
         <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Artist Transaction Platform ©2018 Created by Henryli
    </a-layout-footer>
  </a-layout>
</template>

<script>
export default {
  data(){
    return{
        navigations:[{name:"Login"},{name:"Insert"}]
    }
  },
  methods:{
    navi(s){
      console.log(s)
      this.navigations.pop()
      this.navigations.push({name:s})
      this.$router.push(s)
    }
  }
}
</script>>

<style>
#components-layout-demo-top-side  .logo{
  width: 150px;
  height: 54px;
  background: rgba(255, 255, 255, 0.2);
  margin: 5px 18px 5px -40px;
  float: left;
}

</style>
