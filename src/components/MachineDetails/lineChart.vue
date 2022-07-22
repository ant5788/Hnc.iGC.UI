<template>
  <div class="linChart_box">
    <dv-border-box-12>
      <div class="time_box fl">
        <p>
          <el-select
            v-model="Shift"
            placeholder="请选择时间"
            class="shif"
            @change="changeModel"
          >
            <el-option
              v-for="item in shiftInfo"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </p>
        <p>
          <el-date-picker
            type="datetime"
            v-model="time"
            class="time"
            v-show="index === 5"
          ></el-date-picker>
        </p>
      </div>
      <div class="chart-container fl" ref="load_diagram_ref"></div>
    </dv-border-box-12>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Shift: "",
      time: "",
      index: 0,
      chartInstance: null,
      shiftInfo: [
        { value: "1", label: "早班" },
        { value: "2", label: "中班" },
        { value: "3", label: "晚班" },
        { value: "4", label: "当天" },
        { value: "5", label: "时间段" },
      ],
      xdata: [],
      Ydata: [],
    };
  },
  mounted() {
    this.initChart();
    this.getAxisData();
    window.addEventListener("resize", () => {
      this.screenAdapter();
    });
  },
  methods: {
    getAxisData() {
      this.updateChart();
    },
    //数据切换
    changeModel() {
      console.log(this.Shift);
      this.index = Number(this.Shift);
    },
    //初始化图表信息
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.load_diagram_ref);
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
            name: "加工件数",
            data: [],
            type: "bar",
          },
        ],
      };
      this.chartInstance.setOption(initOption);
    },
    //更新图表数据
    updateChart() {
      this.chartInstance = this.$echarts.init(this.$refs.load_diagram_ref);
      const dataOption = {
        xAxis: { data: this.xdata },
        series: {
          data: this.Ydata,
        },
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
    margin-top: 18px;
    width: 85%;
    height: 90%;
  }
}
.time_box {
  width: 14%;
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
.shif {
  width: 120px;
  margin-left: 10px;
}
.time {
  margin-left: 10px;
}
</style>
