<template>
  <div class="chart-container" ref="loadpice"></div>
</template>
<script>
export default {
  props: {
    date: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      chartInstance: null,
    };
  },
  watch: {
    date: {
      handler(newdate, olddate) {
        console.log(newdate);
        console.log(olddate);
      },
    },
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.loadpice);
      const initOption = {
        legend: {
          orient: "vertical",
          bottom: "bottom",
          textStyle: {
            color: "#ffffff",
          },
        },

        series: {
          type: "pie",
          radius: "50%",
          label: {
            normal: {
              formatter: "{b}:{c}: ({d}%)",
              textStyle: {
                fontWeight: "normal",
                fontSize: 15,
                color: "#ffffff",
              },
            },
          },
          data: [
            { value: 1048, name: "运行" },
            { value: 735, name: "离线" },
            { value: 580, name: "待机" },
            { value: 484, name: "报警" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      };
      this.chartInstance.setOption(initOption);
    },
    //更新曲线
    undate() {
      const dataOption = {
        series: {
          data: [],
        },
      };
      this.chartInstance.setOption(dataOption);
    },
  },
};
</script>
<style scoped lang="scss">
.chart-container {
  width: 98%;
  height: 85%;
  margin-left: 2%;
  background: #0a2a55;
}
</style>
