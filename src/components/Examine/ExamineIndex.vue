<template>
  <div class="main">
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
        <el-table-column prop="DeviceName" label="设备名称"></el-table-column>
        <el-table-column prop="DeviceNumber" label="设备编号"></el-table-column>
        <el-table-column prop="AssetNumber" label="资产编号"></el-table-column>
        <el-table-column prop="Type" label="类型"></el-table-column>
        <el-table-column prop="State" label="状态"></el-table-column>
        <el-table-column prop="StartTime" label="开始时间"></el-table-column>
        <el-table-column prop="EndTime" label="结束时间"></el-table-column>
        <el-table-column
          prop="Details"
          label="检点详细信息"
          width="180"
        ></el-table-column>
        <el-table-column prop="Inspector" label="检点人员"></el-table-column>
        <el-table-column prop="CreateTime" label="创建时间"></el-table-column>
        <el-table-column prop="UpdateTime" label="修改时间"></el-table-column>
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
    </div>
    <addDigo :visible.sync="visible"></addDigo>
    <UpDigo :show.sync="show" :data="updata" v-if="flag"></UpDigo>
    <detailsDigo
      :detail.sync="detail"
      :data="datailData"
      v-if="dflag"
    ></detailsDigo>
  </div>
</template>
<script>
let query = "/api/CNC/GetCheckPointList";
let del = "/api/CNC/DeleteCheckPoint?";
import leftNav from "../common/leftNav.vue";
import addDigo from "./ExamineAdd";
import UpDigo from "./ExamineUpdata.vue";
import detailsDigo from "./ExamineDetails.vue";
export default {
  components: { leftNav, addDigo, UpDigo, detailsDigo },
  data() {
    return {
      tableData: [
        {
          Id: "0A5T0GGFEA4KH60SL6FINMWSOSWLDKCU",
          DeviceName: "AAAccc",
          DeviceNumber: "AAAAA",
          AssetNumber: "AAAAA",
          Type: 2,
          State: 4,
          StartTime: "2022-07-17T00:00:00",
          EndTime: "2022-07-17T00:00:00",
          Details: "QQQQQ",
          Inspector: "CCCCC",
          CreateTime: "0001-01-01T00:00:00",
          UpdateTime: "0001-01-01T00:00:00",
        },
      ],
      visible: false,
      show: false,
      updata: {},
      flag: false,
      detail: false,
      dflag: false,
      datailData: {},
    };
  },
  methods: {
    queryData() {
      this.$axios.get(this.$api + query).then((res) => {
        if (res.data.state === 1) {
          let data = res.data.data;
          if (data.length > 0) {
            data.forEach((item) => {
              item.CreateTime = this.$utils.Timeconversion(item.CreateTime);
              item.UpdateTime = this.$utils.Timeconversion(item.UpdateTime);
              item.StartTime = this.$utils.Timeconversion(item.StartTime);
              item.EndTime = this.$utils.Timeconversion(item.EndTime);
            });
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
      });
    },
    handleDetail(row) {
      this.datailData = row;
      this.detail = true;
      this.dflag = true;
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
