<template>
  <div>
    <div class="date_box fl">
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-select v-model="form.deviceId" placeholder="请选择机床">
            <el-option
              v-for="item in deviceList"
              :key="item.id"
              :value="item.DeviceId"
              :label="item.DeviceName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="form.day"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getData" class="btn"
            >查询</el-button
          >
        </el-form-item>
      </el-form>

      <div></div>
    </div>
    <div class="chart-container fl" ref="loadProduction"></div>
  </div>
</template>
<script>
let url = "/api/CNC/RealTimeOutPut?";
let DeviceUrl = "/api/CNC/GetDeviceList";
export default {
  data() {
    return {
      chartInstance: null,
      startTime: "",
      endTime: "",
      data: [],
      deviceList: [],
      xdata: [],
      Ydata: [],
      MagData: [],
      AluData: [],
      form: {
        deviceId: "",
        day: "",
      },
    };
  },
  mounted() {
    this.initChart();
  },
  created() {
    this.getdeviceId();
    this.getdevice();
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.loadProduction);
      let initOption = {
        legend: {
          textStyle: {
            color: "#ffffff",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "4%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            interval: 0,
            color: "#ffffff",
            fontSize: 16,
          },
          axisLine: {
            lineStyle: {
              color: "#ffffff",
            },
          },
          data: this.xdata,
        },
        yAxis: {
          axisLabel: {
            interval: 0,
            color: "#ffffff",
            fontSize: 16,
          },
          axisLine: {
            lineStyle: {
              color: "#ffffff",
            },
          },
          type: "value",
        },
        series: [
          {
            name: "总加工数量",
            data: [],
            type: "bar",
          },
          {
            name: "镁加工数量",
            data: [],
            type: "bar",
          },
          {
            name: "铝加工数量",
            data: [],
            type: "bar",
          },
        ],
      };
      this.chartInstance.setOption(initOption);
    },
    getData() {
      console.log(this.form);
      if ((this.form.day !== "") & (this.form.deviceId !== "")) {
        this.$axios
          .get(
            this.$api +
              url +
              "time=" +
              this.form.day +
              "&deviceId=" +
              this.form.deviceId
          )
          .then((res) => {
            if (res.data.state === 0) {
              return false;
            } else {
              this.data = res.data.data;
              if (this.data != null) {
                this.xdata = [];
                this.Ydata = [];
                this.MagData = [];
                this.AluData = [];
                this.data.forEach((item) => {
                  this.xdata.push(item.Time);
                  this.Ydata.push(item.Total);
                  this.MagData.push(item.MagnesiumTotal);
                  this.AluData.push(item.AluminumTotal);
                });
              }
              this.updateChart();
            }
          });
      } else {
        this.$message("请选择相关设备和日期");
        return false;
      }
    },
    //更新图表数据
    updateChart() {
      this.chartInstance = this.$echarts.init(this.$refs.loadProduction);
      const dataOption = {
        xAxis: { data: this.xdata },
        series: [
          {
            name: "总加工数量",
            data: this.Ydata,
            type: "bar",
          },
          {
            name: "镁加工数量",
            data: this.MagData,
            type: "bar",
          },
          {
            name: "铝加工数量",
            data: this.AluData,
            type: "bar",
          },
        ],
      };
      this.chartInstance.setOption(dataOption);
    },
    // getDate() {
    //   var timezone = 8;
    //   var offset_GMT = new Date().getTimezoneOffset();
    //   var nowDate = new Date().getTime();
    //   var today = new Date(
    //     nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000
    //   );
    //   var date =
    //     today.getFullYear() +
    //     "-" +
    //     this.twoDigits(today.getMonth() + 1) +
    //     "-" +
    //     this.twoDigits(today.getDate());
    //   var time =
    //     this.twoDigits(today.getHours()) +
    //     ":" +
    //     this.twoDigits(today.getMinutes()) +
    //     ":" +
    //     this.twoDigits(today.getSeconds());
    //   this.day = date + "" + time;
    //   this.getData();
    // },
    twoDigits(val) {
      if (val < 10) return "0" + val;
      return val;
    },
    getdevice() {
      this.$axios.get(this.$api + DeviceUrl).then((res) => {
        if (res.data.state === 1) {
          this.deviceList = res.data.data;
        }
      });
    },
    getdeviceId(val) {
      this.deviceId = val;
      this.getData();
    },
    getTimestamp(time) {
      return new Date(time).getTime();
    },
  },
};
</script>
<style scoped lang="scss">
.chart-container {
  width: 80%;
  height: 440px;
  padding-top: 20px;
  background: #0a2a55;
}
.fl {
  float: left;
}
.date_box {
  padding-top: 20px;
  width: 18%;
  height: 440px;
  background: #0a2a55;
  margin-left: 2%;
}
.el-date-editor.el-input {
  width: 150px;
  margin: 10px;
}
/deep/.el-input__inner {
  background: #354558;
  color: #fff;
}
.text {
  color: #fff;
  font-size: 20px;
}
/deep/.el-select {
  margin-left: 10px;
}
.btn {
  margin-left: 10px;
}
</style>
