<template>
  <div class="eff_con">
    <div class="btn_box">
      <button class="btns" @click="tab(0)">设备运行日志</button>
      <button class="btns" @click="tab(0)">机床效率分析</button>
    </div>
    <div class="con-top">
      <div class="date_box">
        <el-date-picker
          v-model="startTime"
          type="date"
          placeholder="开始日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptionsStart"
          @change="getDate()"
        >
        </el-date-picker>
        <el-time-picker
          v-model="time1"
          value-format="HH:mm:ss"
          placeholder="选择时间"
          @change="getTime()"
        >
        </el-time-picker>
        <el-date-picker
          v-model="endTime"
          type="date"
          placeholder="结束日期"
          value-format="yyyy-MM-dd"
          @change="getDate()"
          :picker-options="pickerOptionsEnd"
        >
        </el-date-picker>
        <el-time-picker
          v-model="time2"
          value-format="HH:mm:ss"
          @change="getTime()"
          placeholder="选择时间"
        >
        </el-time-picker>
        <button class="btn" @click="getData()">查询</button>
      </div>
    </div>
    <div class="con">
      <div class="con-left"></div>
      <div class="con-right">
        <div class="chart-container" ref="loadpross"></div>
      </div>
    </div>
  </div>
</template>
<script>
let url = "http://192.168.20.160:24912/api/CNC/EfficiencyAnalysis?";
export default {
  data() {
    return {
      type: "机械",
      part: "A4奥迪CB转向节",
      chartInstance: null,
      day: "",
      time1: "",
      time2: "",
      xAxisJudge: [
        { val: 0, date: "00:00:00" },
        { val: 24, date: "02:00:00" },
        { val: 48, date: "04:00:00" },
        { val: 72, date: "06:30:00" },
        { val: 96, date: "08:00:00" },
        { val: 96, date: "10:00:00" },
        { val: 96, date: "12:00:00" },
        { val: 0, date: "14:00:00" },
        { val: 24, date: "16:00:00" },
        { val: 48, date: "18:00:00" },
        { val: 72, date: "20:00:00" },
        { val: 96, date: "22:00:00" },
        { val: 96, date: "24:00:00" },
      ],
      startTime: "",
      endTime: "",
      //时间选择限制
      pickerOptionsStart: {
        disabledDate: (time) => {
          if (this.endTime != "") {
            return (
              time.getTime() > Date.now() - 8.64e6 ||
              time.getTime() >= new Date(this.endTime).getTime()
            );
          } else {
            return time.getTime() > Date.now() - 8.64e6;
          }
        },
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          return (
            time.getTime() <= new Date(this.startTime).getTime() ||
            time.getTime() > Date.now() - 8.64e6
          );
        },
      },
      data: [],
      DeviceNames: [],
      table: {
        state: 1,
        message: "查询所有设备某个时段全部状态成功",
        data: {
          statusTotals: [
            [
              {
                Id: null,
                DeviceId: "A183AA3A-7274-48D5-AADC-53009B7DC203",
                DeviceName: "立式加工中心",
                DeviceStatus: 0,
                StartTime: "2022-05-24T08:24:24",
                EndTime: "2022-05-24T10:24:24",
                Duration: 0,
                CreateTime: "0001-01-01T00:00:00",
                CurrentProgramNumber: 0,
                CurrentProgramName: null,
              },
            ],
            [
              {
                Id: null,
                DeviceId: "D55F897D-D483-4E84-9928-BC6338C5C4C5",
                DeviceName: "立式车床",
                DeviceStatus: 98,
                StartTime: "2022-05-24T09:24:24",
                EndTime: "2022-05-24T10:24:24",
                Duration: 0,
                CreateTime: "0001-01-01T00:00:00",
                CurrentProgramNumber: 0,
                CurrentProgramName: null,
              },
              {
                Id: null,
                DeviceId: "D55F897D-D483-4E84-9928-BC6338C5C4C5",
                DeviceName: "立式车床",
                DeviceStatus: 0,
                StartTime: "2022-05-24T10:24:24",
                EndTime: "2022-05-24T12:24:24",
                Duration: 0,
                CreateTime: "0001-01-01T00:00:00",
                CurrentProgramNumber: 0,
                CurrentProgramName: null,
              },
            ],
          ],
          ration: [
            {
              runRatio: 0.0,
              ExceptionRatio: 0.0,
              stopRatio: 0.0,
            },
            {
              runRatio: 0.0,
              ExceptionRatio: 0.0,
              stopRatio: 0.0,
            },
          ],
          timeReusle: [
            {
              CycleStartDurtion: 0.0,
              ExceptionDuration: 0.0,
              StopDuration: 0.0,
            },
            {
              CycleStartDurtion: 0.0,
              ExceptionDuration: 0.0,
              StopDuration: 0.0,
            },
          ],
        },
      },
    };
  },
  mounted() {
    this.initchart();
  },
  created() {
    // this.getData();
    this.getProcessData(this.table.data);
  },
  methods: {
    renderItem(params, api) {
      var categoryIndex = api.value(0);
      var start = api.coord([api.value(1), categoryIndex]);
      var end = api.coord([api.value(2), categoryIndex]);
      var height = api.size([0, 1])[1] * 0.6;

      var rectShape = this.$echarts.graphic.clipRectByRect(
        {
          x: start[0],
          y: start[1] - height / 2,
          width: end[0] - start[0],
          height: height,
        },
        {
          x: params.coordSys.x,
          y: params.coordSys.y,
          width: params.coordSys.width,
          height: params.coordSys.height,
        }
      );

      return (
        rectShape && {
          type: "rect",
          shape: rectShape,
          style: api.style(),
        }
      );
    },
    initChart2() {
      let xJ = this.xAxisJudge;
      this.chartInstance = this.$echarts.init(this.$refs.loadpross);
      const option = {
        //  backgroundColor: "#091034",
        legend: {
          top: "80%",
          data: ["开机时间", "加工时间", "待机时间", "离线时间", "报警时间"],
          textStyle: {
            color: "#ccc",
          },
        },
        grid: {
          containLabel: true,
          left: 10,
          right: 10,
        },
        tooltip: {},
        xAxis: {
          // axisLine: {
          //   show: false,
          // },
          // axisTick: {
          //   show: false,
          // },
          // splitLine: {
          //   show: false,
          // },
          // axisLabel: {
          //   show: false,
          // },
          type: "value",
          axisLabel: {
            formatter: function (value) {
              let texts = [];
              for (let i = 0; i < xJ.length; i++) {
                if (value <= xJ[i].val) {
                  texts.push(xJ[i].date);
                  break;
                }
              }
              if (texts.length == 0) {
                texts = [" "];
              }
              return texts;
            },
          },
        },
        yAxis: {
          data: [""],
          axisLabel: {
            fontSize: 16,
            color: "#fff",
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            type: "bar",
            name: "开机时间",
            stack: "2",
            label: {
              normal: {
                show: true,
                position: "inside",
                textStyle: {
                  color: "#fff",
                  fontSize: 16,
                },
              },
            },
            barWidth: 40,
            itemStyle: {
              normal: {
                color: "#00ABF9",
              },
            },
            data: [1],
          },
          {
            type: "bar",
            name: "加工时间",
            stack: "2",
            label: {
              normal: {
                position: "inside",
                textStyle: {
                  color: "#fff",
                  fontSize: 16,
                },
              },
            },
            barWidth: 40,
            itemStyle: {
              normal: {
                color: "#56BC5B",
              },
            },
            data: [30],
          },
          {
            type: "bar",
            name: "待机时间",
            stack: "2",
            label: {
              normal: {
                position: "inside",
                textStyle: {
                  color: "#fff",
                  fontSize: 16,
                },
              },
            },
            barWidth: 40,
            itemStyle: {
              normal: {
                color: "#FFC000",
              },
            },
            data: [30],
          },
          {
            type: "bar",
            name: "离线时间",
            stack: "2",
            label: {
              normal: {
                position: "inside",
                textStyle: {
                  color: "#fff",
                  fontSize: 16,
                },
              },
            },
            barWidth: 40,
            itemStyle: {
              normal: {
                color: "#C0CABF",
              },
            },
            data: [30],
          },
          {
            type: "bar",
            name: "报警时间",
            stack: "2",
            label: {
              normal: {
                position: "inside",
                textStyle: {
                  color: "#fff",
                  fontSize: 16,
                },
              },
            },
            barWidth: 40,
            itemStyle: {
              normal: {
                color: "#FF5C47",
              },
            },
            data: [30],
          },
        ],
      };
      this.chartInstance.setOption(option);
    },
    getDate() {
      console.log(this.endTime);
      console.log(this.startTime);
    },
    getData() {
      let time3 = this.startTime + " " + this.time1;
      let time4 = this.endTime + " " + this.time2;
      let startTime = this.getTimestamp(time3);
      let endTime = this.getTimestamp(time4);
      let url1 = url + "startTime=" + startTime + "&" + "endTime=" + endTime;
      console.log(url1);
      this.data = [];
      if (
        this.startTime === "" ||
        this.endTime === "" ||
        this.time1 === "" ||
        this.time2 === ""
      ) {
        return false;
      } else {
        this.$axios.get(url1).then((res) => {
          console.log(res);

          // if(res.data.)
          if (res.data.state === 0) {
            return false;
          } else {
            this.data = res.data.data;
          }
        });
      }
    },
    getTime() {
      console.log(this.time2);
      console.log(this.time1);
    },
    getTimestamp(time) {
      return new Date(time).getTime();
    },
    getProcessData(data) {
      console.log(this.table);
      data.statusTotals.forEach((item) => {
        item.forEach((item1) => {
          console.log(item1);
          console.log(item);
          console.log(this.Timeconversion(item.StartTime));
          console.log(item[0].StartTime);
        });
      });
    },
    //时间转换
    Timeconversion(time) {
      console.log(time);
      let zoneDate = new Date(time).toJSON();
      let date = new Date(+new Date(zoneDate) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
      return date;
    },
    //页面切换
    tab(val) {
      console.log(val);
    },
  },
};
</script>
<style scoped lang="scss">
.eff_con {
  background: #032040;
  // height: calc(100vh - 114px);
  // margin-top: 30px;
  // padding: 30px;
}
.con-top {
  width: 100%;
  height: 100px;
  color: #fff;
  font-size: 18px;
  line-height: 100px;
}
.fl {
  float: left;
}
.con {
}
.con-left {
  // width: 40%;
  // height: calc(100vh - 270px);
  // color: #fff;
  // font-size: 18px;
}
.con-right {
  width: 100%;
  height: calc(100vh - 114px);
}
.text {
  color: #2874ae;
  margin-bottom: 10px;
  font-size: 18px;
}
.bottom {
  margin-top: 600px;
}
.chart-container {
  width: 95%;
  height: 20%;
  margin-left: 2%;
}
/deep/.el-input__inner {
  background: #354558;
  color: #fff;
}
/deep/.el-range-input {
  background: #354558;
  color: #fff;
}
.date_box {
  margin: 50px;
}
.btn {
  padding: 0;
  background: #354558;
  width: 100px;
  height: 46px;
  line-height: 30px;
  color: #fff;
  font-size: 16px;
  border-radius: 8px;
  margin-left: 10px;
  outline: none;
  border: 1px solid #fff;
  cursor: pointer;
}
.btns {
  padding: 10px;
  background: #354558;
  height: 46px;
  line-height: 30px;
  color: #fff;
  font-size: 16px;
  border-radius: 8px;
  margin-left: 10px;
  outline: none;
  border: 1px solid #fff;
  cursor: pointer;
}
.btn_box {
  padding-top: 40px;
}
.show {
  display: none;
}
</style>
