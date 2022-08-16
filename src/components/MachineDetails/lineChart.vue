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
            type="date"
            v-model="time"
            class="time"
            v-show="index === 4"
            value-format="yyyy-MM-dd"
            @change="getday"
          ></el-date-picker>
          <el-date-picker
            v-model="month"
            type="month"
            class="time"
            placeholder="选择月"
            value-format="yyyyMM"
            v-show="index === 6"
            @change="getMoth(month)"
          >
          </el-date-picker>
          <el-date-picker
            v-show="index === 5"
            v-model="value1"
            value-format="timestamp"
            class="time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="getTime(value1)"
          >
          </el-date-picker>
        </p>
      </div>
      <div class="chart-container fl" ref="load_diagram_ref"></div>
    </dv-border-box-12>
  </div>
</template>
<script>
let MakeUrl = "/api/CNC/GetMakeNumber?";
export default {
  data() {
    return {
      Shift: "4",
      time: this.$utils.getDateTime("day"),
      index: 0,
      chartInstance: null,
      value1: "",
      shiftInfo: [
        { value: "1", label: "早班" },
        { value: "2", label: "中班" },
        { value: "3", label: "晚班" },
        { value: "4", label: "日期" },
        { value: "5", label: "时间段" },
        { value: "6", label: "月" },
      ],
      xdata: [],
      Ydata: [],
      startTime: "",
      endTime: "",
      MagData: [],
      AluData: [],
      month: "",
    };
  },
  mounted() {
    this.initChart();
    this.changeModel();
    window.addEventListener("resize", () => {
      this.screenAdapter();
    });
  },
  created() {
    this.startTime = this.$utils.getTimestamp(
      this.$utils.getDateTime("day") + " " + "00:00:00"
    );
    this.endTime = this.$utils.getTimestamp(
      this.$utils.getDateTime("day") + " " + "23:59:59"
    );
    this.getAxisData(this.startTime, this.endTime);
  },
  methods: {
    //月的选择
    getMoth(moth) {
      console.log(moth);
      this.$utils.getMonthLastDateFn(moth);
      this.startTime = this.$utils.getTimestamp(
        this.$utils.startTime(moth) + " " + "00:00:00"
      );
      this.endTime = this.$utils.getTimestamp(
        this.$utils.endTime(moth) + " " + "23:59:59"
      );
      this.getAxisData(this.startTime, this.endTime);
    },
    //日期选择
    getday(val) {
      this.startTime = this.$utils.getTimestamp(val);
      this.endTime = this.$utils.getTimestamp(val + " " + "23:59:59");
      this.getAxisData(this.startTime, this.endTime);
    },
    //时间段选择
    getTime(val) {
      console.log(val);
      this.startTime = val[0];
      this.endTime = val[1];
      this.getAxisData(this.startTime, this.endTime);
    },
    getAxisData(startTime, endTime) {
      let id = this.$utils.getUrlParams(window.location.search, "id");
      let mark = 0;
      if (this.index === 5 || this.index === 6) {
        mark = 1;
      }
      console.log(
        this.$api +
          MakeUrl +
          "&deviceId=" +
          id +
          "&mark=" +
          mark +
          "&startTime=" +
          startTime +
          "&endTime=" +
          endTime
      );
      this.$axios
        .get(
          this.$api +
            MakeUrl +
            "&mark=" +
            mark +
            "&deviceId=" +
            id +
            "&startTime=" +
            this.startTime +
            "&endTime=" +
            this.endTime
        )
        .then((res) => {
          console.log(res);
          if (res.data.data !== null) {
            this.xdata = [];
            this.Ydata = [];
            this.MagData = [];
            this.AluData = [];
            let data = res.data.data;
            data.forEach((item) => {
              this.xdata.push(item.Time);
              this.Ydata.push(item.Total);
              this.MagData.push(item.MagnesiumTotal);
              this.AluData.push(item.AluminumTotal);
            });
          }
          this.updateChart();
        });
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
            name: "总加工数量",
            data: [],
            type: "bar",
          },
          {
            name: "镁加工数量",
            data: [],
            type: "bar",
          },
          {
            name: "铝加工数量",
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
        series: [
          {
            name: "总加工数量",
            data: this.Ydata,
            type: "bar",
          },
          {
            name: "镁加工数量",
            data: this.MagData,
            type: "bar",
          },
          {
            name: "铝加工数量",
            data: this.AluData,
            type: "bar",
          },
        ],
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
/deep/.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 134px;
}
</style>
