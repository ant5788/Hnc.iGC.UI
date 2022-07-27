<template>
  <div>
    <el-dialog
      title="详情"
      :visible="detail"
      :modal-append-to-body="false"
      :before-close="onClose"
    >
      <el-form :model="form" :rules="rules" ref="form" class="form_box">
        <el-form-item label="设备名称" prop="DeviceName">
          <el-input
            v-model="form.DeviceName"
            class="input_box"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="DeviceType">
          <el-input
            v-model="form.DeviceType"
            class="input_box"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="设备编码" prop="DerviceNumber">
          <el-input
            v-model="form.DerviceNumber"
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
        <el-form-item label="档案编号" prop="archivesNumber">
          <el-input
            v-model="form.archivesNumber"
            class="input_box"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
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
        DeviceType: "",
        DerviceNumber: "",
        AssetNumber: "",
        archivesNumber: "",
      },
      rules: {
        DeviceName: [
          { required: true, message: "请输入设备名称", trigger: "blur" },
        ],
        DeviceType: [
          { required: true, message: "请输入设备类型", trigger: "blur" },
        ],
        DerviceNumber: [
          { required: true, message: "请输入设备编码", trigger: "blur" },
        ],
        AssetNumber: [
          { required: true, message: "请输入资产编号", trigger: "blur" },
        ],
        archivesNumber: [
          { required: true, message: "请输入档案编号", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.form = this.data;
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
