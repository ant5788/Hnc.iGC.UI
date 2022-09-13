<template>
  <div>
    <el-dialog
      title="详情"
      :visible="detail"
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
            disabled
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="返回日期" prop="ReturnDate">
          <el-date-picker
            v-model="form.ReturnDate"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            class="input_box"
            disabled
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="加工数量" prop="ProcessingNumber">
          <el-input
            v-model="form.ProcessingNumber"
            class="input_box"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="加工零件" prop="ProcessingComponents">
          <el-input
            v-model="form.ProcessingComponents"
            class="input_box"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="加工质量" prop="ProcessoinQuality">
          <el-input
            v-model="form.ProcessoinQuality"
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
  watch: {
    data() {
      this.form = this.data;
    },
  },
  methods: {
    onClose() {
      this.$emit("update:detail", false);
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
</style>
