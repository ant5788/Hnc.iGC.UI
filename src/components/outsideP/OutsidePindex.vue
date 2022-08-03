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
        <el-table-column
          prop="OutsourceDate"
          label="委外日期"
        ></el-table-column>
        <el-table-column prop="ReturnDate" label="返回日期"></el-table-column>
        <el-table-column
          prop="ProcessingNumber"
          label="加工数量"
        ></el-table-column>
        <el-table-column
          prop="ProcessingComponents"
          label="加工零件"
        ></el-table-column>
        <el-table-column
          prop="ProcessoinQuality"
          label="加工质量"
        ></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="updateTime" label="修改时间"></el-table-column>
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
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
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
let query = "";
import leftNav from "../common/leftNav.vue";
import addOutside from "./OutsidePAdd.vue";
import updataOutside from "./OutsidePUpdata.vue";
import detailsOutside from "./OutsidePDetails.vue";
export default {
  components: { leftNav, addOutside, updataOutside, detailsOutside },
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
          Id: "LBDDOTB1HHKFPO78CEC6Q6NLOEII38IT",
          OutsourceDate: "2022-05-17T00:00:00",
          ReturnDate: "2022-05-17T00:00:00",
          ProcessingNumber: 12,
          ProcessingComponents: "test111",
          ProcessoinQuality: "test111",
          CreateTime: "2022-07-19T09:32:53",
          UpdateTime: "2022-07-19T09:32:53",
        },
      ],
    };
  },
  methods: {
    query() {
      this.$axios.get(this.$api + query).then((res) => {
        if (res.data.state === 1) {
          let data = res.data.data;
          if (data != null && data.length > 0) {
            data.forEach((item) => {
              item.OutsourceDate = this.$utils.Timeconversion(
                item.OutsourceDate
              );
              item.ReturnDate = this.$utils.Timeconversion(item.ReturnDate);
              item.createTime = this.$utils.Timeconversion(item.createTime);
              item.updateTime = this.$utils.Timeconversion(item.updateTime);
            });
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
    handleSizeChange() {},
    handleCurrentChange() {},
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
