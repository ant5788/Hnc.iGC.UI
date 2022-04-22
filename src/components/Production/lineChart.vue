<template>
  <div class="chart-container" ref="loadLine"></div>
</template>
<script>
export default {
  data() {
    return {
      chartInstance: null,
    };
  },
  mounted() {
    this.initchart();
  },
  methods: {
    initchart() {
      this.chartInstance = this.$echarts.init(this.$refs.loadLine);
      const initOption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["运行时间", "开机时间"],
          bottom: "bottom",
          textStyle: {
            color: "#ffffff",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
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
            data: ["9:00", "10:00", "11:00", "12:00"],
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              interval: 0,
              color: "#ffffff",
              fontSize: 15,
            },
            axisLine: {
              lineStyle: {
                color: "#ffffff",
              },
            },
          },
        ],
        series: [
          {
            name: "运行时间",
            type: "line",
            stack: "Total",
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  textStyle: {
                    fontWeight: "normal",
                    fontSize: 15,
                    color: "#ffffff",
                  },
                },
              },
            },

            areaStyle: {
              color: "#8CA2E4",
            },
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "开机时间",
            type: "line",
            stack: "Total",
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  textStyle: {
                    fontWeight: "normal",
                    fontSize: 15,
                    color: "#ffffff",
                  },
                },
              },
            },
            areaStyle: { color: "#094550" },
            emphasis: {
              focus: "series",
            },

            data: [220, 182, 191, 234, 290, 330, 310],
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
  width: 95%;
  height: 95%;
  margin-left: 2%;
  background: #0a2a55;
}
</style>
