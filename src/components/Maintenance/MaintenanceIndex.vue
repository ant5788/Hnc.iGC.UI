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
        :header-cell-style="{ background: '#071225', color: '#fff' }"
        :show-overflow-tooltip="true"
        :height="tableHeight"
      >
        <el-table-column prop="DeviceNumber" label="设备编号"></el-table-column>
        <el-table-column prop="DeviceName" label="设备名称"></el-table-column>
        <el-table-column prop="DeviceModel" label="设备型号"></el-table-column>
        <el-table-column prop="DeviceType" label="设备类型"></el-table-column>
        <el-table-column prop="DeviceState" label="设备状态"></el-table-column>
        <el-table-column prop="Content" label="保养内容"></el-table-column>
        <el-table-column prop="Cycle" label="保养周期"></el-table-column>
        <el-table-column
          prop="DeviceClassification"
          label="设备分类"
        ></el-table-column>
        <el-table-column prop="PersonLiable" label="责任人"></el-table-column>
        <el-table-column prop="UserDep" label="使用单位"></el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="primary">
              修改</el-button
            >
            <el-button @click="handleDelete(scope.row)" type="warning">
              删除</el-button
            >
            <el-button @click="handleDetail(scope.row)" type="primary">
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
    <upLoad :upShow.sync="upShow" :type="type"></upLoad>
  </div>
</template>
<script>
let query = "/api/CNC/GetMaintainList";
let del = "/api/CNC/DeleteMaintain?";
import leftNav from "../common/leftNav.vue";
import upLoad from "../common/UpLoad.vue";
import addDigo from "./MaintenanceAdd.vue";
import upDigo from "./MaintenanceUpdate.vue";
import detailDigo from "./MaintenanceDetails.vue";
import Header from "../common/Header.vue";
export default {
  components: { leftNav, Header, addDigo, upDigo, detailDigo, upLoad },
  data() {
    return {
      visible: false,
      show: false,
      updata: {},
      flag: false,
      detail: false,
      dflag: false,
      datailData: {},
      upShow: false,
      type: 3,
      tableData: [],
      tableHeight: "",
      pageSize: 10,
      pageNo: 1,
      total: 0,
      title: "设备维保计划",
    };
  },
  created() {
    this.getTableHeight();
    this.getdata();
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
  methods: {
    add() {
      this.visible = true;
    },
    //
    handleSizeChange(val) {
      this.pageSize = val;
      this.getdata();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getdata();
    },
    getdata() {
      this.tableData = [];
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
                item.CreateTime = this.$utils.Timeconversion(item.CreateTime);
                item.UpdateTime = this.$utils.Timeconversion(item.UpdateTime);
              });
              this.total = res.data.data.total;
              this.tableData = data;
            }
          } else {
            return false;
          }
        });
    },
    handleEdit(row) {
      this.updata = row;
      this.show = true;
      this.flag = true;
    },
    handleDetail(row) {
      this.datailData = row;
      this.detail = true;
      this.dflag = true;
    },
    getTableHeight() {
      let tableH = 150; //距离页面下方的高度
      let tableHeightDetil = window.innerHeight - tableH;
      if (tableHeightDetil <= 300) {
        this.tableHeight = 300;
      } else {
        this.tableHeight = window.innerHeight - tableH;
      }
    },
    //删除
    handleDelete(row) {
      this.$axios.get(this.$api + del + "id=" + row.Id).then((res) => {
        if (res.data.state === 1) {
          this.$message.success(res.data.message);
        } else {
          this.$message(res.data.message);
        }
        this.getdata();
      });
    },
    upLoad() {
      this.upShow = true;
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
