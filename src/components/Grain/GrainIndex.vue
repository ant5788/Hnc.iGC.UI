<template>
  <div>
    <Header :title="title"></Header>
    <div class="left fl">
      <leftNav></leftNav>
    </div>
    <div class="con fl">
      <div class="dete_box fl">
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
            <el-button type="primary" @click="query" class="btn"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="chart-container fl" ref="bar"></div>
    </div>
  </div>
</template>
<script>
let query = "/api/CNC/MarriageRate?";
let DeviceUrl = "/api/CNC/GetDeviceList";
import leftNav from "../common/leftNav.vue";
import Header from "../common/Header.vue";
export default {
  components: { leftNav, Header },
  data() {
    return {
      chartInstance: null,
      form: { deviceId: "", startTime: "", endTime: "" },
      deviceList: [],
      data: [],
      title: "设备嫁动率/运动率",
    };
  },
  mounted() {
    this.initEchart();
  },
  created() {
    this.getdevice();
  },
  methods: {
    getdevice() {
      this.$axios.get(this.$api + DeviceUrl).then((res) => {
        if (res.data.state === 1) {
          this.deviceList = res.data.data;
        }
      });
    },
    query() {
      if (
        (this.form.startTime !== "") &
        (this.form.endTime !== "") &
        (this.form.deviceId !== "")
      ) {
        this.$axios
          .get(
            this.$api +
              query +
              "startTime=" +
              this.form.startTime +
              "&endTime=" +
              this.form.endTime +
              "&deviceId=" +
              this.form.deviceId
          )
          .then((res) => {
            console.log(res);
            if (res.data.state === 1) {
              if (res.data.data !== null) {
                this.data = res.data.data;
                this.updateChart();
              }
            }
          });
      }
    },
    initEchart() {
      this.chartInstance = this.$echarts.init(this.$refs.bar);
      const option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
          textStyle: {
            color: "#ffffff",
            fontSize: 18,
          },
        },
        series: [
          {
            name: "设备嫁动率/运动率",
            type: "pie",
            radius: "50%",
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      this.chartInstance.setOption(option);
    },
    updateChart() {
      this.chartInstance = this.$echarts.init(this.$refs.bar);
      const dataOption = {
        series: {
          data: this.data,
        },
      };
      this.chartInstance.setOption(dataOption);
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
  background: #0a2a55;
}
.chart-container {
  width: 80%;
  height: calc(100vh - 114px);
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
