<template>
  <div>
    <div>
      <el-dialog
        title="详情"
        :visible="detail"
        :modal-append-to-body="false"
        :before-close="onClose"
      >
        <el-form
          :model="form"
          :rules="rules"
          ref="form"
          class="form_box"
          label-width="150px"
        >
          <el-form-item label="设备名称" prop="DeviceName">
            <el-input
              v-model="form.DeviceName"
              class="input_box"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="设备编号" prop="DeviceNumber">
            <el-input
              v-model="form.DeviceNumber"
              class="input_box"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="资产编号" prop="AssetNumber">
            <el-input
              v-model="form.AssetNumber"
              class="input_box"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="Type">
            <el-input v-model="form.Type" class="input_box" disabled></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="State">
            <el-input
              v-model="form.State"
              class="input_box"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="开始时间" prop="StartTime">
            <el-date-picker
              v-model="form.StartTime"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              disabled
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="EndTime">
            <el-date-picker
              v-model="form.EndTime"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              disabled
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="检点详细信息" prop="Details">
            <el-input
              type="textarea"
              row="2"
              v-model="form.Details"
              class="input_box"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="检点人员" prop="Inspector">
            <el-input
              type="textarea"
              row="2"
              v-model="form.Inspector"
              class="input_box"
              disabled
            ></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    detail: {
      type: Boolean,
      require: true,
    },
    data: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      form: {
        DeviceName: "",
        DeviceNumber: "",
        AssetNumber: "",
        Type: "",
        State: "",
        StartTime: "",
        EndTime: "",
        Details: "",
        Inspector: "",
      },
      rules: {
        DeviceName: [
          { required: true, message: "请输入设备名称", trigger: "blur" },
        ],
        DeviceNumber: [
          { required: true, message: "请输入设备编号", trigger: "blur" },
        ],
        AssetNumber: [
          {
            required: true,
            message: "请输入资产编号",
            trigger: "blur",
          },
        ],
        Type: [{ required: true, message: "请输入类型", trigger: "blur" }],
        State: [{ required: true, message: "请输入状态", trigger: "blur" }],
        StartTime: [
          { required: true, message: "请选择开始时间", trigger: "blur" },
        ],
        EndTime: [
          { required: true, message: "请选择结束时间", trigger: "blur" },
        ],
        Details: [
          { required: true, message: " 请输入检查详细信息", trigger: "blur" },
        ],
        Inspector: [
          { required: true, message: "请输入检点人员", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.form = this.data;
  },
  watch: {
    data() {
      this.form = this.data;
    },
  },
  methods: {
    onClose() {
      this.$emit("update:detail", false);
      console.log(this.datailData);
    },
  },
};
</script>
<style scoped lang="scss">
.form_box {
  padding: 0 230px;
}
/deep/.el-form-item__label {
  font-size: 18px;
}
.input_box {
  width: 400px;
}
</style>
