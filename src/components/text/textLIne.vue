<template>
  <div class="chart-container" ref="text"></div>
</template>
<script>
import { dataAssembly, formatters, formateText, renderItem } from "./data";
export default {
  data() {
    return {
      chartInstance: null,
      colors: ["#2f4554", "#d48265", "#c23531"],
      state: ["待机", "运行", "宕机"],
    };
  },
  mounted() {
    this.initChart();
  },

  methods: {
    useEffect() {},
    initChart() {
      const arrData = dataAssembly();
      this.chartInstance = this.$echarts.init(this.$refs.text);
      let initOption = {
        color: this.colors,
        tooltip: {
          formatter: (params) => {
            let stateText = formateText(params.color);
            let startTimer = formatters(params.value[1]);
            let endTimer = formatters(params.value[2]);
            return (
              params.name +
              " " +
              `${stateText}时间：` +
              startTimer +
              "~" +
              endTimer
            );
          },
        },
        legend: {
          data: this.state,
          bottom: "1%",
          selectedMode: false,
          textStyle: {
            color: "#000",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          top: "1%",
          bottom: "2%",
          containLabel: true,
          height: 500,
        },
        xAxis: {
          type: "time",
          min: new Date().getTime() - 1000 * 60 * 60 * 2,
          splitNumber: 12,
          axisLabel: {
            rotate: 340,
            formatter: formatters(new Date().getTime()),
          },
        },
        yAxis: {
          data: ["设备1", "设备2", "设备3", "设备4"],
        },
        series: [
          { name: this.state[0], type: "bar", data: [] },
          { name: this.state[1], type: "bar", data: [] },
          { name: this.state[2], type: "bar", data: [] },
          {
            type: "custom",
            renderItem: renderItem,
            encode: {
              x: [1, 2],
              y: 0,
            },
            data: arrData,
          },
        ],
      };
      this.chartInstance.setOption(initOption);
    },
  },
};
</script>
<style scoped>
.chart-container {
  width: 80%;
  height: 600px;
  padding-top: 20px;
  background: #0a2a55;
}
</style>
