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
      >
        <el-table-column prop="DeviceName" label="设备名称"></el-table-column>
        <el-table-column prop="DeviceType" label="设备类型"></el-table-column>
        <el-table-column
          prop="DerviceNumber"
          label="设备编号"
        ></el-table-column>
        <el-table-column prop="AssetNumber" label="资产编号"></el-table-column>
        <el-table-column prop="CreateTime" label="创建时间"></el-table-column>
        <el-table-column prop="UpdateTime" label="修改时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="primary">
              修改</el-button
            >
            <el-button @click="handleDelete(scope.row)" type="warning">
              删除</el-button
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
  </div>
</template>
<script>
let query = "/api/CNC/GetArchivesList"; //查询接口
let del = "/api/CNC/DeleteArchives?";
import leftNav from "../common/leftNav.vue";
import addDigo from "./equipmentAdd.vue";
import upDigo from "./equipmentUpdate.vue";
export default {
  components: { leftNav, addDigo, upDigo },
  data() {
    return {
      tableData: [
        {
          Id: "8UHYPKUJ3CGQ1RTX6DOUBBRV9KBQMF93",
          DeviceName: "ces",
          DeviceType: "ji",
          DerviceNumber: "12",
          AssetNumber: "13",
          archivesNumber: "rrrr",
          CreateTime: "2022-07-14T15:48:29",
          UpdateTime: "2022-07-14T15:48:29",
        },
      ],
      currentPage4: 4,
      visible: false,
      show: false,
      updata: {},
      flag: false,
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    //获取数据
    getdata() {
      this.tableData = [];
      this.$axios.get(this.$api + query).then((res) => {
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
    //编辑
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
    //
    handleSizeChange() {},
    handleCurrentChange() {},
    //新增
    add() {
      this.visible = true;
      console.log(this.visible);
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
