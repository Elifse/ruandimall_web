<template>
  <div>
    <h1>商品管理</h1>
    <div class="insert">
      <el-button type="primary" @click="add">添加商品</el-button>
      <el-input placeholder="请输入搜索关键词" size="small" v-model="goodDto.search"></el-input>
      <el-button type="primary" @click="searchGood()" >搜索</el-button>

    </div>
    <el-table :data="good" style="width: 100%">
      <el-table-column prop="goodName" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="goodPrice" label="商品价格" width="180">
      </el-table-column>
      <el-table-column label="商品状态">
        <template slot-scope="scope">
          <span v-if="scope.row.goodStatus == 1" style="color: green"
            >正常</span
          >
          <span v-if="scope.row.goodStatus == 0" style="color: red">下架</span>
        </template>
      </el-table-column>
      <el-table-column label="编辑用户">
        <template slot-scope="scope">
          <el-button size="mini" @click="update(scope.row)">编辑</el-button>
          <el-button
            slot="reference"
            type="danger"
            size="mini"
            @click="dialogs(scope.row.goodId)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" title="提示" width="40%">
      <span>是否删除该商品？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delGood()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="goodDetail" :rules="rules">
        <el-form-item label="商品名称" prop="goodName">
          <el-input v-model="goodDetail.goodName"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="goodPrice">
          <el-input v-model="goodDetail.goodPrice"></el-input>
        </el-form-item>
        <el-form-item label="商品状态" prop="goodStatus">
          <el-select v-model="goodDetail.goodStatus" placeholder="请选择">
            <el-option label="正常" value="1"></el-option>
            <el-option label="下架" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button
          type="primary"
          @click="updateGood()"
          v-show="dialogTitle == '修改商品'"
          >确定修改</el-button
        >
        <el-button
          type="primary"
          @click="addGood()"
          v-show="dialogTitle == '添加商品'"
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
      goodDto: {
        search: "",
      },
      good: [],
      goodId: "",
      dialogVisible: false,
      dialogFormVisible: false,
      goodDetail: {
        goodName: "",
        goodPrice: "",
        goodStatus: "",

        rules: {
          goodName: [
            { required: true, message: "请输入商品名称", trigger: "blur" },
          ],
          goodPrice: [
            { required: true, message: "请输入商品价格", trigger: "blur" },
          ],
          goodStatus: [
            { required: true, message: "请选择商品状态", trigger: "blur" },
          ],
        },
      },
    };
  },
  created() {
    this.queryGood();
  },
  methods: {
    async queryGood() {
      const { data: res } = await this.$http.post("/allgood");
      this.good = res.data;
    },
    async delGood() {
      this.dialogVisible = false;
      const { data: res } = await this.$http.post(`/deletegood/${this.goodId}`);
      if (res.status === 201) {
        this.$message.error(res.msg);
        return;
      }
      this.$message.success(res.msg);
      this.queryGood();
    },

    // 添加商品
    async addGood() {
      const { data: res } = await this.$http.post("/addgood", this.goodDetail);
      if (res.status === 201) {
        this.$message.error(res.msg);
        return;
      }
      this.$message.success(res.msg);
      this.dialogFormVisible = false;
      this.queryGood();
    },

    // 修改商品
    async updateGood() {
      const { data: res } = await this.$http.post(
        "/updategood",
        this.goodDetail
      );
      if (res.status === 201) {
        this.$message.error(res.msg);
        return;
      }
      this.$message.success(res.msg);
      this.dialogFormVisible = false;
      this.queryGood();
    },

    dialogs(val) {
      this.goodId = val;
      this.dialogVisible = !this.dialogVisible;
    },
    update(val) {
      this.dialogTitle = "修改商品";
      this.dialogFormVisible = true;
      this.goodDetail = val;
    },
    close() {
      this.dialogFormVisible = false;
      this.queryGood();
    },
    add() {
      this.dialogTitle = "添加商品";
      this.dialogFormVisible = true;
      this.goodDetail = {
        goodName: "",
        goodPrice: "",
        goodStatus: 0,
      };
    },

    // 搜索
    async searchGood() {
      const { data: res } = await this.$http.post("/searchgood", this.goodDto);
      this.good = res.data;
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