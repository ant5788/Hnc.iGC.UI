<template>
  <div class="main">
    <div class="left fl">
      <leftNav></leftNav>
    </div>
    <div class="con fl">
      <el-table
        :data="tableData"
        :header-cell-style="{ background: '#071225', color: '#fff' }"
      >
        <el-table-column prop="name" label="设备名称"></el-table-column>
        <el-table-column prop="number" label="设备编号"></el-table-column>
        <el-table-column prop="status" label="设备状态"></el-table-column>
        <el-table-column label="操作">
          <el-button
            @click="handleEdit(scope.$index, scope.row)"
            type="primary"
          >
            修改</el-button
          >
          <el-button
            @click="handleDelete(scope.$index, scope.row)"
            type="warning"
          >
            删除</el-button
          >
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
  </div>
</template>
<script>
import leftNav from "../common/leftNav.vue";
export default {
  components: { leftNav },
  data() {
    return {
      tableData: [
        {
          name: "设备一",
          number: 123,
          status: "运行",
        },
      ],
      currentPage4: 4,
    };
  },
  methods: {
    //编辑
    handleEdit() {},
    //删除
    handleDelete() {},
    //
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
