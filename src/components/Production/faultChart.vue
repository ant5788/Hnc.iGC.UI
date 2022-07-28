<template>
  <div>
    <div class="date_box fl">
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-select v-model="form.deviceId" placeholder="请选择机床">
            <el-option
              v-for="item in deviceList"
              :key="item.id"
              :value="item.DeviceId"
              :label="item.DeviceName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="form.startTime"
            type="datetime"
            value-format="timestamp"
            placeholder="开始日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="form.endTime"
            type="datetime"
            value-format="timestamp"
            placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query" class="btn">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="chart-container fl" ref="loadBar"></div>
  </div>
</template>
<script>
let url = "/api/CNC/CumulativeProduction?";
let DeviceUrl = "/api/CNC/GetDeviceList";
export default {
  data() {
    return {
      chartInstance: null,
      time1: "",
      time2: "",
      startTime: "",
      endTime: "",
      data: [],
      form: { deviceId: "", startTime: "", endTime: "" },
      deviceList: [
        {
          Id: "G09K23IEYNA",
          DeviceId: "A183AA3A-7274-48D5-AADC-53009B7DC203",
          DeviceName: "立式加工中心",
          Description: "V1160L",
          Ip: "192.168.18.2",
          Port: "8193",
        },
        {
          Id: "HM7KLAGTI7T",
          DeviceId: "D55F897D-D483-4E84-9928-BC6338C5C4C5",
          DeviceName: "立式车床",
          Description: "VTC850",
          Ip: "192.168.18.3",
          Port: "8193",
        },
      ],
      xdata: [
        "2022-06-01",
        "2022-06-02",
        "2022-06-03",
        "2022-06-04",
        "2022-06-05",
        "2022-06-06",
        "2022-06-07",
      ],
      Ydata: [200, 160, 300, 360, 400, 380, 300],
      deviceId: "",
    };
  },
  mounted() {
    this.getdeviceId();
    this.initChart();
  },
  methods: {
    query() {
      console.log(this.form);
      this.$axios
        .get(
          this.$api +
            url +
            "startTime=" +
            this.form.startTime +
            "&endTime=" +
            this.form.endTime +
            "&deviceId=" +
            this.deviceId
        )
        .then((res) => {
          this.data = res.data.data;
          if (this.data != null) {
            this.data.forEach((item) => {
              console.log(item);
              this.xdata.push(item.Time);
              this.Ydata.push(item.Total);
            });
            //获取数据后加载获取echart的方法
            this.chartInstance = this.$echarts.init(this.$refs.loadBar);
            let initOption = {
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
                data: this.xdata,
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
                  name: "累计产量",
                  data: this.Ydata,
                  type: "bar",
                },
              ],
            };
            this.chartInstance.setOption(initOption);
          }
        });
    },
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.loadBar);
      let initOption = {
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
          data: this.xdata,
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
            name: "累计产量",
            data: this.Ydata,
            type: "bar",
          },
        ],
      };
      this.chartInstance.setOption(initOption);
    },
    getTimestamp(time) {
      return new Date(time).getTime();
    },
    getdevice() {
      this.$axios.get(this.$api + DeviceUrl).then((res) => {
        if (res.data.state === 1) {
          this.deviceList = res.data.data;
        }
      });
    },
    getdeviceId(val) {
      this.deviceId = val;
    },
  },
};
</script>
<style scoped lang="scss">
.chart-container {
  width: 80%;
  height: 440px;
  padding-top: 20px;
  background: #0a2a55;
}
.date_box {
  padding-top: 20px;
  width: 18%;
  height: 440px;
  background: #0a2a55;
  margin-left: 2%;
}
.fl {
  float: left;
}
.el-date-editor.el-input {
  // width: 150px;
  margin: 10px;
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
</style>
