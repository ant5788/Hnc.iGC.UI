<template>
  <div>
    <div class="date_box fl">
      <el-date-picker
        v-model="day"
        type="date"
        placeholder="日期"
        value-format="yyyy-MM-dd"
        @change="getDate()"
      >
      </el-date-picker>
    </div>
    <div class="chart-container fl" ref="loadProduction"></div>
  </div>
</template>
<script>
let url = "http://192.168.20.160:24912/api/CNC/RealTimeOutPut?";
export default {
  data() {
    return {
      chartInstance: null,
      day: "",
      startTime: "",
      endTime: "",
      data: [],
      xdata: ["8:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
      Ydata: [30, 40, 50, 40, 60, 80],
    };
  },
  props: {
    deviceId: {
      type: String,
      default: "A183AA3A-7274-48D5-AADC-53009B7DC203 ",
    },
  },
  mounted() {
    this.initChart();
  },
  created() {
    // this.getData();
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
      let url1 = url + "time=" + this.day + "&deviceId=" + this.deviceId;
      this.$axios.get(url1).then((res) => {
        if (res.data.state === 0) {
          return false;
        } else {
          this.data = res.data.data;
          if (this.data != null) {
            this.data.forEach((item) => {
              this.xdata.push(item.Time);
              this.Ydata.push(item.Total);
            });
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
          }
        }
      });
    },
    getDate() {
      console.log(this.day);
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
  height: 406px;
  padding-top: 20px;
  background: #0a2a55;
}
.fl {
  float: left;
}
.date_box {
  width: 18%;
  height: 426px;
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
</style>
