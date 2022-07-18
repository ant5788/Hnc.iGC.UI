<template>
  <div>
    <div class="date_box fl">
      <el-date-picker
        v-model="startTime"
        type="date"
        placeholder="开始日期"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
      <el-time-picker
        v-model="time1"
        value-format="HH:mm:ss"
        placeholder="选择时间"
      >
      </el-time-picker>
      <el-date-picker
        v-model="endTime"
        type="date"
        placeholder="结束日期"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
      <el-time-picker
        v-model="time2"
        value-format="HH:mm:ss"
        @change="getTime()"
        placeholder="选择时间"
      >
      </el-time-picker>
    </div>
    <div class="chart-container fl" ref="loadBar"></div>
  </div>
</template>
<script>
let url = "http://192.168.20.160:24912/api/CNC/CumulativeProduction?";
export default {
  data() {
    return {
      chartInstance: null,
      time1: "",
      time2: "",
      startTime: "",
      endTime: "",
      data: [],
      xdata: [
        "2022-06-01",
        "2022-06-02",
        "2022-06-03",
        "2022-06-04",
        "2022-06-05",
        "2022-06-06",
        "2022-06-07",
      ],
      Ydata: [200,160,300,360,400,380,300],
    };
  },
  props: {
    deviceId: {
      type: String,
      default: "A183AA3A-7274-48D5-AADC-53009B7DC203 ",
    },
  },
  mounted() {
     this.getTime();
    this.initChart();
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.loadBar);
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
            name: "累计产量",
            data: this.Ydata,
            type: "bar",
          },
        ],
      };
      this.chartInstance.setOption(initOption);
    },
    getData() {
      let time5 = this.startTime + " " + this.time1;
      let time6 = this.endTime + " " + this.time2;
      let startTime1 = this.getTimestamp(time5);
      let endTime1 = this.getTimestamp(time6);
      let url1 =
        url +
        "startTime=" +
        startTime1 +
        "&" +
        "endTime=" +
        endTime1 +
        "&deviceId=" +
        this.deviceId
      this.data = [];
      if (
        this.startTime === "" ||
        this.endTime === "" ||
        this.time1 === "" ||
        this.time2 === ""
      ) {
        return false;
      } else {
        this.$axios.get(url1).then((res) => {
          if (res.data.state === 0) {
            return false;
          } else {
            this.data = res.data.data;
            if (this.data != null) {
              this.data.forEach((item) => {
                console.log(item);
                this.xdata.push(item.Time);
                this.Ydata.push(item.Total);
              });
              //获取数据后加载获取echart的方法
              this.chartInstance = this.$echarts.init(this.$refs.loadBar);
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
                    name: "累计产量",
                    data: this.Ydata,
                    type: "bar",
                  },
                ],
              };
              this.chartInstance.setOption(initOption);
            }
          }
        });
      }
    },
    getTimestamp(time) {
      return new Date(time).getTime();
    },
    getTime() {
      this.getData();
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
.date_box {
  width: 18%;
  height: 426px;
  background: #0a2a55;
  margin-left: 2%;
}
.fl {
  float: left;
}
.el-date-editor.el-input {
  width: 150px;
  margin: 10px;
}
/deep/.el-input__inner {
  background: #354558;
  color: #fff;
}
</style>
