<template>
  <div class="reg_con">
    <dv-border-box-12>
      <div class="title">▎加工件数</div>
      <div class="chart-container" ref="loadBar"></div>
    </dv-border-box-12>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chartInstance: null,
      banner: [
        {
          name: "PLC/PMC X",
          isActive: false,
        },
        {
          name: "PLC/PMC Y",
          isActive: true,
        },
        {
          name: "PLC/PMC R",
          isActive: false,
        },
      ],
    };
  },
  mounted() {
    this.initchart();
  },
  methods: {
    bannerClick() {},
    oddEvenCheck() {},
    initchart() {
      this.chartInstance = this.$echarts.init(this.$refs.loadBar);
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
          data: [],
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
            name: "加工件数（件）",
            data: [],
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
.reg_con {
  width: 100%;
  height: 552px;
  color: #fff;
  .banner {
    display: flex;
    flex-direction: row;
    .banner-item {
      flex: 1;
      line-height: 42px;
      margin: 10px 0 0 10px;
      text-align: center;
    }
    .active {
      background: #51d9d9;
    }
  }

  .title {
    height: 50px;
    line-height: 50px;
    width: 100%;
    color: #fff;
    font-size: 22px;
    padding-left: 30px;
  }
  .chart-container {
    // width: 760px;
    // height: 444px;
    height: 90%;
    margin-left: 2%;
  }
}
</style>
