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
let query = "/api/CNC/GetMaintainList";
let del = "/api/CNC/DeleteMaintain?";
import leftNav from "../common/leftNav.vue";
import addDigo from "./MaintenanceAdd.vue";
import upDigo from "./MaintenanceUpdate.vue";
import detailDigo from "./MaintenanceDetails.vue";
export default {
  components: { leftNav, addDigo, upDigo, detailDigo },
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
          Id: "1D8UXQNJ2OT3XR52MUOAO07MX2CNNLP7",
          DeviceNumber: "123",
          DeviceName: "123",
          DeviceModel: "123",
          DeviceType: "123",
          DeviceState: "123",
          Content: "设备正常h",
          Cycle: "6",
          DeviceClassification: "7",
          PersonLiable: "8",
          UserDep: "9",
          CreateTime: "2022-07-14T16:42:16",
          UpdateTime: "2022-07-14T16:42:16",
        },
      ],
    };
  },
  created() {
    //this.getdata();
  },
  methods: {
    add() {
      this.visible = true;
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    getdata() {
      this.$axios.get(this.$api + query).then((res) => {
        console.log(res);
        if (res.data.state === 1) {
          let data = res.data.data;
          if (data.length > 0) {
            data.forEach((item) => {
              item.CreateTime = this.$utils.Timeconversion(item.CreateTime);
              item.UpdateTime = this.$utils.Timeconversion(item.UpdateTime);
            });
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
