<template>
  <div>
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
        <el-table-column label="编号" prop="Number"></el-table-column>
        <el-table-column label="名称" prop="Name"></el-table-column>
        <el-table-column label="时间" prop="Date"></el-table-column>
        <el-table-column
          label="上料道数量"
          prop="FeedingNumber"
        ></el-table-column>
        <el-table-column
          label="废料道数量"
          prop="WasteNumber"
        ></el-table-column>
        <el-table-column label="合格率" prop="Pass_Rate"></el-table-column>
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
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
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
export default {
  components: { leftNav, PassRateAdd, PassRateUpdata, PassRateDetails },
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
      tableData: [
        {
          Id: "P7KS63K5UCL1V2R6IDX9M0RTU8QN30WI",
          Number: "test001",
          Name: "test",
          Date: "2022-07-15T10:51:02",
          FeedingNumber: 2,
          WasteNumber: 1,
          Pass_Rate: "sasdfasdf",
          CreateTime: "2022-07-15T10:51:02",
          UpdateTime: "2022-07-15T10:51:02",
        },
      ],
    };
  },
  methods: {
    query() {
      this.$axios.get(this.$api + query).then((res) => {
        if (res.data.state === 1) {
          this.tableData = res.data.data;
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
    handleSizeChange() {},
    handleCurrentChange() {},
    handleDelete(row) {
      this.$axios.get(this.$api + del + "id=" + row.Id).then((res) => {
        if (res.data.state === 1) {
          this.$message.success(res.data.message);
        } else {
          this.$message(res.data.message);
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
.text {
  font-size: 18px;
}
</style>
