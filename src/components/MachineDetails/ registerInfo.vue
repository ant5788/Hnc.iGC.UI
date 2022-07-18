<template>
  <div class="reg_con">
    <dv-border-box-12>
      <div class="title">▎设备嫁动率</div>
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
      regForm: {
        header: ["地址", "二进制", "十六进制"],
        body: [
          ["Y0", "10000000", "0x81"],
          ["Y1", "10000001", "0x82"],
          ["Y3", "10000010", "0x83"],
          ["Y4", "10000011", "0x84"],
          ["Y5", "10000100", "0x85"],
          ["Y6", "10000101", "0x86"],
          ["Y7", "10000110", "0x87"],
          ["Y8", "10000111", "0x88"],
          ["Y8", "10001000", "0x89"],
          ["Y9", "10001001", "0x8a"],
          ["Y10", "10001010", "0x8b"],
          ["Y11", "10001011", "0x8c"],
        ],
      },
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
          data: [
           
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
