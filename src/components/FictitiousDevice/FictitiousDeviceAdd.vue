<template>
  <div>
    <el-dialog
      title="新增"
      :visible="visible"
      :modal-append-to-body="false"
      :before-close="onClose"
    >
      <el-form :model="form" :rules="rules" ref="form" class="form_box">
        <el-form-item label="设备图片" prop="DevicePhoto">
          <input type="file" id="upImageFile" @change="ImageToBase64" />
        </el-form-item>
        <el-form-item label="设备名称" prop="DeviceName">
          <el-input v-model="form.DeviceName" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="设备型号" prop="DeviceType">
          <el-input v-model="form.DeviceType" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="设备编码" prop="DeviceNumber">
          <el-input v-model="form.DeviceNumber" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="资产编号" prop="AssetsNumber">
          <el-input v-model="form.AssetsNumber" class="input_box"></el-input>
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
let add = "/api/CNC/AddDeviceDetail";
let upLoad = "/api/CNC/UploadImg";
export default {
  props: {
    visible: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {
      iconBase64: "",
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
    console.log(this.visible);
  },
  methods: {
    ImageToBase64() {
      let files = document.getElementById("upImageFile").files[0];
      var reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = () => {
        console.log("file 转 base64结果：" + reader.result);
        this.iconBase64 = reader.result;
        let fileData = {
          type: "image",
          filename: files.name,
          Base64String: this.iconBase64,
        };

        this.$axios.post(this.$api + upLoad, fileData).then((res) => {
          console.log(res);
          this.form.DevicePhoto = res.data.data;
        });
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    },
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
