<template>
  <div class="main">
    <Header :title="title"></Header>
    <div class="left fl">
      <leftNav></leftNav>
    </div>
    <div class="con fl">
      <el-table
        :data="tableData"
        :height="tableHeight"
        :header-cell-style="{ background: '#071225', color: '#fff' }"
      >
        <el-table-column prop="DeviceName" label="设备名称"></el-table-column>
        <el-table-column prop="AlarmNumber" label="报警编号"></el-table-column>
        <el-table-column prop="AlarmMessage" label="报警内容"></el-table-column>
        <el-table-column prop="StartAt" label="报警开始时间"></el-table-column>
        <el-table-column prop="EndAt" label="报警结束时间"></el-table-column>
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
  </div>
</template>
<script>
import Header from "../common/Header.vue";
import leftNav from "../common/leftNav.vue";
let query = "/api/CNC/GetAlarmList";
export default {
  components: { leftNav, Header },
  data() {
    return {
      visible: false,
      upShow: false,
      tableData: [],
      title: "报警记录及统计",
      tableHeight: "",
      pageSize: 10,
      pageNo: 1,
      total: 0,
      show: false,
      updata: {},
      detail: false,
      dflag: false,
      datailData: {},
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
    this.getdata();
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
    handleSizeChange(val) {
      this.pageSize = val;
      this.getdata();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getdata();
    },
    getdata() {
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
              });
            }
            this.total = res.data.data.total;
            this.tableData = data;
          }
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
