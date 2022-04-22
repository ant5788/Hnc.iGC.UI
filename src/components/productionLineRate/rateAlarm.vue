<template>
  <div class="chart-container" ref="alarm"></div>
</template>
<script>
export default {
  data() {
    return {
      chartInstance: null,
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.alarm);
      const initOption = {
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
          data: [
            "2022-01-04",
            "2022-01-05",
            "2022-01-06",
            "2022-01-07",
            "2022-01-08",
            "2022-01-09",
            "2022-01-10",
          ],
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
            name: "报警持续时间（分钟）",
            data: [0, 0, 10, 120, 130, 140, 150],
            type: "bar",
            itemStyle: {
              normal: {
                color: "#41b9e2",
              },
            },
          },
        ],
      };
      this.chartInstance.setOption(initOption);
    },
  },
};
</script>
<style scoped lang="scss">
.chart-container {
  width: 96%;
  height: 96%;
  margin-left: 2%;
}
</style>
