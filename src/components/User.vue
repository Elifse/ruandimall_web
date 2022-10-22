<template>
  <div>
    <h1>用户管理</h1>
    <div class="insert">
      <el-button type="primary" @click="add">添加用户</el-button> <div>
      <el-input placeholder="请输入搜索关键词" size="small" v-model="userDto.search"></el-input>
      <el-button type="primary" @click="searchUser()" >搜索</el-button>
    </div>
    </div>
   
    <el-table :data="user" style="width: 100%">
      <el-table-column prop="userName" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="60"> </el-table-column>
      <el-table-column prop="phone" label="电话" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1" style="color: green">正常</span>
          <span v-if="scope.row.status == 0" style="color: red">冻结</span>
        </template>
      </el-table-column>
      <el-table-column label="编辑用户">
        <template slot-scope="scope">
          <el-button size="mini" @click="update(scope.row)">编辑</el-button>
          <el-button
            slot="reference"
            type="danger"
            size="mini"
            @click="dialogs(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" title="提示" width="40%">
      <span>是否删除该用户？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="delUser()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="userDetail" :rules="rules">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userDetail.userName"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          v-show="dialogTitle == '添加用户'"
          prop="password"
        >
          <el-input autocomplete="off" v-model="userDetail.password"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-input autocomplete="off" v-model="userDetail.gender"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input autocomplete="off" v-model="userDetail.phone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input autocomplete="off" v-model="userDetail.address"></el-input>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-select v-model="userDetail.status" placeholder="请选择">
            <el-option label="正常" value="1"></el-option>
            <el-option label="冻结" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button
          type="primary"
          @click="updateUser()"
          v-show="dialogTitle == '修改用户'"
          >确定修改</el-button
        >
        <el-button
          type="primary"
          @click="addUser()"
          v-show="dialogTitle == '添加用户'"
          >确定添加</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userDto:{
        search: "",
      },
      userDetail: {
        id: "",
        userName: "",
        password: "",
        gender: "",
        phone: "",
        address: "",
        status: "",
      },
      dialogTitle: "",
      user: [],
      userId: "",
      dialogVisible: false,
      dialogFormVisible: false,

      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        gender: [{ required: true, message: "请输入性别", trigger: "blur" }],
        phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
      },
    };
  },

  // updated() {
  //   this.queryUser();
  // },
  created() {
    this.queryUser();
  },
  methods: {
    async queryUser() {
      const { data: res } = await this.$http.post("/alluser");
      this.user = res.data;
    },
    async delUser() {
      this.dialogVisible = false;
      const { data: res } = await this.$http.post(`/deleteuser/${this.userId}`);
      if (res.status === 201) {
        this.$message.error(res.msg);
        return;
      }
      this.$message.success(res.msg);
      this.queryUser();
    },

    // 添加用户
    async addUser() {
      const { data: res } = await this.$http.post("/adduser", this.userDetail);
      if (res.status === 201) {
        this.$message.error(res.msg);
        return;
      }
      this.$message.success(res.msg);
      this.queryUser();
    },

    // 修改用户
    async updateUser() {
      const { data: res } = await this.$http.post(
        "/updateuser",
        this.userDetail
      );
      if (res.status === 201) {
        this.$message.error(res.msg);
        return;
      }
      this.$message.success(res.msg);
      this.queryUser();
    },

    dialogs(val) {
      this.userId = val;
      this.dialogVisible = !this.dialogVisible;
    },
    update(val) {
      this.dialogTitle = "修改用户";
      this.dialogFormVisible = true;
      this.userDetail = val;
    },
    close() {
      this.dialogFormVisible = false;
      this.queryUser();
    },
    add() {
      this.dialogTitle = "添加用户";
      this.dialogFormVisible = true;
      this.userDetail.userName = "";
      this.userDetail.password = "";
      this.userDetail.phone = "";
      this.userDetail.address = "";
      this.userDetail.status = 0;
    },
    // 搜索用户
    async searchUser() {
      const { data: res } = await this.$http.post("/searchuser", this.userDto);
      this.user = res.data;
    },
  },
};
</script>

<style scoped>
.insert {
  width: 100%;
  height: 2rem;
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
}
.insert > div {
  display: flex;
  justify-content: space-between;
}
.el-button {
  margin-left: 25px;
  line-height: 10px;
}
</style>