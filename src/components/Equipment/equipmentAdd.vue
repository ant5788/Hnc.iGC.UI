<template>
  <div>
    <el-dialog
      title="新增"
      :visible="visible"
      :modal-append-to-body="false"
      :before-close="onClose"
    >
      <el-form :model="form" :rules="rules" ref="form" class="form_box">
        <el-form-item label="设备名称" prop="DeviceName">
          <el-input v-model="form.DeviceName" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="DeviceType">
          <el-input v-model="form.DeviceType" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="设备编码" prop="DerviceNumber">
          <el-input v-model="form.DerviceNumber" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="资产编号" prop="AssetNumber">
          <el-input v-model="form.AssetNumber" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="档案编号" prop="archivesNumber">
          <el-input v-model="form.archivesNumber" class="input_box"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="btns">
            <el-button type="primary" @click="submitForm('form')"
              >提交</el-button
            >
            <el-button @click="resetForm('form')">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
let add = "/api/CNC/AddArchives";
export default {
  props: {
    visible: {
      type: Boolean,
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
    console.log(this.visible);
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post(this.$api + add, this.form).then((res) => {
            if (res.data.state === 1) {
              this.$message({
                showClose: true,
                message: res.data.message,
                type: "success",
              });
              this.$emit("update:visible", false);
              this.$parent.getdata();
              this.$refs[formName].resetFields();
            } else {
              this.$message(res.data.message);
            }
          });
        } else {
          console.log("error submit!!");

          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onClose() {
      this.$emit("update:visible", false);
      console.log(this.visible);
    },
  },
};
</script>
<style lang="scss" scoped>
.form_box {
  padding: 0 230px;
}
/deep/.el-form-item__label {
  font-size: 18px;
}
.input_box {
  width: 400px;
}
.btns {
  text-align: center;
}
</style>
