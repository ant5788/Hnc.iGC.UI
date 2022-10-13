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
        <el-form-item label="设备编号" prop="DeviceNumber">
          <el-input v-model="form.DeviceNumber" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="设备型号" prop="DeviceModel">
          <el-input v-model="form.DeviceModel" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="使用年限" prop="DurableYars">
          <el-input
            v-model.number="form.DurableYars"
            class="input_box"
          ></el-input>
        </el-form-item>
        <el-form-item label="维修开始时间" prop="StartTime">
          <el-date-picker
            v-model="form.StartTime"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="维修结束时间" prop="EndTime">
          <el-date-picker
            v-model="form.EndTime"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="维修原因" prop="reason">
          <el-input
            type="textarea"
            row="2"
            v-model="form.reason"
            class="input_box"
          ></el-input>
        </el-form-item>
        <el-form-item label="维修负责人" prop="RepairPersonnel">
          <el-input v-model="form.RepairPersonnel" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="维修状态" prop="RepairState">
          <el-select v-model="form.RepairState">
            <el-option
              v-for="item in RepairStateData"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="维修时长" prop="RepairDuration">
          <el-input v-model="form.RepairDuration" class="input_box"></el-input>
        </el-form-item>
        <el-form-item label="维修金额" prop="RepairCost">
          <el-input v-model="form.RepairCost" class="input_box"></el-input>
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
let add = "/api/CNC/AddDeviceRepair";
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
        DeviceNumber: "",
        DeviceModel: "",
        DurableYars: "",
        StartTime: "",
        EndTime: "",
        RepairPersonnel: "",
        reason: "",
        RepairState: "",
        RepairDuration: "",
        RepairCost: "",
      },
      RepairStateData: [
        {
          id: 1,
          value: 1,
          label: "完成",
        },
        {
          id: 0,
          value: 0,
          label: "未完成",
        },
      ],
      rules: {
        DeviceName: [
          { required: true, message: "请输入设备名称", trigger: "blur" },
        ],
        DeviceType: [
          { required: true, message: "请输入设备类型", trigger: "blur" },
        ],
        DeviceNumber: [
          { required: true, message: "请输入设备编号", trigger: "blur" },
        ],
        DeviceModel: [
          { required: true, message: "请输入设备型号", trigger: "blur" },
        ],
        StartTime: [
          { required: true, message: "请选择开始时间", trigger: "blur" },
        ],
        EndTime: [
          { required: true, message: "请选择结束时间", trigger: "blur" },
        ],
        RepairPersonnel: [
          { required: true, message: "请输入维修负责人", trigger: "blur" },
        ],
        reason: [
          { required: true, message: "请输入维修原因", trigger: "blur" },
        ],
        DurableYars: [
          { required: true, message: "请输入使用年限", trigger: "blur" },
        ],
        RepairDuration: [
          { required: true, message: "请输入维修时长", trigger: "blur" },
          { pattern: /^[0-9]./, message: "维修时长需为数字", trigger: "blur" },
        ],
        RepairCost: [
          { required: true, message: "请输入维修金额", trigger: "blur" },
          { pattern: /^[0-9]./, message: "维修金额需为数字", trigger: "blur" },
        ],
        RepairState: [
          {
            required: true,
            message: "请选择维修状态",
            trigger: "blur",
          },
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
              this.$parent.getData();
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
.input_box {
  width: 400px;
}
</style>
