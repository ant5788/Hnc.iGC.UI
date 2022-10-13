<template>
  <div>
    <Header :title="title"></Header>
    <div class="left fl">
      <leftNav></leftNav>
    </div>
    <div class="con fl">
      <el-button type="primary" @click="add">新增</el-button>
      <el-table
        :data="tableData"
        :header-cell-style="{ background: '#071225', color: '#fff' }"
        :show-overflow-tooltip="true"
        :height="tableHeight"
      >
        <el-table-column label="ERP指令单号" prop="OrderNo"></el-table-column>
        <el-table-column label="零件订单号" prop="PartOrder"></el-table-column>
        <el-table-column label="部件名称" prop="PartName"></el-table-column>
        <el-table-column
          label="检验数量"
          prop="InspectionQuantity"
        ></el-table-column>
        <el-table-column
          label="不合格数量"
          prop="UnqualifiedQuantity"
        ></el-table-column>
        <el-table-column
          label="不合格问题描述"
          prop="Problem"
        ></el-table-column>
        <el-table-column label="工序" prop="WorkingProcedure"></el-table-column>
        <el-table-column label="原因分类1级" prop="Cause1"></el-table-column>
        <el-table-column label="原因分类2级" prop="Cause2"></el-table-column>
        <el-table-column label="责任人" prop="PersonLiable"></el-table-column>
        <el-table-column label="解决措施" prop="Solutions"></el-table-column>
        <el-table-column
          label="检验日期"
          prop="InspectionDate"
        ></el-table-column>
        <el-table-column label="检验员" prop="Inspector"></el-table-column>
        <el-table-column label="备注" prop="remarks"></el-table-column>

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
      <PassRateAdd :visible.sync="visible"></PassRateAdd>
      <PassRateUpdata
        :show.sync="show"
        :data="updata"
        v-if="flag"
      ></PassRateUpdata>
      <PassRateDetails
        :detail.sync="detail"
        :data="datailData"
        v-if="dflag"
      ></PassRateDetails>
    </div>
  </div>
</template>
<script>
let query = "/api/CNC/PassRateAnalysis";
let del = "/api/CNC/DeletePassRateById?";
import leftNav from "../common/leftNav.vue";
import PassRateAdd from "./PassRateAdd.vue";
import PassRateUpdata from "./PassRateUpdata.vue";
import PassRateDetails from "./PassRateDetails.vue";
import Header from "../common/Header.vue";
export default {
  components: { leftNav, Header, PassRateAdd, PassRateUpdata, PassRateDetails },
  data() {
    return {
      visible: false,
      show: false,
      updata: {},
      flag: false,
      detail: false,
      dflag: false,
      datailData: {},
      tableData: [],
      tableHeight: "",
      pageSize: 10,
      pageNo: 1,
      total: 0,
      title: "合格率统计分析",
    };
  },
  created() {
    this.getTableHeight();
    this.query();
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
    query() {
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
                item.InspectionDate = this.$utils.Timeconversion(item.InspectionDate);
              });
              this.total = res.data.data.total;
              this.tableData = data;
            }
          }
        });
    },
    add() {
      this.visible = true;
    },
    handleEdit(row) {
      console.log(row);
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
    handleSizeChange(val) {
      this.pageSize = val;
      this.query();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.query();
    },
    handleDelete(row) {
      this.$axios.get(this.$api + del + "id=" + row.Id).then((res) => {
        if (res.data.state === 1) {
          this.$message.success(res.data.message);
        } else {
          this.$message(res.data.message);
        }
        this.query();
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
.text {
  font-size: 18px;
}
</style>
