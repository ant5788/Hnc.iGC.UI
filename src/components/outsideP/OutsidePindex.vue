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
      >
        <el-table-column
          prop="OutsourcingOrder"
          label="委外订单"
        ></el-table-column>
        <el-table-column prop="Supplier" label="供应商"></el-table-column>
        <el-table-column prop="ItemNumber" label="物料编码"></el-table-column>
        <el-table-column
          prop="ItemDescription"
          label="物料描述"
        ></el-table-column>
        <el-table-column prop="Number" label="数量"></el-table-column>
        <el-table-column
          prop="ReceivedQuantity"
          label="已入库数量"
        ></el-table-column>
        <el-table-column
          prop="QualifiedQuantity"
          label="合格数量"
        ></el-table-column>
        <el-table-column
          prop="ToBeInspected"
          label="待检数量"
        ></el-table-column>
        <el-table-column
          prop="OutsourcingTime"
          label="委外申请创建日期"
        ></el-table-column>
        <el-table-column
          prop="ActualRequiredDate"
          label="实际要求到货日期"
        ></el-table-column>
        <el-table-column
          prop="ContractSigningDate"
          label="合同签订日期"
        ></el-table-column>
        <el-table-column
          prop="ContractArrivalDate"
          label="合同要求到货日期"
        ></el-table-column>
        <el-table-column
          prop="DeliveryTime"
          label="委外出库时间"
        ></el-table-column>
        <el-table-column
          prop="EarlyWarning"
          label="提前预警时间"
        ></el-table-column>
        <el-table-column
          prop="ActualArrivalDate"
          label="实际到货日期"
        ></el-table-column>
        <el-table-column
          prop="ProcurementTeam"
          label="采购组"
        ></el-table-column>
        <el-table-column prop="Remarks" label="备注"></el-table-column>
        <el-table-column width="250" label="操作">
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
      <addOutside :visible.sync="visible"></addOutside>
      <updataOutside
        :show.sync="show"
        :data="updata"
        v-if="flag"
      ></updataOutside>
      <detailsOutside
        :detail.sync="detail"
        :data="datailData"
        v-if="dflag"
      ></detailsOutside>
    </div>
  </div>
</template>
<script>
let del = "/api/CNC/DeleteOutsourcing?";
let query = "/api/CNC/GetOutsourcingList";
import leftNav from "../common/leftNav.vue";
import addOutside from "./OutsidePAdd.vue";
import updataOutside from "./OutsidePUpdata.vue";
import detailsOutside from "./OutsidePDetails.vue";
import Header from "../common/Header.vue";
export default {
  components: { leftNav, Header, addOutside, updataOutside, detailsOutside },
  data() {
    return {
      currentPage4: 4,
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
      title: "外协加工进度",
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
    this.query();
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
            if (data != null && data.length > 0) {
              data.forEach((item) => {
                //时间格式化处理
                item.OutsourceDate = this.$utils.Timeconversion(
                  item.OutsourceDate
                );
                item.OutsourcingTime = this.$utils.Timeconversion(
                  item.OutsourcingTime
                );
                item.ActualRequiredDate = this.$utils.Timeconversion(
                  item.ActualRequiredDate
                );
                item.ContractSigningDate = this.$utils.Timeconversion(
                  item.ContractSigningDate
                );
                item.ContractArrivalDate = this.$utils.Timeconversion(
                  item.ContractArrivalDate
                );
                item.DeliveryTime = this.$utils.Timeconversion(
                  item.DeliveryTime
                );
                item.ActualArrivalDate = this.$utils.Timeconversion(
                  item.ActualArrivalDate
                );
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
      this.updata = row;
      this.show = true;
      this.flag = true;
    },
    handleDelete(row) {
      this.$axios.get(this.$api + del + "id=" + row.Id).then((res) => {
        if (res.data.state === 1) {
          this.$message.success(res.data.message);
          this.query();
        } else {
          this.$message(res.data.message);
        }
      });
    },
    handleDetail(row) {
      this.datailData = row;
      this.detail = true;
      this.dflag = true;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.query();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.query();
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
