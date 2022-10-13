<template>
  <div>
    <el-dialog
      title="新增"
      :visible="visible"
      :modal-append-to-body="false"
      :before-close="onClose"
    >
      <el-form :model="form" :rules="rules" ref="form" class="form_box">
        <el-form-item label="委外订单" prop="OutsourcingOrder">
          <el-input
            v-model="form.OutsourcingOrder"
            class="input_box"
          ></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="Supplier">
          <el-input v-model="form.Supplier" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="物料编码" prop="ItemNumber">
          <el-input
            v-model.number="form.ItemNumber"
            class="input_box"
          ></el-input>
        </el-form-item>
        <el-form-item label="物料描述" prop="ItemDescription">
          <el-input v-model="form.ItemDescription" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="返回日期" prop="ReturnDate">
          <el-date-picker
            v-model="form.ReturnDate"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="数量" prop="Number">
          <el-input v-model.number="form.Number" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="已入库数量" prop="ReceivedQuantity">
          <el-input
            v-model="form.ReceivedQuantity"
            class="input_box"
          ></el-input>
        </el-form-item>
        <el-form-item label="合格数量" prop="QualifiedQuantity">
          <el-input
            v-model="form.QualifiedQuantity"
            class="input_box"
          ></el-input>
        </el-form-item>
        <el-form-item label="待检数量" prop="ToBeInspected">
          <el-input v-model="form.ToBeInspected" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="委外申请创建日期" prop="OutsourcingTime">
          <el-date-picker
            v-model="form.OutsourcingTime"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="实际要求到货日期" prop="ActualRequiredDate">
          <el-date-picker
            v-model="form.ActualRequiredDate"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合同签订日期" prop="ContractSigningDate">
          <el-date-picker
            v-model="form.ContractSigningDate"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合同要求到货日期" prop="ContractArrivalDate">
          <el-date-picker
            v-model="form.ContractArrivalDate"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="委外出库时间" prop="DeliveryTime">
          <el-date-picker
            v-model="form.DeliveryTime"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            class="input_box"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="提前预警时间" prop="EarlyWarning">
          <el-input
            v-model.number="form.EarlyWarning"
            class="input_box"
          ></el-input>
        </el-form-item>
        <el-form-item label="实际到货日期" prop="ActualArrivalDate">
          <el-date-picker
            v-model="form.ActualArrivalDate"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            class="input_box"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="采购组" prop="ProcurementTeam">
          <el-input
            v-model.number="form.ProcurementTeam"
            class="input_box"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="Remarks">
          <el-input
            type="textarea"
            row="2"
            v-model="form.Remarks"
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
let add = "/api/CNC/AddOutsourcing";
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
        OutsourcingOrder: "",
        Supplier: "",
        ItemNumber: "",
        ItemDescription: "",
        Number: "",
        ReceivedQuantity: "",
        QualifiedQuantity: "",
        ToBeInspected: "",
        OutsourcingTime: "",
        ActualRequiredDate: "",
        ContractSigningDate: "",
        ContractArrivalDate: "",
        DeliveryTime: "",
        ActualArrivalDate: "",
        ProcurementTeam: "",
        Remarks: "",
        EarlyWarning: "",
        ReturnDate: "",
      },
      rules: {
        OutsourcingOrder: [
          { required: true, message: "请输入委外订单", trigger: "blur" },
        ],
        ReturnDate: [
          { required: true, message: "选择返回日期", trigger: "blur" },
        ],
        Supplier: [
          { required: true, message: "请输入供应商", trigger: "blur" },
        ],
        EarlyWarning: [
          { required: true, message: "请输入提前预警时间", trigger: "blur" },
        ],
        ItemNumber: [
          { required: true, message: "请输入物料编码", trigger: "blur" },
        ],
        ItemDescription: [
          { required: true, message: "请输入物料描述", trigger: "blur" },
        ],
        Number: [{ required: true, message: "请输入数量", trigger: "blur" }],
        ReceivedQuantity: [
          { required: true, message: "请输入已入库数量", trigger: "blur" },
        ],
        QualifiedQuantity: [
          { required: true, message: "请输入合格数量", trigger: "blur" },
        ],
        ToBeInspected: [
          { required: true, message: "请输入待检数量", trigger: "blur" },
        ],
        OutsourcingTime: [
          {
            required: true,
            message: "请选择委外申请创建日期",
            trigger: "blur",
          },
        ],
        ActualRequiredDate: [
          {
            required: true,
            message: "请选择实际要求到货日期",
            trigger: "blur",
          },
        ],
        ContractSigningDate: [
          {
            required: true,
            message: "请选择合同签订日期",
            trigger: "blur",
          },
        ],
        ContractArrivalDate: [
          {
            required: true,
            message: "请选择合同要求到货日期",
            trigger: "blur",
          },
        ],
        DeliveryTime: [
          {
            required: true,
            message: "请选择委外出库时间",
            trigger: "blur",
          },
        ],
        ActualArrivalDate: [
          { required: true, message: "请选择实际到货日期", trigger: "blur" },
        ],
        ProcurementTeam: [
          { required: true, message: "请输入采购组", trigger: "blur" },
        ],
        Remarks: [{ required: true, message: "请输入备注", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
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
  width: 380px;
}
.btns {
  text-align: center;
}
</style>
