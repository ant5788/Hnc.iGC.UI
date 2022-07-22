<template>
  <div class="reg_con">
    <dv-border-box-12>
      <div class="title">▎设备运行时间</div>
      <div class="chart-container" ref="loadBar"></div>
    </dv-border-box-12>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chartInstance: null,
      dataList: [],
    };
  },
  mounted() {
    this.initchart();
  },
  methods: {
    initchart() {
      this.chartInstance = this.$echarts.init(this.$refs.loadBar);
      const initOption = {
        color: ["#FF343F", "#FFCF21", "#00FF7F", "#808080"],
        series: {
          type: "pie",
          clockwise: false, //饼图的扇区是否是顺时针排布
          minAngle: 2, //最小的扇区角度（0 ~ 360）
          radius: ["40%", "60%"],
          center: ["50%", "55%"],
          avoidLabelOverlap: false,
          itemStyle: {
            //图形样式
            normal: {
              borderColor: "#ffffff",
              borderWidth: 1,
            },
          },
          label: {
            normal: {
              show: true,
              formatter: "{b|{b}:}\n{per|{d}%}",
              rich: {
                b: {
                  color: "#fff",
                  fontSize: 18,
                  padding: 8,
                },
                per: {
                  fontSize: 18,
                },
              },
            },
          },
          data: [],
        },
      };
      this.chartInstance.setOption(initOption);
    },
    //获取设备运行时间
    getdata() {
      this.updateChart();
    },
    //更新设备数据
    updateChart() {
      let seriesData = this.dataList;
      const dataOption = {
        series: {
          data: seriesData,
        },
      };
      this.chartInstance.setOption(dataOption);
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
