<template>
  <div class="machine_box">
    <Header :title="title"></Header>
    <div class="machine_top">
      <div class="machine_top_left">
        <dv-border-box-12 class="machine_details">
          <div class="title">
            ▎机床详情
            <img
              src="../../assets/images/mechanic_icon/off_line_icon.png"
              class="img"
            />
          </div>
          <div class="detail fl">
            <!-- <img :src="deviceData.DevicePhoto" class="ma_img" /> -->
            <img src="../../assets/images/machine_img.png" class="ma_img" />
          </div>
          <div class="detail fl">
            <div class="line">
              <span>设备名称：</span>
              <span>{{ deviceData.DeviceName }}</span>
            </div>
            <div class="line">
              <span>设备ID：</span>
              <span>{{ deviceData.DeviceId }}</span>
            </div>
            <div class="line"></div>
            <div class="line">
              <span>设备类型：</span>
              <span></span>
            </div>
            <div class="line">
              <span>设备所在车间：</span>
              <span></span>
            </div>
          </div>
        </dv-border-box-12>
        <dv-border-box-12 class="machine_order">
          <div class="title">▎加工信息</div>
          <p>
            <span class="text">加工计数</span
            ><span class="number">{{ ProData.PartsTotal }}</span>
            <span class="text">加工零件编码</span
            ><span class="number">{{ Partcode }}</span>
            <span class="text">零件加工百分比</span>
            <span class="number">{{ PartPercentage }}</span>
          </p>
          <p>
            <span class="text">程序名称</span
            ><span class="number">{{ ProData.CurrentProgramName }}</span>
          </p>
        </dv-border-box-12>
      </div>
      <div class="machine_top_midle">
        <dv-border-box-12 class="Axios_info">
          <CropRate></CropRate>
        </dv-border-box-12>
        <dv-border-box-12 class="load_info">
          <div class="title">▎负载</div>
          <div class="content">
            <div class="axisItem" v-for="(item, i) in axisLoadForm" :key="i">
              <div class="name">{{ item.Name }}</div>
              <div class="percent">
                <div class="progress-out">
                  <div
                    class="progress-in"
                    :style="{
                      width: item.Load + '%',
                      background:
                        setColor(item.Load) === 0
                          ? '#18A23F'
                          : setColor(item.Load) === 1
                          ? '#F5A623'
                          : setColor(item.Load) === 2
                          ? '#f30707'
                          : '',
                    }"
                  ></div>
                </div>
              </div>
              <div class="value">{{ item.Load }}%</div>
            </div>
          </div>
        </dv-border-box-12>
      </div>
      <div class="machine_top_right">
        <!-- <Unity
          src="/unity/Build/apk.json"
          width="100%"
          height="800px"
          unityLoader="/unity/Build/UnityLoader.js"
          ref="unityvue"
        ></Unity> -->
        <el-button @click="show">测试</el-button>
        <iframe
          id="iframes"
          ref="iframe"
          class="iframe"
          src="/unity/index.html"
          width="100%"
          frameborder="0"
          scrolling="auto"
          height="500px"
        ></iframe>
      </div>
    </div>
    <div class="machine_midle">
      <dv-border-box-12>
        <div class="center">
          <div class="tfs-item" v-for="(item, key, i) in tfsForm" :key="i">
            <div class="name">{{ item.name }}</div>
            <div class="value">{{ item.value }}</div>
            <div class="unit">{{ item.unit }}</div>
          </div>
        </div>
      </dv-border-box-12>
    </div>
    <div class="machine_bottom">
      <div class="machine_bottom_left">
        <dv-border-box-12>
          <lineChart></lineChart>
        </dv-border-box-12>
      </div>
      <div class="machine_bottom_right">
        <Plan></Plan>
      </div>
    </div>
  </div>
</template>
<script>
let cncUrl = "/api/CNC/";
let query = "/api/CNC/GetDeviceDetailById?";
let partUrl = "/api/CNC/PartCode?"; //加工零件编码
let tfsUrl = "/api/CNC/GetCutterInfo?"; //刀具信息
let LoadUrl = "/api/CNC/GetSpindleLoad?"; //获取负载
let PerUr = "/api/CNC/GetPartPercentage?"; //获取加工百分比
import CropRate from "./CropRate"; //稼动率

import lineChart from "./lineChart"; //ERP和实际加工公司对比
import Plan from "./PlanData.vue";
import Header from "../common/Header.vue"; //引入头部组件
//import Unity from "vue-unity-webgl";

