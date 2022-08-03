<template>
  <div>
    <el-dialog
      title="修改"
      :visible="show"
      :modal-append-to-body="false"
      :before-close="onClose"
    >
      <el-form :model="form" :rules="rules" ref="form" class="form_box">
        <el-form-item label="委外日期" prop="OutsourceDate">
          <el-date-picker
            v-model="form.OutsourceDate"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            class="input_box"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="返回日期" prop="ReturnDate">
          <el-date-picker
            v-model="form.ReturnDate"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            class="input_box"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="加工数量" prop="ProcessingNumber">
          <el-input
            v-model="form.ProcessingNumber"
            class="input_box"
          ></el-input>
        </el-form-item>
        <el-form-item label="加工零件" prop="ProcessingComponents">
          <el-input
            v-model="form.ProcessingComponents"
            class="input_box"
          ></el-input>
        </el-form-item>
        <el-form-item label="加工质量" prop="ProcessoinQuality">
          <el-input
            v-model="form.ProcessoinQuality"
            class="input_box"
          ></el-input>
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
let updata = "/api/CNC/UpdateOutsourcing";
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
      form: {
        OutsourceDate: "",
        ReturnDate: "",
        ProcessingNumber: "",
        ProcessingComponents: "",
        ProcessoinQuality: "",
      },
      rules: {
        OutsourceDate: [
          { required: true, message: "请选择委外日期", trigger: "blur" },
        ],
        ReturnDate: [
          { required: true, message: "请选择返回日期", trigger: "blur" },
        ],
        ProcessingNumber: [
          { required: true, message: "请输入加工数量", trigger: "blur" },
        ],
        ProcessingComponents: [
          { required: true, message: "请输入加工零件", trigger: "blur" },
        ],
        ProcessoinQuality: [
          { required: true, message: "请输入加工质量", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.form = this.data;
  },
  methods: {
    submitForm(formName) {
      console.log(this.form);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post(this.$api + updata, this.form).then((res) => {
            if (res.data.state === 1) {
              this.$message.success(res.data.message);
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
</style>
