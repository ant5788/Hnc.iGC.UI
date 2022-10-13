<template>
  <div class="main">
    <Header :title="title"></Header>
    <div class="left fl">
      <leftNav></leftNav>
    </div>
    <div class="con fl">
      <el-button type="primary" @click="add">新增</el-button>
      <el-button type="primary" @click="upLoad">文件上传</el-button>
      <el-table
        :data="tableData"
        :height="tableHeight"
        :header-cell-style="{ background: '#071225', color: '#fff' }"
      >
        <el-table-column prop="DeviceName" label="设备名称"></el-table-column>
        <el-table-column prop="DeviceType" label="设备类型"></el-table-column>
        <el-table-column prop="DeviceNumber" label="设备编号"></el-table-column>
        <!-- <el-table-column prop="AssetNumber" label="资产编号"></el-table-column> -->
        <el-table-column prop="DeviceModel" label="设备型号"></el-table-column>
        <el-table-column prop="PurchaseDate" label="采购日期"></el-table-column>
        <el-table-column prop="DurableYars" label="使用年限"></el-table-column>
        <el-table-column
          prop="StartTime"
          label="维修开始时间"
        ></el-table-column>
        <el-table-column prop="EndTime" label="维修结束时间"></el-table-column>
        <el-table-column prop="reason" label="维修原因"></el-table-column>
        <el-table-column
          prop="RepairPersonnel"
          label="维修负责人"
        ></el-table-column>
        <el-table-column
          prop="RepairStateName"
          label="维修状态"
        ></el-table-column>
        <el-table-column
          prop="RepairDuration"
          label="维修时长"
        ></el-table-column>
        <el-table-column prop="RepairCost" label="维修金额"></el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="primary">
              修改</el-button
            >
            <el-button @click="handleDelete(scope.row)" type="warning">
              删除</el-button
            >
            <el-button @click="handledetail(scope.row)" type="primary">
              详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="[10, 20, 30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <addDigo :visible.sync="visible"></addDigo>
    <upDigo :show.sync="show" :data="updata" v-if="flag"></upDigo>
    <detailDigo
      :detail.sync="detail"
      :data="datailData"
      v-if="dflag"
    ></detailDigo>
  </div>
</template>
<script>
import Header from "../common/Header.vue";
import leftNav from "../common/leftNav.vue";
import addDigo from "./repairAdd.vue";
import upDigo from "./repairUpdata.vue";
import detailDigo from "./repairDetails.vue";
let query = "/api/CNC/GetAllDeviceRepair";
let del = "/api/CNC/DeleteDeviceRepairById?";
export default {
  components: { leftNav, Header, addDigo, upDigo, detailDigo },
  data() {
    return {
      visible: false,
      show: false,
      upShow: false,
      updata: {},
      flag: false,
      detail: false,
      dflag: false,
      datailData: {},
      tableData: [],
      title: "设备维修记录",
      tableHeight: "",
      pageSize: 10,
      pageNo: 1,
      total: 0,
      status: {
        0: "未完成",
        1: "完成",
      },
    };
  },
  mounted() {
    let _this = this;
    window.onresize = () => {
      if (_this.resizeFlag) {
        clearTimeout(_this.resizeFlag);
      }
      _this.resizeFlag = setTimeout(() => {
        _this.getTableHeight();
        _this.resizeFlag = null;
      }, 100);
    };
  },
  created() {
    this.getTableHeight();
    this.getData();
  },
  methods: {
    getTableHeight() {
      let tableH = 150; //距离页面下方的高度
      let tableHeightDetil = window.innerHeight - tableH;
      if (tableHeightDetil <= 300) {
        this.tableHeight = 300;
      } else {
        this.tableHeight = window.innerHeight - tableH;
      }
    },
    getData() {
      this.$axios
        .get(
          this.$api +
            query +
            "?pageNo=" +
            this.pageNo +
            "&pageSize=" +
            this.pageSize
        )
        .then((res) => {
          if (res.data.state === 1) {
            let data = res.data.data.list;
            if (data.length > 0) {
              data.forEach((item) => {
                item.StartTime = this.$utils.Timeconversion(item.StartTime);
                item.EndTime = this.$utils.Timeconversion(item.EndTime);
                item.RepairStateName = this.status[item.RepairState];
              });
              this.total = res.data.data.total;
              this.tableData = data;
            }
          }
        });
    },
    handleEdit(row) {
      this.updata = row;
      this.show = true;
      this.flag = true;
    },
    handledetail(row) {
      console.log("ok");
      this.datailData = row;
      this.detail = true;
      this.dflag = true;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getData();
    },
    //新增
    add() {
      this.visible = true;
    },
    upLoad() {
      this.upShow = true;
    },
    //删除
    handleDelete(row) {
      this.$axios.get(this.$api + del + "id=" + row.Id).then((res) => {
        if (res.data.state === 1) {
          this.$message.success(res.data.message);
        } else {
          this.$message(res.data.message);
        }
        this.getData();
      });
    },
  },
};
</script>
<style scoped lang="scss">
.fl {
  float: left;
}
.left {
  width: 14%;
  margin-top: 20px;
  margin-right: 10px;
}
.con {
  width: 85%;
  margin-top: 20px;
}
.el-table {
  font-size: 18px;
  background: none;
}
/deep/.el-table tr {
  background: none !important;
  color: #fff;
}
.el-table th.el-table__cell {
  background: none !important;
}
.el-table__empty-text {
  color: #fff;
}
/deep/.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
  background: none !important;
}
.el-pagination button,
/deep/.el-pagination span:not([class*="suffix"]) {
  font-size: 18px;
  height: 30px;
  line-height: 30px;
}
/deep/.el-input--mini {
  font-size: 18px;
}
</style>
