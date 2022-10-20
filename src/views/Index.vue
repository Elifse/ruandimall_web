<template>
  <div id="box">
    <div class="menu">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        router
      >
        <el-menu-item index="/home">
          <i class="el-icon-s-home"></i>
          <span slot="title">网站首页</span>
        </el-menu-item>
        <el-menu-item :index="item.path" v-for="item in menu">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.menuName }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <div class="header">
        <h1>
          ManageSystem
          <el-button class="logout" @click="logout">退出登录</el-button>
        </h1>
      </div>
      <div class="container">
        <el-card>
          <!-- 子路由显示 -->
          <router-view></router-view>
        </el-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
#box {
  width: 100vw;
  height: 100vh;
}
.menu {
  width: 200px;
  height: 100%;
  background-color: #ffffff;
  float: left;
}
.content {
  width: calc(100% - 200px);
  height: 100%;
  background-color: #ffffff;
  float: left;
}
.header {
  width: 100%;
  height: 50px;
  background-color: #ffffff;
}
.header > h1 {
  text-align: left;
  line-height: 50px;
}
.logout {
  float: right;
  margin-top: 5px;
  margin-right: 30px;
}
.container {
  width: 100%;
  height: 90vh;
  overflow: hidden;
}
.el-card {
  margin: 10px;
  height: 100%;
  overflow: hidden;
}
</style>

<script>
export default {
  data() {
    return {
      isCollapse: true,
      menu: "",
    };
  },
  created() {
    this.queryMenu();
  },
  methods: {
    // 切换菜单展开关闭
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 获取菜单
    async queryMenu() {
      //async  标记这是一个异步方法
      const { data: res } = await this.$http.post("/menu"); //await  表示异步请求
      this.menu = res.data;
      console.log(res);
    },
    // 退出登录
    logout() {
      window.sessionStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>