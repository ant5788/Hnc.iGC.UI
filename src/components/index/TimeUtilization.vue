<template>
  <div class="utilliz_box">
    <dv-border-box-12>
      <div class="title">▎时间稼动率统计</div>
      <div ref="time_activation_ref" class="chart-container"></div>
    </dv-border-box-12>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chartInstance: null,
      seriesData: null,
    };
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", () => {
      this.screenAdapter();
    });
    this.startInterval();
    this.screenAdapter();
  },
  destroyed() {
    // 在组件销毁时，将监听器注销
    window.removeEventListener("resize", function () {
      this.chartInstance.resize();
    });
    if (this.timer5Sec !== null) {
      clearInterval(this.timer5Sec);
    }
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.time_activation_ref);
      const initOption = {
        series: [
          {
            name: "内部进度条",
            type: "gauge",
            center: ["50%", "56%"],
            radius: "100%",
            splitNumber: 10,
            axisLine: {
              show: true,
              lineStyle: {
                width: 25,
                color: [
                  [0.2, "#e55c63"],
                  [0.8, "#3191c3"],
                  [1, "#19f070"],
                ],
              },
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            itemStyle: {
              show: false,
            },
            pointer: {
              show: true,
              length: "60%",
              radius: "20%",
              //指针粗细
              width: 3,
            },
            // 标题
            title: {
              show: true,
              offsetCenter: [0, 90],
              textStyle: {
                color: "#fff",
                //表盘上的标题文字大小
                fontSize: 20,
                fontWeight: 400,
              },
            },
            detail: {
              formatter: function (value) {
                if (value !== 0) {
                  var num = Math.round(value);
                  return parseInt(num).toFixed(0) + "%";
                } else {
                  return 0;
                }
              },
              offsetCenter: [0, 60],
              textStyle: {
                fontSize: 18,
                color: "#ffffff",
              },
            },
            animationDuration: 4000,
            data: [
              {
                name: "",
                value: 60,
              },
            ],
          },
          {
            name: "外部刻度",
            type: "gauge",
            center: ["50%", "56%"],
            radius: "92%",
            z: 4,
            //最小刻度
            min: 0,
            //最大刻度
            max: 100,
            //刻度数量
            splitNumber: 10,
            startAngle: 225,
            endAngle: -45,
            axisLine: {
              show: false,
              lineStyle: {
                width: 1,
                color: [[1, "rgba(0,0,0,0)"]],
              },
            },
            //仪表盘轴线
            axisLabel: {
              show: true,
              color: "rgba(255,255,255,.5)",
              distance: 5,
              formatter: function (v) {
                switch (v + "") {
                  case "0":
                    return "0";
                  case "10":
                    return "10";
                  case "20":
                    return "20";
                  case "30":
                    return "30";
                  case "40":
                    return "40";
                  case "50":
                    return "50";
                  case "60":
                    return "60";
                  case "70":
                    return "70";
                  case "80":
                    return "80";
                  case "90":
                    return "90";
                  case "100":
                    return "100";
                }
              },
            },
            //刻度标签。
            axisTick: {
              show: true,
              splitNumber: 5,
              lineStyle: {
                color: "#FFFFFF",
                width: 2,
              },
              length: 8,
            },
            //刻度样式
            splitLine: {
              show: true,
              length: 20,
              lineStyle: {
                color: "#FFFFFF",
              },
            },
            //分隔线样式
            detail: {
              show: false,
            },
            pointer: {
              show: true,
            },
          },
        ],
      };
      this.chartInstance.setOption(initOption);
    },
    getData() {},
    updateChart() {
      let title = this.seriesData.name,
        value = this.seriesData.value;
      const dataOption = {
        series: [
          {
            data: [
              {
                name: title,
                value: value,
              },
            ],
          },
        ],
      };
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      const adapterOption = {};
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
.utilliz_box {
  width: 100%;
  height: 316px;
  .title {
    height: 60px;
    line-height: 60px;
    width: 100%;
    color: #fff;
    font-size: 20px;
    padding-left: 30px;
  }
  .chart-container {
    width: 96%;
    height: 75%;
    margin-left: 2%;
  }
}
</style>
