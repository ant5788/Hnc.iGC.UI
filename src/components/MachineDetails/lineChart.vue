<template>
  <div class="linChart_box">
    <dv-border-box-12>
      <!-- <div class="time_box fl">
        <p><button class="btn">每班</button></p>
        <p><button class="btn">每天</button></p>
        <p><button class="btn">每周</button></p>
      </div> -->
      <div class="chart-container fl" ref="load_diagram_ref"></div>
    </dv-border-box-12>
  </div>
</template>
<script>
export default {
  data() {
    return {
      load: {
        X: [],
        Y: [],
        Z: [],
        C: [],
      },
    };
  },
  mounted() {
    this.initChart();
    this.getAxisData();
     this.updateChart();
    window.addEventListener("resize", () => {
      this.screenAdapter();
    });
  },
  methods: {
    getAxisData() {
      // this.updateChart();
    },
    // 初始化负载折线图
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.load_diagram_ref);
      const initOption = {
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        legend: {
          top: 15,
          textStyle: {
            color: "#ffffff",
            fontSize: 16,
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLabel: {
            interval: 0,
            textStyle: {
              color: "#ffffff",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#ffffff",
            },
          },
          data: [],
        },
        yAxis: {
          type: "value",
          min: 0,
          max: 100,
          axisLabel: {
            fontSize: 14,
            textStyle: {
              color: "#ffffff",
            },
          },
          splitLabel: {
            lineStyle: {
              type: "dashed",
              color: "#E9E9E9",
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          data: [],
        },
        series: [
          {
            data: [],
            type: "bar",
            barWidth: "60%",
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
    // 更新负载折线图
    updateChart() {
      let series = [];
      let legend = [];
      let color = [
        "#d0021b",
        "#f5a623",
        "#18a23f",
        "#8b572a",
        "#417505",
        "#bd10e0",
        "#4a90e2",
        "#50e3c2",
        "#b8e986",
        "#4a4a4a",
      ];
      let load = this.load;
      Object.keys(load).forEach((key) => {
        legend.push(key + "轴");
        series.push({
          name: key + "轴",
          type: "line",
          smooth: true,
          symbol: "none",
          symbolSize: 8,
          zlevel: 3,
          lineStyle: {
            normal: {
              showdowBlur: 3,
              shwdowOffsetY: 8,
            },
          },
          data: load[key],
        });
      });
      const dataOption = {
        legend: {
          data: legend,
        },
        color: color,
        series: series,
      };
      this.chartInstance.setOption(dataOption);
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
.linChart_box {
  width: 100%;
  height: 280px;
  .chart-container {
    width: 96%;
    height: 90%;
  }
}
.time_box {
  width: 10%;
  text-align: center;
}
.fl {
  float: left;
  height: 100%;
}
.btn {
  width: 80px;
  height: 30px;
  border-radius: 8px;
}
</style>
