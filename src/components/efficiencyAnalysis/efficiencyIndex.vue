<template>
  <div class="eff_con">
    <div class="con-top">
      <span>{{ type }}</span>
      <span>></span>
      <span>{{ part }}</span>
    </div>
    <div class="con">
      <div class="con-left fl">
        <div class="text">▎设备基本数据</div>
        <div class="state">运行</div>
        <div class="">今日加工件数：11件</div>
        <div class="text bottom">▎当前报警</div>
        <div class="">当前报警个数：无</div>
      </div>
      <div class="con-right fl">
        <div class="date_box">
          <el-date-picker
            v-model="day"
            type="date"
            placeholder="日期"
            value-format="yyyy-MM-dd"
            @change="getDate()"
          >
          </el-date-picker>
          <el-time-picker
            is-range
            v-model="time"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          >
          </el-time-picker>
        </div>
        <div class="chart-container" ref="loadpross"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: "机械",
      part: "A4奥迪CB转向节",
      chartInstance: null,
      day: "",
      time: "",
      xAxisJudge: [
        { val: 0, date: "00:00:00" },
        { val: 24, date: "09:30:00" },
        { val: 48, date: "11:00:00" },
        { val: 72, date: "12:30:00" },
        { val: 96, date: "14:00:00" },
      ],
    };
  },
  mounted() {
    this.initChart2();
  },
  methods: {
    initchart() {
      let xJ = this.xAxisJudge;
      this.chartInstance = this.$echarts.init(this.$refs.loadpross);
      const initOption = {
        legend: {
          data: ["开机时间", "加工时间", "待机时间", "离线时间", "报警时间"],
          x: "center", //可设置图例位置
          y: "bottom",
          //   orient: "vertical",
          itemWidth: 7,
          itemHeight: 7,
          itemGap: 40,
          textStyle: {
            color: "#89A7AF",
          },
        },
        tooltip: {
          show: true,
          formatter: "{b} <br> {c}%",
        },
        xAxis: {
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
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#fff",
            },
          },
        },
        series: [
          {
            name: "开机时间",
            type: "bar",
            barWidth: 16,
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: ["00:00", 10],
          },
          {
            name: "加工时间",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: ["01:00", 20],
          },
          {
            name: "待机时间",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: ["11:00", 40],
          },
          {
            name: "离线时间",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: ["12:00", 50],
          },
          {
            name: "报警时间",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: ["14:00", 0],
          },
        ],
      };
      this.chartInstance.setOption(initOption);
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
            data: [10],
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
    getDate() {},
  },
};
</script>
<style scoped lang="scss">
.eff_con {
  background: #032040;
  height: calc(100vh - 114px);
  margin-top: 30px;
  padding: 30px;
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
  width: 15%;
  height: calc(100vh - 270px);
  color: #fff;
  font-size: 18px;
}
.con-right {
  width: 85%;
  height: calc(100vh - 270px);
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
</style>