export default {
  components: { lineChart, Header, CropRate, Plan },
  data() {
    return {
      title: "设备详情",
      axisPositionForm: [
        {
          name: "X",
          value: 1000,
          unit: "mm",
        },
        {
          name: "Y",
          value: 1000,
          unit: "mm",
        },
        {
          name: "Z",
          value: 1000,
          unit: "mm",
        },
        {
          name: "C",
          value: 1000,
          unit: "°",
        },
      ],
      axisLoadForm: [
        {
          Name: "X",
          Load: 80,
        },
        {
          Name: "Y",
          Load: 60,
        },
        {
          Name: "Z",
          Load: 40,
        },
        {
          Name: "C",
          Load: 100,
        },
      ],
      tfsForm: {
        toolNumber: {
          name: "T",
          value: 1,
          unit: "号刀",
        },
        feedSpeed: {
          name: "F",
          value: 1000.0,
          unit: "毫米/分钟",
        },
        spindleSpeed: {
          name: "S",
          value: 1000,
          unit: "转/分钟",
        },
        toolTime: {
          name: "m",
          value: 1000,
          unit: "分钟 ",
        },
      },
      multiplyingPower: [
        {
          name: "主轴修调",
          imgUrl: require("../../assets/images/dial_plate.png"),
          iconImgUrl: require("../../assets/images/spindle_icon.png"),
          value: 80,
        },
        {
          name: "进给修调",
          imgUrl: require("../../assets/images/dial_plate.png"),
          iconImgUrl: require("../../assets/images/feed_icon.png"),
          value: 60,
        },
        {
          name: "快移修调",
          imgUrl: require("../../assets/images/dial_plate.png"),
          iconImgUrl: require("../../assets/images/rapid_traverse_icon.png"),
          value: 100,
        },
      ],
      chartInstance: null,
      deviceData: {
        DevicePhoto: "",
        DeviceName: "",
        DeviceId: "",
        CurrentProgramName: "",
      },
      Partcode: "",
      PartPercentage: "",
      ProData: {
        PartsTotal: "",
        CurrentProgramNumber: "",
        CurrentProgramName: "",
      },
      time: null,
      data: [
        { x: 1, y: 2, Z: 3 },
        { x: 2, y: 3, Z: 4 },
      ],
    };
  },
  mounted() {
    // this.initUnity();
    this.time = setInterval(() => {
      // this.initData();
      // this.initPartcode();
      // this.getFi();
      // this.GetSpindleLoad();
      // this.GetPartPercentage();
      // this.getCNC();
    }, 15000);
  },
  created() {
    // this.initData();
    // this.initPartcode();
    // this.getFi();
    // this.GetSpindleLoad();
    // this.GetPartPercentage();
    // this.getCNC();
    localStorage.setItem("token", "adsdasdasdads");
  },
  methods: {
    show() {
      let text_data = JSON.stringify(this.data);
      console.log(this.$refs.iframe.contentWindow.gameInstance.SendMessage);
      this.$refs.iframe.contentWindow.gameInstance.SendMessage(
        "JsTalker",
        "SetToken",
        text_data
      );
    },
    //设置负载背景颜色
    setColor(value) {
      let model;
      if (value <= 80) {
        model = 0;
      } else if (value > 80 && value <= 100) {
        model = 1;
      } else if (value > 100) {
        model = 2;
      }
      return model;
    },
    getCNC() {
      let url = cncUrl + this.getUrlParams(window.location.search, "id");
      this.$axios.get(this.$api + url).then((res) => {
        if (res.data !== null) {
          let data = res.data;
          this.ProData.PartsTotal = data.PartsTotal;
          this.ProData.CurrentProgramName = data.CurrentProgramName;
          this.multiplyingPower.forEach((item) => {
            if (item.name === "主轴修调") {
              item.value = data.SpindleOverride;
            } else if (item.name === "进给修调") {
              item.value = data.FeedOverride;
            } else {
              item.value = data.RapidOverride;
            }
          });
        } else {
          return false;
        }
      });
    },
    //获取设备详情
    initData() {
      let url = query + "id=" + this.getUrlParams(window.location.search, "id");
      this.$axios.get(this.$api + url).then((res) => {
        if (res.data.data !== null && res.data.state === 1) {
          this.deviceData = res.data.data;
        }
      });
    },
    //获取url传参
    getUrlParams(url, params) {
      var res = new RegExp("(?:&|/?)" + params + "=([^&$]+)").exec(url);
      return res ? res[1] : "";
    },
    //获取正在加工的零件编码
    initPartcode() {
      let id = this.getUrlParams(window.location.search, "id");
      this.$axios.get(this.$api + partUrl + "deviceId=" + id).then((res) => {
        if (res.data.sate === 1) {
          this.Partcode = res.data.data.code;
        }
      });
    },
    //获取刀具信息
    getFi() {
      let id = this.getUrlParams(window.location.search, "id");
      this.$axios.get(this.$api + tfsUrl + "deviceId=" + id).then((res) => {
        if (res.data.state === 1 && res.data.data !== null) {
          this.tfsForm.toolNumber.value = res.data.data.CurrentCutterNumber;
          this.tfsForm.feedSpeed.value = res.data.data.FeedSpeed;
          this.tfsForm.toolTime.value = res.data.data.toolTime;
        }
      });
    },
    //主轴负载
    GetSpindleLoad() {
      let id = this.getUrlParams(window.location.search, "id");
      this.$axios.get(this.$api + LoadUrl + "deviceId=" + id).then((res) => {
        if (res.data.state === 1 && res.data.data !== null) {
          this.axisLoadForm = res.data.data;
        }
      });
    },
    //加工零件百分比
    GetPartPercentage() {
      let id = this.getUrlParams(window.location.search, "id");
      this.$axios.get(this.$api + PerUr + "deviceId=" + id).then((res) => {
        if (res.data.state === 1) {
          // console.log(res);
          this.PartPercentage = res.data.data;
        }
      });
    },
  },
  beforDesroy() {
    // eslint-disable-next-line no-undef
    clearIntreval(this.time);
    this.time = null;
  },
};
</script>
<style scoped lang="scss">
.machine_box {
  height: calc(100% - 114px);
  width: 100%;
  margin-top: 20px;
  .machine_top {
    width: 100%;
    display: flex;
    .machine_top_left,
    .machine_top_midle,
    .machine_top_right {
      flex: 1;
      height: 552px;
    }
  }
  .machine_details {
    width: 100%;
    height: 350px;
  }
  .machine_order {
    width: 100%;
    height: 202px;
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
    height: 222px;
    margin-left: 2%;
  }
  .img {
    width: 32px;
    height: 32px;
    float: right;
    margin: 15px 50px;
  }
  .fl {
    float: left;
  }
  .ma_img {
    width: 250px;
    height: 250px;
  }
  .detail {
    color: #fff;
    width: 50%;
    font-size: 20px;
    .line {
      height: 50px;
      line-height: 50px;
    }
  }
  .text {
    color: #fff;
    font-size: 20px;
    margin-left: 30px;
  }
  .number {
    color: rgb(71, 191, 196);
    font-size: 20px;
    margin-left: 40px;
  }
  .Axios_info {
    width: 100%;
    height: 280px;
    // .content {
    //   color: #fff;
    //   margin-top: 16px;
    //   overflow: auto;
    //   cursor: move;
    //   &::-webkit-scrollbar {
    //     /*高宽分别对应横竖滚动条的尺寸*/
    //     width: 0;
    //   }
    //   .axisItem {
    //     height: 50px;
    //     display: flex;
    //     flex-direction: row;
    //     font-size: 20px;
    //     .name {
    //       flex: 1;
    //     }
    //     .value {
    //       flex: 3;
    //     }
    //     .unit {
    //       flex: 1;
    //     }
    //     div {
    //       text-align: center;
    //     }
    //   }
    // }
  }
  .load_info {
    width: 100%;
    height: 270px;
    .content {
      color: #fff;
      height: 192px;
      width: 100%;
      margin-left: 50%;
      transform: translateX(-50%);
      overflow: auto;
      cursor: move;
      /*滚动条整体样式*/
      &::-webkit-scrollbar {
        /*高宽分别对应横竖滚动条的尺寸*/
        width: 0;
      }
      .axisItem {
        height: 50px;
        display: flex;
        flex-direction: row;
        font-size: 18px;
        .name {
          flex: 1;
        }
        .percent {
          flex: 3;
          .progress-out {
            width: 100%;
            height: 33px;
            border: 1px solid #4fd5d7;
            .progress-in {
              height: 32px;
              position: relative;
              line-height: 21px;
            }
          }
        }
        .value {
          flex: 1;
        }
        div {
          text-align: center;
        }
      }
    }
  }
  .machine_midle {
    width: 100%;
    height: 112px;
    .center {
      color: #fff;
      width: 100%;
      height: 91px;
      margin-top: 14px;
      display: flex;
      flex-direction: row;
      .tfs-item {
        flex: 1;
        line-height: 100px;
        display: flex;
        flex-direction: row;
        align-items: center;
        .name {
          height: 92px;
          width: 116px;
          margin-left: 9px;
          background: url("../../assets/images/TFS2.png") no-repeat;
          background-size: 100% 100%;
          font-size: 60px;
          line-height: 92px;
          text-align: center;
          margin-top: 20px;
        }
        .value {
          height: 92px;
          margin-left: 42px;
          font-size: 40px;
          line-height: 92px;
          text-align: center;
          margin-top: 20px;
        }
        .unit {
          height: 92px;
          margin-left: 41px;
          font-size: 40px;
          line-height: 92px;
          text-align: center;
          margin-top: 20px;
        }
      }
    }
  }
  .machine_bottom {
    display: flex;
    flex-direction: row;
  }
  .machine_bottom_left,
  .machine_bottom_right {
    flex: 1;
  }
  .multiplying-power {
    color: #fff;
    font-size: 20px;
    flex: 1;
    display: flex;
    flex-direction: row;
    .rotary-knob-item {
      flex: 1;
      height: 233px;
      margin: 25px 50px;
      position: relative;
      .rotary-knob-img {
        height: 208px;
      }
      .pointer-img {
        position: absolute;
        left: 108px;
        top: 58px;
        transform-origin: bottom;
      }
    }
  }
}
</style>
