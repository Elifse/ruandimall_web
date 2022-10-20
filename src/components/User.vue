<template>
  <div>
    <el-table :data="user" style="width: 100%">
      <el-table-column prop="userName" label="用户名" width="180"> </el-table-column>
      <el-table-column prop="phone" label="电话" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="status" label="用户状态"> </el-table-column>
      <el-table-column label="编辑用户"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: ""
    };
  },
  created() {
    this.queryUser();
  },
  methods:{
    async queryUser(){
      const { data:res } = await this.$http.post("/all")
      this.user = res.data
    }
  }
};
</script>