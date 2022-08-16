<template>
  <div class="disbute_box">
    <dv-border-box-12>
      <div class="title">▎设备状态分布</div>
      <div class="chart-container" ref="state_distribute_ref"></div>
    </dv-border-box-12>
  </div>
</template>
<script>
let url = "/api/CNC/StatusDistributed";
export default {
  data() {
    return {
      chartInstance: null,
      dataList: [],
      currentIndex: -1,
      animationTimerId: null,
      timer5Sec: null,
      statusmap: {
        0: "复位",
        1: "停止",
        2: "保持进给",
        3: "循环启动",
        4: "指令启动",
        98: "急停",
        99: "报警",
      },
    };
  },
  mounted() {
    this.initChart();
    this.getData();
    window.addEventListener("resize", () => {
      this.screenAdapter();
    });
    this.startInterval();
    this.screenAdapter();
  },
  destroyed() {
    clearInterval(this.animationTimerId);
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
      this.chartInstance = this.$echarts.init(this.$refs.state_distribute_ref);
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
    getData() {
      this.$axios.get(this.$api + url).then((res) => {
        this.dataList = [];
        if (res.data.data !== null) {
          this.dataList = res.data.data;
          this.dataList.forEach((item) => {
            item.name = this.statusmap[item.name];
          });
        }
      });

      this.updateChart();
    },
    updateChart() {
      let seriesData = this.dataList;
      const dataOption = {
        series: {
          data: seriesData,
        },
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
.disbute_box {
  width: 100%;
  height: 380px;
  .title {
    height: 60px;
    line-height: 60px;
    width: 100%;
    color: #fff;
    font-size: 20px;
    padding-left: 30px;
  }
  .chart-container {
    width: 100%;
    height: 80%;
    overflow: hidden;
  }
}
</style>
