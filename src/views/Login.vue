<template>

  <div id="box" >
    <img src="../assets/e32d2523d3636745afc0092752c3af20.jpeg" id="logo">
    <div>

        <!-- // 标题 -->
      <div class="header_title">
        <h1>Elifse商城后台管理系统</h1>
      </div>
      <!-- <div class="header_img">
        <img src="../assets/cutcamera.png" />
      </div> -->
      
      <el-card>
        <!-- rules 表单输入规则   ref 标记表单，让脚本可以方便的找到   model 必填属性，表单数据绑定-->
        <el-form
          label-width="80px"
          :rules="rules"
          ref="userMessage"
          :model="user"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="user.userName" placeholder="请输入用户名"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>

          <el-form-item size="large">
            <el-button type="primary" @click="login()">立即登录</el-button>
            <el-button @click="reset()">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        userName: "",
        password: "",
      },
      rules: {
        userName: [
          // required 表示必填    message提示信息   trigger 触发动作
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.userMessage.validate((val) => {
        if (!val) {
          this.$message.error("请检查输入的内容");
          return;
        }
        this.$http.post("/login", this.user).then((res) => {
          if (res.data.code == 201) {
            this.$message.error(res.data.msg);
            return;
          }
          this.$message.success(res.data.msg);
          //登录成功，设置一个token
          window.sessionStorage.setItem("token", "111111");
          // 将用户名存储到sessionStorage中
          window.sessionStorage.setItem("userName", this.user.userName);
          this.$router.push("/home");
        });
      });
    },
    reset() {
      this.$refs["userMessage"].resetFields();
    },
  },
};
</script>

<style scoped="scoped">
#box {
  width: 100vw;
  height: 90vh;
  background: #f2f2f2;
  display: flow-root;
}
#box > div {
  width: 500px;
  height: 100px;
  margin: 100px auto;
  position: relative;
}
#logo {
  width: 20%;
  margin: 50px auto;
}
.el-card {
  width: 500px;
  height: 300px;
  margin: 100px auto;
}
/* .header_img {
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 50px;
  position: absolute;
  top: -40px;
  left: 210px;
} */
.header_img > img {
  width: 60px;
  height: 60px;
  margin: 10px;
}
.el-form {
  margin-top: 50px;
}
</style>
