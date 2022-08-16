<template>
  <div class="curve_info">
    <dv-border-box-13>
      <dv-decoration-7 class="title">实时曲线</dv-decoration-7>
      <div ref="curve_ref" class="chart_container"></div>
    </dv-border-box-13>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chartInstance: null,
      colors: ["rgb(46, 199, 201)", "rgb(90, 177, 239)", "rgb(255, 185, 128)"],
      timeList: [],
      dataTypeList: [], //Y轴数据
      paymentAmountList: [],
    };
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.curve_ref);
      const initOption = {
        legend: {
          textStyle: { color: "#fff", fontSize: 18 },
          data: ["温度PV", "湿度PV", "温度SV", "湿度SV"],
        },
        grid: {
          left: "6%",
          right: "9%",
          top: "15%",
          bottom: "22%",
        },
        xAxis: {
          name: "",
          type: "category",
          data: ["12:14:30", "12:16:30", "12:18:30", "12:20:30", "12:22:30"],
          nameTextStyle: {
            color: "#ffffff",
            fontSize: 18,
          },
          axisLabel: {
            interval: 0,
            rotate: 30,
            color: "#ffffff",
            fontSize: 18,
          },
          axisLine: {
            lineStyle: {
              color: "#ffffff",
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: [
          {
            type: "value",
            min: -150,
            max: 350,
            interval: 50,
            position: "left",
            axisLine: {
              lineStyle: {
                color: this.colors[0],
              },
            },
            axisLabel: {
              formatter: "{value} ℃",
              fontSize: 18,
            },
          },
          {
            type: "value",
            min: 0,
            max: 100,
            interval: 10,
            position: "right",
            axisLine: {
              lineStyle: {
                color: this.colors[0],
                fontSize: 18,
              },
            },
            axisLabel: {
              formatter: "{value} %",
            },
          },
        ],
        series: [
          {
            name: "温度PV",
            type: "line",
            stack: "Total",
            data: [-50, 0, 10, 50, 100],
          },
          {
            name: "湿度PV",
            type: "line",
            stack: "Total",
            data: [-50, 0, 10, 50, 100],
          },
          {
            name: "温度SV",
            type: "line",
            stack: "Total",
            data: [-50, 0, 10, 50, 100],
          },
          {
            name: "湿度SV",
            type: "line",
            stack: "Total",
            data: [-50, 0, 10, 50, 100],
          },
        ],
      };
      this.chartInstance.setOption(initOption);
    },
    updateChart() {
      const dataOption = {
        xAxis: [
          {
            data: this.timeList,
          },
        ],
        yAxis: [{ name: this.dataTypeList[0] }, { name: this.dataTypeList[1] }],
        series: [
          {
            name: this.dataTypeList[0],
            data: this.orderAmountList,
          },
          {
            name: this.dataTypeList[1],
            data: this.paymentAmountList,
          },
          {
            name: this.dataTypeList[2],
            data: this.orderAmountList,
          },
          {
            name: this.dataTypeList[3],
            data: this.paymentAmountList,
          },
        ],
      };
      this.chartInstance.setOption(dataOption);
    },
    //Y轴双曲线等分
    unifiedDivision(maxNum) {
      for (let i = 0; i < 10; i++) {
        if (maxNum % 10 != 0) {
          maxNum++;
        } else {
          return maxNum / 5;
        }
      }
    },
    screenAdapter() {
      const adapterOption = {};
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
  },
};
</script>
<style scoped lang="scss">
.curve_info {
  margin-top: 50px;
  width: 100%;
  height: 460px;
  .title {
    height: 60px;
    width: 13%;
    line-height: 60px;
    font-size: 30px;
    padding: 10px 0;
    color: #fff;
  }
  .chart_container {
    color: #fff;
    width: 96%;
    height: 75%;
    margin-left: 2%;
  }
}
</style>
