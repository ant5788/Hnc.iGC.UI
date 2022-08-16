<template>
  <div>
    <div class="left fl">
      <leftNav></leftNav>
    </div>
    <div class="con fl">
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-time-picker
            is-range
            v-model="form.time"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            value-format="HH:mm:ss"
          >
          </el-time-picker
        ></el-form-item>
        <el-form-item
          ><el-button type="primary" @click="query">
            查询</el-button
          ></el-form-item
        >
      </el-form>
      <div class="chart-container" ref="text"></div>
    </div>
  </div>
</template>
<script>
import leftNav from "../common/leftNav.vue";
import { dataAssembly, formatters, formateText, renderItem } from "./data";
let query = "/api/CNC/EfficiencyAnalysis?";
export default {
  components: { leftNav },
  data() {
    return {
      chartInstance: null,
      colors: [
        "#95EC69",
        "#FFC600",
        "#3A80EA",
        "#1583A2",
        "#00B8F5",
        "#EF4848",
        "#C1CDC1",
      ],
      state: [],
      statusmap: {
        0: "复位",
        1: "停止",
        2: "进给保持",
        3: "循环启动",
        4: "启动状态",
        99: "报警",
        98: "离线",
      },
      Ydata: [],
      seriesData: [],
      timeArry: [],
      minTime: "",
      form: { date: "", time: "" },
      statusTotals: [
        {
          Id: null,
          flag: 0,
          DeviceId: "A183AA3A-7274-48D5-AADC-53009B7DC203",
          DeviceName: "立式加工中心",
          DeviceStatus: 0,
          StartTime: "2022-05-31T08:00:00",
          EndTime: "2022-05-31T09:00:00",
          Duration: 3,
          Rate: 10,
          run: 20,
          CreateTime: "0001-01-01T00:00:00",
          CurrentProgramNumber: 0,
          CurrentProgramName: null,
        },
        {
          Id: null,
          flag: 0,
          DeviceId: "A183AA3A-7274-48D5-AADC-53009B7DC203",
          DeviceName: "立式加工中心",
          DeviceStatus: 1,
          StartTime: "2022-05-31T09:56:13",
          EndTime: "2022-05-31T10:56:13",
          Duration: 0,
          Rate: 30,
          run: 20,
          CreateTime: "0001-01-01T00:00:00",
          CurrentProgramNumber: 0,
          CurrentProgramName: null,
        },
        {
          Id: null,
          DeviceId: "A183AA3A-7274-48D5-AADC-53009B7DC203",
          DeviceName: "立式加工中心",
          DeviceStatus: 2,
          Rate: 40,
          run: 20,
          StartTime: "2022-05-31T10:59:13",
          EndTime: "2022-05-31T11:59:13",
          Duration: 1,
          CreateTime: "0001-01-01T00:00:00",
          CurrentProgramNumber: 0,
          CurrentProgramName: null,
        },
        {
          Id: null,
          flag: 0,
          DeviceId: "A183AA3A-7274-48D5-AADC-53009B7DC203",
          DeviceName: "立式加工中心",
          DeviceStatus: 3,
          StartTime: "2022-05-31T12:04:13",
          EndTime: "2022-05-31T13:04:13",
          Duration: 1.54,
          CreateTime: "0001-01-01T00:00:00",
          CurrentProgramNumber: 0,
          CurrentProgramName: null,
          Rate: 50,
          run: 20,
        },
        {
          Id: null,
          flag: 0,
          DeviceId: "A183AA3A-7274-48D5-AADC-53009B7DC203",
          DeviceName: "立式加工中心",
          DeviceStatus: 4,
          StartTime: "2022-05-31T14:56:13",
          EndTime: "2022-05-31T15:58:13",
          Duration: 2.03,
          CreateTime: "0001-01-01T00:00:00",
          CurrentProgramNumber: 0,
          CurrentProgramName: null,
          Rate: 60,
          run: 20,
        },
        // {
        //   Id: null,
        //   flag: 0,
        //   DeviceId: "A183AA3A-7274-48D5-AADC-53009B7DC203",
        //   DeviceName: "立式加工中心",
        //   DeviceStatus: 0,
        //   StartTime: "2022-05-31T10:25:12",
        //   EndTime: "2022-05-31T14:25:12",
        //   Duration: 0,
        //   CreateTime: "0001-01-01T00:00:00",
        //   CurrentProgramNumber: 0,
        //   CurrentProgramName: null,
        // },
        // {
        //   Id: null,
        //   flag: 0,
        //   DeviceId: "A183AA3A-7274-48D5-AADC-53009B7DC203",
        //   DeviceName: "立式加工中心",
        //   DeviceStatus: 0,
        //   StartTime: "2022-05-31T08:24:24",
        //   EndTime: "2022-05-31T10:24:24",
        //   Duration: 0,
        //   CreateTime: "0001-01-01T00:00:00",
        //   CurrentProgramNumber: 0,
        //   CurrentProgramName: null,
        // },

        // {
        //   Id: null,
        //   flag: 1,
        //   DeviceId: "D55F897D-D483-4E84-9928-BC6338C5C4C5",
        //   DeviceName: "立式车床",
        //   DeviceStatus: 98,
        //   StartTime: "2022-05-31T09:24:24",
        //   EndTime: "2022-05-31T10:24:24",
        //   Duration: 0,
        //   CreateTime: "0001-01-01T00:00:00",
        //   CurrentProgramNumber: 0,
        //   CurrentProgramName: null,
        // },
        // {
        //   Id: null,
        //   flag: 1,
        //   DeviceId: "D55F897D-D483-4E84-9928-BC6338C5C4C5",
        //   DeviceName: "立式车床",
        //   DeviceStatus: 0,
        //   StartTime: "2022-05-31T09:24:24",
        //   EndTime: "2022-05-31T10:24:24",
        //   Duration: 0,
        //   CreateTime: "0001-01-01T00:00:00",
        //   CurrentProgramNumber: 0,
        //   CurrentProgramName: null,
        // },
      ],
    };
  },
  mounted() {
    this.initChart();
  },
  created() {
    this.processData();
  },
  methods: {
    query() {
      console.log(this.form);
      let startTime = this.$utils.getTimestamp(
        this.form.date + " " + this.form.time[0]
      );
      console.log(this.form.date + " " + this.form.time[0]);
      let endTime = this.$utils.getTimestamp(
        this.form.date + " " + this.form.time[1]
      );
      console.log(startTime);
      console.log(endTime);
      this.$axios
        .get(this.$api + query + startTime + "&" + endTime)
        .then((res) => {
          console.log(res);
        });
    },
    useEffect() {},
    initChart() {
      const arrData = dataAssembly();
      this.chartInstance = this.$echarts.init(this.$refs.text);
      let initOption = {
        color: this.colors,
        tooltip: {
          formatter: (params) => {
            console.log(params.value[3]);
            let stateText = formateText(params.color);
            let startTimer = formatters(params.value[1]);
            let endTimer = formatters(params.value[2]);
            return (
              `${stateText}时间：` +
              startTimer +
              "~" +
              endTimer +
              `<br>` +
              "稼动率" +
              params.value[3] +
              `<br>` +
              "运动率" +
              params.value[4]
            );
          },
        },
        legend: {
          data: this.state,
          bottom: "1%",
          selectedMode: false,
          textStyle: {
            color: "#fff",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          top: "1%",
          bottom: "2%",
          containLabel: true,
          height: 500,
        },
        xAxis: {
          type: "time",
          scale: true,
          interval: 3600 * 1000,
          min: this.minTime,
          // splitNumber: 12,
          axisLabel: {
            formatter: function (value) {
              var date = new Date(value);
              return getzf(date.getHours()) + ":00";
              function getzf(num) {
                if (parseInt(num) < 10) {
                  num = "0" + num;
                }
                return num;
              }
            },
          },
        },
        yAxis: {
          data: this.Ydata,
        },
        series: [
          { name: this.state[0], type: "bar", data: [] },
          { name: this.state[1], type: "bar", data: [] },
          { name: this.state[2], type: "bar", data: [] },
          { name: this.state[3], type: "bar", data: [] },
          { name: this.state[4], type: "bar", data: [] },
          { name: this.state[5], type: "bar", data: [] },
          { name: this.state[6], type: "bar", data: [] },
          {
            type: "custom",
            renderItem: renderItem,
            encode: {
              x: [1, 2],
              y: 0,
            },
            data: this.seriesData,
          },
        ],
      };
      this.chartInstance.setOption(initOption);
      console.log(arrData);
    },
    processData() {
      this.statusTotals.forEach((item) => {
        console.log(item);
        this.Ydata.push(item.DeviceName);
        item.Name = this.statusmap[item.DeviceStatus];
        this.state.push(item.Name);
        item.StartTime = this.$utils.Timeconversion(item.StartTime);
        item.EndTime = this.$utils.Timeconversion(item.EndTime);
        this.timeArry.push(item.StartTime);
        this.seriesData.push({
          itemStyle: { normal: { color: this.colors[item.DeviceStatus] } },
          name: item.Name,
          value: [item.flag, item.StartTime, item.EndTime, item.Rate, item.run],
        });
      });
      this.minTime = this.sort(this.timeArry);
    },
    sort(array) {
      let time = array.sort(
        (a, b) => new Date(a).valueOf() - new Date(b).valueOf()
      )[0];
      return time;
    },
  },
};
</script>
<style scoped lang="scss">
.fl {
  float: left;
}
.left {
  width: 14%;
  margin-top: 20px;
  margin-right: 10px;
}
.con {
  width: 85%;
  margin-top: 20px;
}
.chart-container {
  width: 80%;
  height: 600px;
  padding-top: 20px;
  background: #0a2a55;
}

/deep/.el-input__inner {
  background: #354558;
  color: #fff;
}
/deep/.el-select {
  margin-left: 10px;
}
.btn {
  width: 100px;
  margin-left: 50px;
}
/deep/.el-range-editor .el-range-input {
  line-height: 1;
  background: #354558;
  color: #fff;
}
/deep/.el-date-editor .el-range-separator {
  color: #fff;
}
</style>
