<template>
  <div>
    <div>
      <el-dialog
        title="详情"
        :visible="detail"
        :modal-append-to-body="false"
        :before-close="onClose"
      >
        <el-form
          :model="form"
          :rules="rules"
          ref="form"
          class="form_box"
          label-width="210px"
        >
          <el-form-item label="设备名称" prop="DeviceName">
            <el-select v-model="form.DeviceName" disabled>
              <el-option></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备编码" prop="DeviceNumber">
            <el-select v-model="form.DeviceNumber" disabled>
              <el-option></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备型号" prop="DeviceModel">
            <el-select v-model="form.DeviceModel" disabled>
              <el-option></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="零部件是否齐全" prop="SpareParts">
            <span>方法：目视</span>
            <p><span>标准值：零部件完好、整齐、无缺损</span></p>

            <el-radio-group v-model="form.SpareParts" disabled>
              <el-radio
                v-for="item in SparePartsData"
                :key="item.id"
                :label="item.val"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="液压、润滑、冷却系统" prop="Liquid">
            <span>方法：目视</span>
            <p><span>标准值：运转正常、液位在指示范围内，品质良好</span></p>

            <el-radio-group v-model="form.Liquid" disabled>
              <el-radio
                v-for="item in SparePartsData"
                :key="item.id"
                :label="item.val"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="气压" prop="Pressure">
            <span>方法：目视</span>
            <p><span>标准值：0.4-0.8MP</span></p>

            <el-radio-group v-model="form.Pressure" disabled>
              <el-radio
                v-for="item in SparePartsData"
                :key="item.id"
                :label="item.val"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="各操作手柄" prop="Handle">
            <span>方法：目视、手动操作</span>
            <p><span>标准值：运转灵活</span></p>
            <el-radio-group v-model="form.Handle" disabled>
              <el-radio
                v-for="item in SparePartsData"
                :key="item.id"
                :label="item.val"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="安全装置" prop="SafetyDevices">
            <span>方法：目视</span>
            <p><span>标准值：良好，无缺失</span></p>
            <el-radio-group v-model="form.SafetyDevices" disabled>
              <el-radio
                v-for="item in SparePartsData"
                :key="item.id"
                :label="item.val"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="各仪表指示压力" prop="InstrumentPressure">
            <span>方法：目视</span>
            <p><span>标准值：在正常范围内</span></p>
            <el-radio-group v-model="form.InstrumentPressure" disabled>
              <el-radio
                v-for="item in SparePartsData"
                :key="item.id"
                :label="item.val"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="各散热风扇及滤网" prop="FanScreen">
            <span>方法：目视、耳听</span>
            <p><span>标准值：清洁、运转正常</span></p>
            <el-radio-group v-model="form.FanScreen" disabled>
              <el-radio
                v-for="item in SparePartsData"
                :key="item.id"
                :label="item.val"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="各部驱动电机" prop="DriveMotor">
            <span>方法：手摸、耳听</span>
            <p><span>标准值：清洁、运转良好，无过热，无异响</span></p>
            <el-radio-group v-model="form.DriveMotor" disabled>
              <el-radio
                v-for="item in SparePartsData"
                :key="item.id"
                :label="item.val"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="漏油、漏气、漏水" prop="LeakageOilGasWater">
            <span>方法：目视、手摸、耳听</span>
            <p><span>标准值：无泄漏</span></p>
            <el-radio-group v-model="form.LeakageOilGasWater" disabled>
              <el-radio
                v-for="item in SparePartsData"
                :key="item.id"
                :label="item.val"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="主轴及回转传动机构" prop="PrincipalAxis">
            <span>方法：耳听</span>
            <p><span>标准值：无异响</span></p>
            <el-radio-group v-model="form.PrincipalAxis" disabled>
              <el-radio
                v-for="item in SparePartsData"
                :key="item.id"
                :label="item.val"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="机床外表" prop="Appearance">
            <span>方法：耳听</span>
            <p><span>标准值：清洁</span></p>
            <el-radio-group v-model="form.Appearance" disabled>
              <el-radio
                v-for="item in SparePartsData"
                :key="item.id"
                :label="item.val"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="电器部分" prop="ElectricalPart">
            <span>方法：目视、手动操作</span>
            <p><span>标准值：无异常</span></p>
            <el-radio-group v-model="form.ElectricalPart" disabled>
              <el-radio
                v-for="item in SparePartsData"
                :key="item.id"
                :label="item.val"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
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
      SparePartsData: [
        {
          label: "正常",
          id: 1,
          val: 0,
        },
        {
          label: "异常",
          id: 2,
          val: 1,
        },
        {
          label: "待修",
          id: 3,
          val: 2,
        },
        {
          label: "修好",
          id: 4,
          val: 3,
        },
      ],
      form: {
        DeviceName: "",
        DeviceNumber: "",
        DeviceModel: "",
        SpareParts: "",
        Liquid: "",
        Pressure: "",
        Handle: "",
        SafetyDevices: "",
        InstrumentPressure: "",
        FanScreen: "",
        DriveMotor: "",
        LeakageOilGasWater: "",
        PrincipalAxis: "",
        Appearance: "",
        ElectricalPart: "",
      },
      rules: {
        DeviceName: [
          { required: true, message: "请输入设备名称", trigger: "blur" },
        ],
        DeviceNumber: [
          { required: true, message: "请输入设备编号", trigger: "blur" },
        ],
        DeviceModel: [
          {
            required: true,
            message: "请选择设备型号",
            trigger: "blur",
          },
        ],
        SpareParts: [
          { required: true, message: "请选择点检情况", trigger: "blur" },
        ],
        Liquid: [
          { required: true, message: "请选择点检情况", trigger: "blur" },
        ],
        Pressure: [
          { required: true, message: "请选择点检情况", trigger: "blur" },
        ],
        Handle: [
          { required: true, message: "请选择点检情况", trigger: "blur" },
        ],
        SafetyDevices: [
          { required: true, message: "请选择点检情况", trigger: "blur" },
        ],
        InstrumentPressure: [
          { required: true, message: "请选择点检情况", trigger: "blur" },
        ],
        FanScreen: [
          { required: true, message: "请选择点检情况", trigger: "blur" },
        ],
        DriveMotor: [
          { required: true, message: "请选择点检情况", trigger: "blur" },
        ],
        LeakageOilGasWater: [
          { required: true, message: "请选择点检情况", trigger: "blur" },
        ],
        PrincipalAxis: [
          { required: true, message: "请选择点检情况", trigger: "blur" },
        ],
        Appearance: [
          { required: true, message: "请选择点检情况", trigger: "blur" },
        ],
        ElectricalPart: [
          { required: true, message: "请选择点检情况", trigger: "blur" },
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
      console.log(this.datailData);
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
