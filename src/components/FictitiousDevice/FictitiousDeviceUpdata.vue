<template>
  <div>
    <el-dialog
      title="修改"
      :visible="show"
      :modal-append-to-body="false"
      :before-close="onClose"
    >
      <el-form :model="form" :rules="rules" ref="form" class="form_box">
        <el-form-item label="设备图片" prop="DevicePhoto">
          <input
            type="file"
            id="upImageFile"
            @change="ImageToBase64"
            v-show="showUp"
          />
          <img :src="url" v-show="!showUp" class="img" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changeImg" v-show="!showUp"
            >修改图片</el-button
          >
        </el-form-item>
        <el-form-item label="设备名称" prop="DeviceName">
          <el-input v-model="form.DeviceName" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="DeviceType">
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
let updata = "/api/CNC/UpdateDeviceDetail";
let upLoad = "/api/CNC/UploadImg";
let imgquery = "/api/CNC/ShowImg?";
export default {
  props: {
    show: {
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
      showUp: false,
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
    this.form = {};
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
    changeImg() {
      this.showUp = true;
    },
    ImageToBase64() {
      let files = document.getElementById("upImageFile").files[0];
      console.log(files);
      var reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = () => {
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
      delete this.form.CreateTime;
      delete this.form.UpdateTime;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post(this.$api + updata, this.form).then((res) => {
            if (res.data.state === 1) {
              this.$message.success(res.data.message);
              this.$emit("update:show", false);
              this.$parent.getdata();
            } else {
              this.$message(res.data.message);
            }
          });
        } else {
          console.log("error submit!!");
          this.$emit("update:show", false);
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onClose() {
      this.$emit("update:show", false);
      console.log(this.data);
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
.btns {
  text-align: center;
}
.img {
  width: 200px;
}
</style>
