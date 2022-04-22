<template>
  <div class="bars_box">
    <div class="choose fl">
      <p>
        <button
          :class="index === 0 ? 'btn active' : 'btn'"
          @click="chooseChart(0)"
        >
          日期
        </button>
      </p>
      <p>
        <button
          :class="index === 1 ? 'btn active' : 'btn'"
          @click="chooseChart(1)"
        >
          产量
        </button>
      </p>
    </div>
    <div class="chart_box fl">
      <div
        class="chart-container"
        ref="loadBar_Yield"
        v-show="index === 1"
      ></div>
      <div
        class="chart-container"
        ref="loadBar_date"
        v-show="index === 0"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chartInstance: null,
      index: 0,
    };
  },
  mounted() {
    this.initChartdate();
    this.initChartYield();
  },
  methods: {
    initChartdate() {
      this.chartInstance = this.$echarts.init(this.$refs.loadBar_date);
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
            name: "加工件数（件）",
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
    initChartYield() {
      this.index = 1;
      this.chartInstance = this.$echarts.init(this.$refs.loadBar_Yield);
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
    //切换
    chooseChart(index) {
      console.log(index);
      this.index = index;
    },
  },
};
</script>
<style scoped lang="scss">
.bars_box {
  height: 444px;
  width: 100%;
}
// .chart_box {
//   width: 80%;
// }
.chart-container {
  width: 760px;
  height: 444px;
  margin-left: 2%;
}
.fl {
  float: left;
}
.btn {
  padding: 0;
  width: 98px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  border-radius: 8px;
  outline: none;
}
.active {
  background: #41b9e2;
  color: #fff;
  border: 1px solid #41b9e2;
}
</style>
