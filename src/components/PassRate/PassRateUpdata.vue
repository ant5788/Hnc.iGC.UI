<template>
  <div>
    <el-dialog
      title="修改"
      :visible="show"
      :modal-append-to-body="false"
      :before-close="onClose"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        class="form_box"
        label-width="180px"
      >
        <el-form-item label="编号" prop="Number">
          <el-input v-model="form.Number" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="Name">
          <el-input v-model="form.Name" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="Date">
          <el-date-picker
            v-model="form.Date"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            class="input_box"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上料道数量" prop="FeedingNumber">
          <el-input
            v-model.number="form.FeedingNumber"
            class="input_box"
          ></el-input>
        </el-form-item>
        <el-form-item label="废料道数量" prop="WasteNumber">
          <el-input
            v-model.number="form.WasteNumber"
            class="input_box"
          ></el-input>
        </el-form-item>
        <el-form-item label="合格率" prop="Pass_Rate">
          <el-input v-model="form.Pass_Rate" class="input_box"></el-input>
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
let updata = "/api/CNC/UpdatePassRate";
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
        Number: "",
        Name: "",
        Date: "",
        FeedingNumber: "",
        Pass_Rate: "",
        WasteNumber: "",
      },
      rules: {
        Number: [{ required: true, message: "请输入编号", trigger: "blur" }],
        Name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        Date: [{ required: true, message: "请选择时间", trigger: "blur" }],
        FeedingNumber: [
          { required: true, message: "请输入上料道数量", trigger: "blur" },
        ],
        WasteNumber: [
          { required: true, message: "请输入废料道数量", trigger: "blur" },
        ],
        Pass_Rate: [
          { required: true, message: "请输入合格率", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.form = this.data;
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post(this.$api + updata, this.form).then((res) => {
            if (res.data.state === 1) {
              this.$message.success(res.data.message);
              this.$parent.query();
              this.$emit("update:show", false);
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
