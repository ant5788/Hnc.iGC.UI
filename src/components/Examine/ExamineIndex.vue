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
        <el-table-column prop="DeviceName" label="设备名称"></el-table-column>
        <el-table-column prop="DeviceNumber" label="设备编号"></el-table-column>
        <el-table-column prop="DeviceModel" label="设备型号"></el-table-column>
        <el-table-column
          prop="SpareParts"
          label="零部件是否齐全"
        ></el-table-column>
        <el-table-column prop="Liquid" label="液压"></el-table-column>
        <el-table-column prop="Pressure" label="气压"></el-table-column>
        <el-table-column prop="Handle" label="各操作手柄"></el-table-column>
        <el-table-column
          prop="SafetyDevices"
          label="安全装置"
        ></el-table-column>
        <el-table-column
          prop="InstrumentPressure"
          label="各仪表指示压力"
        ></el-table-column>
        <el-table-column
          prop="FanScreen"
          label="各散热风扇及滤网"
        ></el-table-column>
        <el-table-column
          prop="DriveMotor"
          label="各部驱动电机"
        ></el-table-column>
        <el-table-column
          prop="LeakageOilGasWater"
          label="漏水"
        ></el-table-column>
        <el-table-column
          prop="PrincipalAxis"
          label="主轴及回转传动机构"
        ></el-table-column>
        <el-table-column prop="Appearance" label="机床外表"></el-table-column>
        <el-table-column
          prop="ElectricalPart"
          label="电器部分"
        ></el-table-column>

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
    <UpDigo :show.sync="show" :data="updata" v-if="flag"></UpDigo>
    <detailsDigo :detail.sync="detail" :data="datailData" v-if="dflag">
    </detailsDigo>
    <upLoad :upShow.sync="upShow" :type="type"></upLoad>
  </div>
</template>
<script>
let query = "/api/CNC/GetCheckPointList";
let del = "/api/CNC/DeleteCheckPoint?";
import leftNav from "../common/leftNav.vue";
import upLoad from "../common/UpLoad.vue";
import addDigo from "./ExamineAdd";
import UpDigo from "./ExamineUpdata.vue";
import detailsDigo from "./ExamineDetails.vue";
import Header from "../common/Header.vue";
export default {
  components: { leftNav, Header, addDigo, UpDigo, detailsDigo, upLoad },
  data() {
    return {
      tableData: [],
      visible: false,
      show: false,
      updata: {},
      flag: false,
      detail: false,
      dflag: false,
      datailData: {},
      upShow: false,
      type: 2,
      tableHeight: "",
      pageSize: 10,
      pageNo: 1,
      total: 0,
      title: "设备点检情况",
      stateData: {
        0: "检点未完成",
        1: "检点中",
        2: "检点完成",
      },
      typeData: {
        0: "类型",
        1: "类型1",
        2: "类型2",
      },
    };
  },
  created() {
    this.getTableHeight();
    this.queryData();
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
    queryData() {
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
                item.StartTime = this.$utils.Timeconversion(item.StartTime);
                item.EndTime = this.$utils.Timeconversion(item.EndTime);
                item.StateName = this.stateData[item.State];
                item.TypeName = this.typeData[item.Type];
              });
              this.total = res.data.data.total;
              this.tableData = data;
            }
          } else {
            return false;
          }
        });
    },
    add() {
      this.visible = true;
    },
    handleEdit(row) {
      this.updata = row;
      this.show = true;
      this.flag = true;
    },
    //删除
    handleDelete(row) {
      this.$axios.get(this.$api + del + "id=" + row.Id).then((res) => {
        if (res.data.state === 1) {
          this.$message.success(res.data.message);
        } else {
          this.$message(res.data.message);
        }
        this.queryData();
      });
    },
    handleDetail(row) {
      this.datailData = row;
      this.detail = true;
      this.dflag = true;
    },
    upLoad() {
      this.upShow = true;
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
    handleSizeChange(val) {
      this.pageSize = val;
      this.queryData();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.queryData();
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
.text {
  font-size: 18px;
}
</style>
