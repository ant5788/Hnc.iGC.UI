<template>
  <div>
    <div class="date_box fl">
      <el-select
        v-model="deviceId"
        @change="getdeviceId"
        placeholder="请选择机床"
      >
        <el-option
          v-for="item in deviceList"
          :key="item.id"
          :value="item.DeviceId"
          :label="item.DeviceName"
        ></el-option>
      </el-select>
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
      day: "",
      startTime: "",
      endTime: "",
      data: [],
      deviceId: "",
      deviceList: [
        {
          Id: "G09K23IEYNA",
          DeviceId: "A183AA3A-7274-48D5-AADC-53009B7DC203",
          DeviceName: "立式加工中心",
          Description: "V1160L",
          Ip: "192.168.18.2",
          Port: "8193",
        },
        {
          Id: "HM7KLAGTI7T",
          DeviceId: "D55F897D-D483-4E84-9928-BC6338C5C4C5",
          DeviceName: "立式车床",
          Description: "VTC850",
          Ip: "192.168.18.3",
          Port: "8193",
        },
      ],
      xdata: ["8:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
      Ydata: [30, 40, 50, 40, 60, 80],
    };
  },
  mounted() {
    this.initChart();
  },
  created() {
    this.getdeviceId();
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
            name: "实时产量统计",
            data: this.Ydata,
            type: "bar",
          },
        ],
      };
      this.chartInstance.setOption(initOption);
    },
    getData() {
      this.$axios
        .get(
          this.$api + url + "time=" + this.day + "&deviceId=" + this.deviceId
        )
        .then((res) => {
          if (res.data.state === 0) {
            return false;
          } else {
            this.data = res.data.data;
            if (this.data != null) {
              this.data.forEach((item) => {
                this.xdata.push(item.Time);
                this.Ydata.push(item.Total);
              });
              this.chartInstance = this.$echarts.init(
                this.$refs.loadProduction
              );
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
                    name: "实时产量统计",
                    data: this.Ydata,
                    type: "bar",
                  },
                ],
              };
              this.chartInstance.setOption(initOption);
            }
          }
        });
    },
    getDate() {
      var timezone = 8;
      var offset_GMT = new Date().getTimezoneOffset();
      var nowDate = new Date().getTime();
      var today = new Date(
        nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000
      );
      var date =
        today.getFullYear() +
        "-" +
        this.twoDigits(today.getMonth() + 1) +
        "-" +
        this.twoDigits(today.getDate());
      var time =
        this.twoDigits(today.getHours()) +
        ":" +
        this.twoDigits(today.getMinutes()) +
        ":" +
        this.twoDigits(today.getSeconds());
      this.day = date + "" + time;
      this.getData();
    },
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
      console.log(this.deviceId);
      this.getDate();
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
</style>
