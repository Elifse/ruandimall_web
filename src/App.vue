<template>
  <div id="app">

    <!-- <el-button>按钮</el-button>
    <el-date-picker
      v-model="value1"
      type="monthrange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    /> -->
    <!-- 组件渲染标签 -->
    <router-view />
    <!-- 页脚 -->
    <app-footer></app-footer>
  </div>
</template>

<script>
import { Button, DatePicker } from 'element-ui'
import Footer from './components/Footer.vue'
export default {
  name: 'App',
  components: {
    'el-button': Button,
    'el-date-picker': DatePicker,
    'app-footer': Footer
  },
  data () {
    return {
      value1: ''
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
