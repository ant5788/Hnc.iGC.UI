<template>
  <div>
    <div class="chart-container fl" ref="loadpice"></div>
    <div class="con_box fl">
      <p>
        <span>开机时间：</span><span>{{ OpenTime }}</span
        >小时
      </p>
      <p>
        <span>报警次数：</span><span>{{ AlarmNum }}</span
        >个
      </p>
      <p>
        <span>平均无报警时间：</span><span>{{ average }}</span
        >小时
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chartInstance: null,
      OpenTime: "141.4",
      AlarmNum: 17,
      average: 8.31,
    };
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
  },
};
</script>
<style scoped lang="scss">
.chart-container {
  width: 700px;
  height: 444px;
}
.fl {
  float: left;
}
.con_box {
  width: 260px;
  font-size: 18px;
  color: #fff;
  margin-top: 240px;
}
</style>
