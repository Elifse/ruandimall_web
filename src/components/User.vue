<template>
  <div>
    <el-table :data="user" style="width: 100%">
      <el-table-column prop="userName" label="用户名" width="180">
      </el-table-column>
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
          <span style="color: blue">编辑</span> |
          <el-popconfirm title="是否删除该用户？">
            <el-button
              slot="reference"
              type="danger"
              size="mini"
              @click="delUser(userId)"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      userId: "",
    };
  },
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

    dialogs(val) {
      this.userId = val;
      this.dialogVisible = !this.dialogVisible;
    },
  },
};
</script>