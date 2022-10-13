<template>
  <div class="Upload_box">
    <input
      type="file"
      name="file"
      id="file"
      class="inputfile"
      @change="changeFile"
    />
    <div class="table_box">
      <el-table
        :data="tableData"
        :header-cell-style="{ background: '#071225', color: '#fff' }"
      >
        <el-table-column prop="" label="设备名称"></el-table-column>
        <el-table-column prop="" label="设备操作人员"></el-table-column>
        <el-table-column prop="" label="人员装夹总工时"></el-table-column>
        <el-table-column prop="" label="任务总工时"></el-table-column>
        <el-table-column prop="" label="设备排产负荷"></el-table-column>
        <el-table-column prop="" label="完成工时"></el-table-column>
        <el-table-column prop="" label="完成效率"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {},
  created() {
    this.getTableHeight();
  },
  methods: {
    changeFile() {},
  },
};
</script>
<style scoped lang="scss">
.Upload_box {
  color: #fff;
}
.inputfile {
  font-size: 16px;
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
