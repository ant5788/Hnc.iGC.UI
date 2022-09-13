<template>
  <div>
    <el-dialog
      title="详情"
      :visible="detail"
      :modal-append-to-body="false"
      :before-close="onClose"
    >
      <el-form :model="form" :rules="rules" ref="form" class="form_box">
        <el-form-item label="设备图片" prop="DevicePhoto">
          <img :src="url" class="img" />
        </el-form-item>
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
        <el-form-item label="设备编码" prop="DeviceNumber">
          <el-input
            v-model="form.DeviceNumber"
            class="input_box"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="资产编号" prop="AssetsNumber">
          <el-input
            v-model="form.AssetsNumber"
            class="input_box"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
let imgquery = "/api/CNC/ShowImg?";
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
      url: "",
      form: {
        DeviceName: "",
        DeviceType: "",
        DeviceNumber: "",
        AssetsNumber: "",
        DevicePhoto: "",
      },
      rules: {
        DeviceName: [
          { required: true, message: "请输入设备名称", trigger: "blur" },
        ],
        DeviceType: [
          { required: true, message: "请输入设备类型", trigger: "blur" },
        ],
        DeviceNumber: [
          { required: true, message: "请输入设备编码", trigger: "blur" },
        ],
        AssetsNumber: [
          { required: true, message: "请输入资产编号", trigger: "blur" },
        ],
        DevicePhoto: [
          { required: true, message: "请上传图片", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.form = this.data;
    this.getimg();
  },
  watch: {
    data() {
      this.form = this.data;
      this.getimg();
    },
  },
  methods: {
    getimg() {
      this.$axios
        .get(this.$api + imgquery + "guid=" + this.form.DevicePhoto)
        .then((res) => {
          console.log(res);
          this.url = res.data.data;
        });
    },
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
.img {
  width: 200px;
}
</style>
