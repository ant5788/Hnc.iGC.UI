<template>
  <div>
    <el-dialog
      title="新增"
      :visible="visible"
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
        <el-form-item label="ERP指令单号" prop="OrderNo">
          <el-input v-model="form.OrderNo" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="零件订单号" prop="PartOrder">
          <el-input v-model="form.PartOrder" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="部件名称" prop="PartName">
          <el-input v-model="form.PartName" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="检验数量" prop="InspectionQuantity">
          <el-input
            v-model.number="form.InspectionQuantity"
            class="input_box"
          ></el-input>
        </el-form-item>
        <el-form-item label="不合格数量" prop="UnqualifiedQuantity">
          <el-input
            v-model.number="form.UnqualifiedQuantity"
            class="input_box"
          ></el-input>
        </el-form-item>
        <el-form-item label="不合格问题描述" prop="Problem">
          <el-input
            type="textarea"
            row="2"
            v-model="form.Problem"
            class="input_box"
          ></el-input>
        </el-form-item>
        <el-form-item label="工序" prop="WorkingProcedure">
          <el-input
            v-model="form.WorkingProcedure"
            class="input_box"
          ></el-input>
        </el-form-item>
        <el-form-item label="原因分类1级" prop="Cause1">
          <el-input v-model="form.Cause1" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="原因分类2级" prop="Cause2">
          <el-input v-model="form.Cause2" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="责任人" prop="PersonLiable">
          <el-input v-model="form.PersonLiable" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="解决措施" prop="Solutions">
          <el-input v-model="form.Solutions" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="检验日期" prop="InspectionDate">
          <el-date-picker
            v-model="form.InspectionDate"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            class="input_box"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="检验员" prop="Inspector">
          <el-input v-model="form.Inspector" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input
            type="textarea"
            row="2"
            v-model="form.remarks"
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
let add = "/api/CNC/AddPassRate";
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
        OrderNo: "",
        PartOrder: "",
        PartName: "",
        FeedingNumber: "",
        InspectionQuantity: "",
        UnqualifiedQuantity: "",
        Problem: "",
        WorkingProcedure: "",
        Cause1: "",
        Cause2: "",
        PersonLiable: "",
        Solutions: "",
        InspectionDate: "",
        Inspector: "",
        remarks: "",
      },
      rules: {
        OrderNo: [
          { required: true, message: "请输入ERP指令单号", trigger: "blur" },
        ],
        PartOrder: [
          { required: true, message: "请输入零件订单号", trigger: "blur" },
        ],
        PartName: [
          { required: true, message: "请输入部件名称", trigger: "blur" },
        ],
        InspectionQuantity: [
          { required: true, message: "请输入检验数量", trigger: "blur" },
        ],
        UnqualifiedQuantity: [
          { required: true, message: "不合格数量", trigger: "blur" },
        ],
        Problem: [
          { required: true, message: "请输入不合格问题描述", trigger: "blur" },
        ],
        WorkingProcedure: [
          { required: true, message: "请输入工序", trigger: "blur" },
        ],
        Cause1: [
          { required: true, message: "请输入原因分类1级", trigger: "blur" },
        ],
        Cause2: [
          { required: true, message: "请输入原因分类2级", trigger: "blur" },
        ],
        PersonLiable: [
          { required: true, message: "请输入责任人", trigger: "blur" },
        ],
        Solutions: [
          { required: true, message: "请输入解决措施", trigger: "blur" },
        ],
        InspectionDate: [
          { required: true, message: "请选择检验日期", trigger: "blur" },
        ],
        Inspector: [
          { required: true, message: "请输入检验员", trigger: "blur" },
        ],
        remarks: [{ required: true, message: "请输入备注", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      console.log(this.form);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post(this.$api + add, this.form).then((res) => {
            if (res.data.state === 1) {
              this.$message.success(res.data.message);
              this.$emit("update:visible", false);
              this.$parent.query();
              this.$refs[formName].resetFields();
            } else {
              this.$message(res.data.message);
            }
          });
        } else {
          console.log("error submit!!");
          this.$emit("update:visible", false);

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
