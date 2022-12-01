<template>
  <div>
    <h1>菜单管理</h1>
    <div class="insert">
      <el-button type="primary" @click="add">添加菜单</el-button>
      <div>
        <el-input
          placeholder="请输入搜索关键词"
          size="small"
          v-model="menuDto.search"
        ></el-input>
        <el-button type="primary" @click="searchMenu()">搜索</el-button>
      </div>
    </div>
    <el-table :data="menu" style="width: 100%">
      <el-table-column prop="menuName" label="菜单名称" width="180">
      </el-table-column>
      <el-table-column prop="icon" label="图标名称" width="180">
      </el-table-column>
      <el-table-column prop="path" label="菜单路径" width="180">
      </el-table-column>
      <el-table-column label="菜单状态">
        <template slot-scope="scope">
          <span v-if="scope.row.menuStatus == 1" style="color: green"
            >正常</span
          >
          <span v-if="scope.row.menuStatus == 0" style="color: red">下架</span>
        </template>
      </el-table-column>
      <el-table-column label="编辑菜单">
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
      <span>是否删除该菜单？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delMenu()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="menuDetail" :rules="rules">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="menuDetail.menuName"></el-input>
        </el-form-item>
        <el-form-item label="图标名称" prop="icon">
          <el-input v-model="menuDetail.icon"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" prop="path">
          <el-input v-model="menuDetail.path"></el-input>
        </el-form-item>
        <el-form-item label="菜单状态" prop="menuStatus">
          <el-select v-model="menuDetail.menuStatus" placeholder="请选择">
            <el-option label="正常" value="1"></el-option>
            <el-option label="下架" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button
          type="primary"
          @click="updateMenu()"
          v-show="dialogTitle == '修改菜单'"
          >确定修改</el-button
        >
        <el-button
          type="primary"
          @click="addMenu()"
          v-show="dialogTitle == '添加菜单'"
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
      menu: [],
      menuDto: {
        search: "",
      },
      id: "",
      dialogVisible: false,
      dialogFormVisible: false,
      menuDetail: {
        menuName: "",
        icon: "",
        path: "",
        menuStatus: "",

        rules: {
          menuName: [
            { required: true, message: "菜单名称不能为空", trigger: "blur" },
          ],
          path: [
            { required: true, message: "菜单路径不能为空", trigger: "blur" },
          ],
          icon: [
            { required: true, message: "图标名称不能为空", trigger: "blur" },
          ],
          menuStatus: [
            { required: true, message: "菜单状态不能为空", trigger: "blur" },
          ],
        },
      },
    };
  },

  created() {
    this.qureyMenu();
  },
  methods: {
    async qureyMenu() {
      const { data: res } = await this.$http.post("/menu");
      this.menu = res.data;
    },

    //删除菜单
    async delMenu() {
      this.dialogVisible = false;
      const { data: res } = await this.$http.post(`/deletemenu/${this.id}`);
      if (res.status === 201) {
        this.$message.error(res.msg);
        return;
      }
      this.$message.success(res.msg);
      this.qureyMenu();
    },

    // 添加菜单
    async addMenu() {
      const { data: res } = await this.$http.post("/addmenu", this.menuDetail);
      if (res.status === 201) {
        this.$message.error(res.msg);
        return;
      }
      this.$message.success(res.msg);
      this.dialogFormVisible = false;
      this.qureyMenu();
    },

    // 修改菜单
    async updateMenu() {
      const { data: res } = await this.$http.post(
        "/updatemenu",
        this.menuDetail
      );
      if (res.status === 201) {
        this.$message.error(res.msg);
        return;
      }
      this.$message.success(res.msg);
      this.dialogFormVisible = false;
      this.qureyMenu();
    },

    dialogs(val) {
      this.id = val;
      this.dialogVisible = !this.dialogVisible;
    },

    update(val) {
      this.dialogTitle = "修改菜单";
      this.dialogFormVisible = true;
      this.menuDetail = val;
    },

    close() {
      this.dialogFormVisible = false;
      this.qureyMenu();
    },

    add() {
      this.dialogTitle = "添加菜单";
      this.dialogFormVisible = true;
      this.menuDetail = {
        menuName: "",
        path: "",
        menuStatus: "",
      };
    },

    //搜索菜单
    async searchMenu() {
      const { data: res } = await this.$http.post("/searchmenu", this.menuDto);
      this.menu = res.data;
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
