<template>
  <div class="utiliTop">
    <dv-border-box-12>
      <div class="title">▎时间稼动率TOP10</div>
       <div class="chart-container" ref="time_activation_top10"></div>
    </dv-border-box-12>
  </div>
</template>
<script>
export default {
  data(){
    return{
       chartInstance: null,
      xAxisData: [],
      yAxisData: [],
      seriesData: []
    }
  },
  mounted() {
    this.initChart()
    // this.getData()
    window.addEventListener('resize', () => {
      this.screenAdapter()
    })
    this.startInterval()
    this.screenAdapter()
  },
  destroyed() {
    // 在组件销毁时，将监听器注销
    window.removeEventListener('resize', function () {
      this.chartInstance.resize()
    })
    if (this.timer5Sec !== null) {
      clearInterval(this.timer5Sec)
    }
  },
methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.time_activation_top10)
      const initOption = {
        grid: {
          left: '6%',
          right:'9%',
          top: '15%',
          bottom: '22%',
        },
        xAxis: {
          name: '工位名称',
          data:  [],
          nameTextStyle: {
            color: "#ffffff",
            fontSize: 16,
          },
          axisLabel: {
            interval: 0,
            rotate: 30,
            color: '#ffffff',
            fontSize: 16,
          },
          axisLine: {
            lineStyle: {
              color: '#ffffff'
            }
          },
          axisTick: {
              show: false
          }
        },
        yAxis: {
          type: 'value',
          name: '%',
          min: 0,
          max: 100,
          axisLabel: {
            color: '#ffffff',
            fontSize: 16,
          },
          nameTextStyle: {
            color: "#ffffff",
            fontSize: 20,
            lineHeight: 10
          },
        },
        series: [
          {
            type: 'bar',
            barWidth: 20,
            itemStyle: {
              color: '#59ebe8'
            }
          },
        ],
      }
      this.chartInstance.setOption(initOption)
    },
    async getData() {
      this.yAxisData = [0, 20, 40, 60, 80, 100]
      this.updateChart()
    },
    updateChart() {
      const dataOption = {
        xAxis: {
          data: this.xAxisData,
        },
        yAxis: {
          data: this.yAxisData,
        },
        series: [
          {
            data: this.seriesData,
          }
        ]
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter() {
      const adapterOption = {}
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
    startInterval() {
      if (this.timer5Sec != null) {
        clearInterval(this.timer5Sec)
      }
      this.timer5Sec = setInterval(() => {
        this.getData()
      }, 1000 * 5)
    }
  },
}
</script>
<style scoped lang="scss">
.utiliTop{
  width: 100%;
  height: 316px;
  .title{
  height: 60px;
   line-height: 60px;
   width: 100%;
   color: #fff;
   font-size: 20px;
   padding-left: 30px;
  }
  .chart-container {
    width: 100%;
    height: 85%;
  }
}
</style>