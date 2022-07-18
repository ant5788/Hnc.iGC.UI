<template>
  <div class="box">
    <dv-border-box-12 class="alam_box">
      <div class="title">▎{{ title }}</div>
      <div class="alam_con" ref="alarm_duration_top5_ref"></div>
    </dv-border-box-12>
  </div>
</template>
<script>
let url = "http://192.168.20.160:24912/api/CNC/getTop5";
export default {
  data() {
    return {
      title: "报警时长TOP5",
      chartInstance: null,
      deviceNumberList: [],
      durationTimeList: [],
      timer5Sec: null,
      data: [],
    };
  },
  mounted() {
    this.initChart();
    this.screenAdapter();
    window.addEventListener("resize", () => {
      this.screenAdapter();
    });
    this.startInterval();
  },
  destroyed() {
    if (this.timer5Sec !== null) {
      clearInterval(this.timer5Sec);
    }
    // 在组件销毁时，将监听器注销
    window.removeEventListener("resize", function () {
      this.chartInstance.resize();
    });
  },
  created() {
    console.log(this.$echarts);
    this.getData();
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(
        this.$refs.alarm_duration_top5_ref
      );
      const initOption = {
        grid: {
          top: "3%",
          left: "3%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: "category",
          boundaryGap: true,
          inverse: true,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            margin: 18,
            color: "#ffffff",
            fontSize: 18,
          },
          data: this.deviceNumberList,
        },
        series: [
          {
            type: "bar",
            barMaxWidth: "80%",
            label: {
              normal: {
                show: true,
                position: "insideLeft",
                distance: 15,
                formatter: "{c}分钟",
                textStyle: {
                  color: "#ffffff",
                  fontSize: 18,
                },
              },
            },
            data: [
              {
                value: this.durationTimeList[0],
                itemStyle: {
                  color: "#fb4d4b",
                },
              },
              {
                value: this.durationTimeList[1],
                itemStyle: {
                  color: "#fb4d4b",
                },
              },
              {
                value: this.durationTimeList[2],
                itemStyle: {
                  color: "#3292c5",
                },
              },
              {
                value: this.durationTimeList[3],
                itemStyle: {
                  color: "#3292c5",
                },
              },
              {
                value: this.durationTimeList[4],
                itemStyle: {
                  color: "#59ebe8",
                },
              },
            ],
          },
        ],
      };
      this.chartInstance.setOption(initOption);
    },
    getData() {
      this.$axios.get(url).then((res) => {
        this.data = res.data.data;
        if (this.data != null) {
          this.data.forEach((item) => {
            this.deviceNumberList.push(item.name);
            this.durationTimeList.push(item.value);
          });
          this.chartInstance = this.$echarts.init(
            this.$refs.alarm_duration_top5_ref
          );
          const dataOption = {
            yAxis: {
              data: this.deviceNumberList,
            },
            series: [
              {
                data: [
                  {
                    value: this.durationTimeList[0],
                    itemStyle: {
                      color: "#fb4d4b",
                    },
                  },
                  {
                    value: this.durationTimeList[1],
                    itemStyle: {
                      color: "#fb4d4b",
                    },
                  },
                  {
                    value: this.durationTimeList[0],
                    itemStyle: {
                      color: "#3292c5",
                    },
                  },
                  {
                    value: this.durationTimeList[1],
                    itemStyle: {
                      color: "#3292c5",
                    },
                  },
                  {
                    value: this.durationTimeList[0],
                    itemStyle: {
                      color: "#59ebe8",
                    },
                  },
                ],
              },
            ],
          };

          this.chartInstance.setOption(dataOption);
        }
      });
    },
    updateChart() {
      this.chartInstance = this.$echarts.init(
        this.$refs.alarm_duration_top5_ref
      );
      const dataOption = {
        yAxis: {
          data: this.deviceNumberList,
        },
        series: [
          {
            data: [
              {
                value: this.durationTimeList[0],
                itemStyle: {
                  color: "#fb4d4b",
                },
              },
              {
                value: this.durationTimeList[1],
                itemStyle: {
                  color: "#fb4d4b",
                },
              },
              {
                value: this.durationTimeList[0],
                itemStyle: {
                  color: "#3292c5",
                },
              },
              {
                value: this.durationTimeList[1],
                itemStyle: {
                  color: "#3292c5",
                },
              },
              {
                value: this.durationTimeList[0],
                itemStyle: {
                  color: "#59ebe8",
                },
              },
            ],
          },
        ],
      };

      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      const adapterOption = {
        yAxis: {
          axisLabel: {
            fontSize: 24,
          },
        },
        series: [
          {
            label: {
              normal: {
                textStyle: {
                  fontSize: 24,
                },
              },
            },
          },
        ],
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
    startInterval() {
      if (this.timer5Sec != null) {
        clearInterval(this.timer5Sec);
      }
      this.timer5Sec = setInterval(() => {
        this.getData();
      }, 1000 * 5);
    },
  },
};
</script>
<style scoped lang="scss">
.alam_box {
  width: 100%;
  height: 300px;
  .title {
    height: 60px;
    line-height: 60px;
    width: 100%;
    color: #fff;
    font-size: 20px;
    padding-left: 30px;
  }
  .alam_con {
    width: 96%;
    height: 75%;
    margin-left: 2%;
  }
}
</style>
