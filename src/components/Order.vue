<template>
  <div>
    <h1>订单管理</h1>
    <div class="insert">
      <el-button type="primary" @click="add">添加订单</el-button>
      <div>
        <el-input
          placeholder="请输入搜索关键词"
          size="small"
          v-model="orderDto.search"
        ></el-input>
        <el-button type="primary" @click="searchOrder()">搜索</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table :data="order" style="width: 100%">
      <el-table-column prop="orderId" label="订单编号" width="80"></el-table-column>
      <el-table-column prop="orderName" label="商品名称" width="200"></el-table-column>
      <el-table-column prop="orderAddress" label="用户地址" width="180"></el-table-column>
      <el-table-column prop="orderGoodname" label="订单商品名称" width="180"></el-table-column>
      <el-table-column prop="orderPrice" label="商品总价" width="180"></el-table-column>
      <el-table-column prop="orderInfo" label="订单信息" width="300"></el-table-column>
      <el-table-column prop="orderStatus" label="订单状态" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.orderStatus == 0" style="color: gray">未支付</span>
          <span v-if="scope.row.orderStatus == 1" style="color: yellow">已支付</span>
          <span v-if="scope.row.orderStatus == 2" style="color: blue">已发货</span>
          <span v-if="scope.row.orderStatus == 3" style="color: pink">已签收</span>
          <span v-if="scope.row.orderStatus == 4" style="color: green">已完成</span>
          <span v-if="scope.row.orderStatus == 5" style="color: red">存在异常</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button size="mini" @click="update(scope.row)">编辑</el-button>
          <el-button
            slot="reference"
            type="danger"
            size="mini"
            @click="dialogs(scope.row.orderId)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
        <el-dialog :visible.sync="dialogVisible" title="提示" width="40%">
      <span>是否删除该订单？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delOrder()">确 定</el-button>
      </span>
    </el-dialog>

    
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="orderDetail" :rules="rules">
        <el-form-item label="订单编号" prop="orderId">
          <el-input v-model="orderDetail.orderId"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="orderName">
          <el-input v-model="orderDetail.orderName"></el-input>
        </el-form-item>
        <el-form-item label="用户地址" prop="orderAddress">
          <el-input v-model="orderDetail.orderAddress"></el-input>
        </el-form-item>
        <el-form-item label="订单商品名称" prop="orderGoodname">
          <el-input v-model="orderDetail.orderGoodname"></el-input>
        </el-form-item>
        <el-form-item label="商品总价" prop="orderPrice">
          <el-input v-model="orderDetail.orderPrice"></el-input>
        </el-form-item>
        <el-form-item label="订单信息" prop="orderInfo">
          <el-input v-model="orderDetail.orderInfo"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" prop="orderStatus">
          <el-select v-model="orderDetail.orderStatus" placeholder="请选择">
            <el-option label="未支付" value="0"></el-option>
            <el-option label="已支付" value="1"></el-option>
            <el-option label="已发货" value="2"></el-option>
            <el-option label="已签收" value="3"></el-option>
            <el-option label="已完成" value="4"></el-option>
            <el-option label="存在异常" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button
          type="primary"
          @click="updateOrder()"
          v-show="dialogTitle == '修改订单'"
          >确定修改</el-button
        >
        <el-button
          type="primary"
          @click="addOrder()"
          v-show="dialogTitle == '添加订单'"
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
      orderDto: {
        search: "",
      },
      order: [],
      orderId: "",
      dialogVisible: false,
      dialogFormVisible: false,
      orderDetail: {
        orderId: "",
        orderName: "",
        orderAddress: "",
        orderGoodname: "",
        orderPrice: "",
        orderInfo: "",
        orderStatus: "",

        rules: {
          orderId: [
            { required: true, message: "订单编号不能为空", trigger: "blur" },
          ],
          orderName: [
            { required: true, message: "订单名称不能为空", trigger: "blur" },
          ],
          orderAddress: [
            { required: true, message: "订单地址不能为空", trigger: "blur" },
          ],
          orderGoodname: [
            {
              required: true,
              message: "订单商品名称不能为空",
              trigger: "blur",
            },
          ],
          orderPrice: [
            { required: true, message: "订单价格不能为空", trigger: "blur" },
          ],
          orderInfo: [
            { required: true, message: "订单信息不能为空", trigger: "blur" },
          ],
          orderStatus: [
            { required: true, message: "订单状态不能为空", trigger: "blur" },
          ],
        },
      },
    };
  },
  created() {
    this.queryOrder();
  },

  methods: {
    async queryOrder() {
      const { data: res } = await this.$http.get("/allorder");
      this.order = res.data;
    },
    // 删除订单
    async delOrder() {
      this.dialogVisible = false;
      const { data: res } = await this.$http.post(`/deleteorder/${this.orderId}`);
      if (res.status === 201) {
        this.$message.error(res.msg);
        return;
      }
      this.$message.success(res.msg);
      this.queryOrder();
    },

    // 添加订单
    async addOrder() {
      this.dialogFormVisible = false;
      const { data: res } = await this.$http.post("/addorder", this.orderDetail);
      if (res.status === 201) {
        this.$message.error(res.msg);
        return;
      }
      this.$message.success(res.msg);
      this.queryOrder();
    },

    // 修改订单
    async updateOrder() {
      this.dialogFormVisible = false;
      const { data: res } = await this.$http.post(
        "/updateorder",
        this.orderDetail
      );
      if (res.status === 201) {
        this.$message.error(res.msg);
        return;
      }
      this.$message.success(res.msg);
      this.dialogFormVisible = false;
      this.queryOrder();
    },

    dialogs(val){
      this.orderId = val;
      this.dialogVisible = !this.dialogVisible;
    },

    update(val) {
      this.dialogTitle = "修改订单";
      this.dialogFormVisible = true;
      this.orderDetail = val;
    },
    close() {
      this.dialogFormVisible = false;
      this.queryOrder();
    },
    add(){
      this.dialogTitle = "添加订单";
      this.dialogFormVisible = true;
      this.orderDetail = {
        orderId: "",
        orderName: "",
        orderAddress: "",
        orderGoodname: "",
        orderPrice: "",
        orderInfo: "",
        orderStatus: "",
      };
    },

    // 搜索
    async searchOrder() {
      const { data : res } = await this.$http.post("/searchorder",this.orderDto);
      this.order = res.data;
    }
    
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
