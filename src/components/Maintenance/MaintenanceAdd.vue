<template>
  <div>
    <el-dialog
      title="新增"
      :visible="visible"
      :modal-append-to-body="false"
      :before-close="onClose"
    >
      <el-form :model="form" :rules="rules" ref="form" class="form_box">
        <el-form-item label="设备编号" prop="DeviceNumber">
          <el-input v-model="form.DeviceNumber" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" prop="DeviceName">
          <el-input v-model="form.DeviceName" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="设备型号" prop="DeviceModel">
          <el-input v-model="form.DeviceModel" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="DeviceType">
          <el-input v-model="form.DeviceType" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="采购日期" prop="PurchaseDate">
          <el-date-picker
            v-model="form.PurchaseDate"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="使用年限" prop="DurableYears">
          <el-input v-model="form.DurableYears" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="保养内容" prop="Content">
          <el-input
            type="textarea"
            row="2"
            v-model="form.Content"
            class="input_box"
          ></el-input>
        </el-form-item>
        <el-form-item label="保养周期" prop="Cycle">
          <el-input v-model="form.Cycle" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="上次保养时间" prop="LastTime">
          <el-date-picker
            v-model="form.LastTime"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="计划保养时间" prop="PlannedTime">
          <el-date-picker
            v-model="form.PlannedTime"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="实际保养时间" prop="ActualTime">
          <el-date-picker
            v-model="form.ActualTime"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="责任人" prop="PersonLiable">
          <el-input v-model="form.PersonLiable" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="提前预警时间" prop="EarlyWarningTime">
          <el-input v-model.Number="from.EarlyWarningTime"></el-input>
        </el-form-item>
        <el-form-item label="维保状态" prop="MaintainState">
          <el-select v-model="form.MaintainState">
            <el-option
              v-for="item in StateData"
              :key="item.id"
              :label="item.label"
              :value="item.val"
            ></el-option>
          </el-select>
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
let addDate = "/api/CNC/AddMaintain";
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
        DeviceNumber: "",
        DeviceName: "",
        DeviceModel: "",
        DeviceType: "",
        PurchaseDate: "",
        DurableYears: "",
        Content: "",
        Cycle: "",
        PersonLiable: "",
        LastTime: "",
        PlannedTime: "",
        ActualTime: "",
        EarlyWarningTime: "",
      },
      StateData: [
        {
          label: "1",
          id: 1,
          val: 1,
        },
      ],
      rules: {
        DeviceNumber: [
          { required: true, message: "请输入设备编号", trigger: "blur" },
        ],
        DeviceName: [
          { required: true, message: "请输入设备名称", trigger: "blur" },
        ],
        DeviceModel: [
          { required: true, message: "请输入设备型号", trigger: "blur" },
        ],
        DeviceType: [
          { required: true, message: "请输入设备类型", trigger: "blur" },
        ],
        PurchaseDate: [
          { required: true, message: "请选择采购日期", trigger: "blur" },
        ],
        Content: [
          { required: true, message: "请输入保养内容", trigger: "blur" },
        ],
        Cycle: [
          { required: true, message: "请输入设备保养周期", trigger: "blur" },
        ],
        LastTime: [
          { required: true, message: "请选择上次保养时间", trigger: "blur" },
        ],
        PlannedTime: [
          { required: true, message: "请选择计划保养时间", trigger: "blur" },
        ],
        ActualTime: [
          { required: true, message: "请选择实际保养时间", trigger: "blur" },
        ],
        EarlyWarningTime: [
          { required: true, message: "请选择提前预警时间", trigger: "blur" },
        ],
        PersonLiable: [
          { required: true, message: "请输入责任人", trigger: "blur" },
        ],

        DurableYears: [
          { required: true, message: "请输入使用年限", trigger: "blur" },
        ],
        MaintainState: [
          { required: true, message: "请选择维保状态", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //提交数据
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post(this.$api + addDate, this.form).then((res) => {
            if (res.data.state === 1) {
              this.$message.success(res.data.message);
              this.$emit("update:visible", false);
              this.$parent.getdata();
              this.$refs[formName].resetFields();
            }
          });
        } else {
          return false;
        }
      });
    },
    //重置表格
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onClose() {
      this.$emit("update:visible", false);
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
