<template>
  <div class="machine_box">
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
            <img src="../../assets/images/machine_img.png" class="ma_img" />
          </div>
          <div class="detail fl">
            <div class="line">
              <span>设备名称：</span>
              <span>{{ deviceData.Name }}</span>
            </div>
            <div class="line">
              <span>设备型号：</span>
              <span></span>
            </div>
            <div class="line">
              <span>设备总的故障次数：</span>
              <span>4</span>
            </div>
            <div class="line">
              <span>加工的零件编码：</span>
              <span>{{ Partcode }}</span>
            </div>
          </div>
        </dv-border-box-12>
        <dv-border-box-12 class="machine_order">
          <div class="title">▎加工信息</div>
          <p>
            <span class="text">加工计数</span
            ><span class="number">{{ deviceData.PartsTotal }}</span>
            <span class="text">程序号</span
            ><span class="number">{{ deviceData.CurrentProgramNumber }}</span>
          </p>
          <p>
            <span class="text">程序名称</span
            ><span class="number">{{ deviceData.CurrentProgramName }}</span>
            <span class="text"> 程序推送</span>
          </p>
        </dv-border-box-12>
      </div>
      <div class="machine_top_midle">
        <dv-border-box-12 class="Axios_info">
          <div class="title">▎设备利用率</div>
          <div class="chart-container" ref="proportions"></div>
        </dv-border-box-12>
        <dv-border-box-12 class="load_info">
          <div class="title">▎负载</div>
          <div class="content">
            <div class="axisItem" v-for="(item, i) in axisLoadForm" :key="i">
              <div class="name">{{ item.name }}</div>
              <div class="percent">
                <div class="progress-out">
                  <div
                    class="progress-in"
                    :style="{
                      width: item.value + '%',
                      background:
                        setColor(item.value) === 0
                          ? '#18A23F'
                          : setColor(item.value) === 1
                          ? '#F5A623'
                          : setColor(item.value) === 2
                          ? '#f30707'
                          : '',
                    }"
                  ></div>
                </div>
              </div>
              <div class="value">{{ item.value }}%</div>
            </div>
          </div>
        </dv-border-box-12>
      </div>
      <div class="machine_top_right">
        <register></register>
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
          <div class="multiplying-power">
            <div
              class="rotary-knob-item"
              v-for="(item, i) in multiplyingPower"
              :key="i"
            >
              <img
                class="rotary-knob-img"
                :src="item.imgUrl"
                :alt="item.name"
              />
              <img
                class="pointer-img"
                :style="'transform: rotate(' + (item.value - 75) * 1.8 + 'deg)'"
                src="../../assets/images/pointer.png"
                alt="pointer"
              />
              <div
                style="
                  height: 30px;
                  width: 104px;
                  margin-left: 50%;
                  transform: translate(-50%, -0.1rem);
                  display: flex;
                  flex-direction: row;
                "
              >
                <img
                  :src="item.iconImgUrl"
                  style="height: 30px; width: 42px"
                  :alt="item.name"
                />
                <div style="height: 30px; margin-left: 17px; line-height: 30px">
                  {{ item.value }}%
                </div>
              </div>
            </div>
          </div>
        </dv-border-box-12>
      </div>
      <div class="machine_bottom_right">
        <lineChart></lineChart>
      </div>
    </div>
  </div>
</template>
<script>
let url =
  "http://192.168.20.160:24912/api/CNC/A183AA3A-7274-48D5-AADC-53009B7DC203";
let partUrl =
  "http://192.168.20.160:24912/api/CNC/PartCode?deviceId=A183AA3A-7274-48D5-AADC-53009B7DC203";
import register from "./ registerInfo";
import lineChart from "./lineChart";
export default {
  components: { register, lineChart },
  data() {
    return {
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
          name: "X",
          value: 80,
        },
        {
          name: "Y",
          value: 60,
        },
        {
          name: "Z",
          value: 40,
        },
        {
          name: "C",
          value: 100,
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
        Name: "智能高速五轴数控机床",
        PartsTotal: "200",
        CurrentProgramNumber: "007",
        CurrentProgramName: "../prog/O1111",
      },
      Partcode: "005",
    };
  },
  mounted() {
    this.initchart();
    this.initPartcode();
  },
  created() {
      this.initData();
  },
  methods: {
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
    initchart() {
      this.chartInstance = this.$echarts.init(this.$refs.proportions);
      const initOption = {
        title: [
          {
            text: "设备使用效率",
            x: "center",
            top: "32%",
            textStyle: {
              color: "#fff",
              fontSize: 18,
              fontWeight: "100",
            },
          },
          {
            text: "60%",
            x: "center",
            top: "50%",
            textStyle: {
              fontSize: 18,
              color: "#00f0ff",
              foontWeight: "500",
            },
          },
        ],
        polar: {
          radius: ["44%", "50%"],
          center: ["50%", "50%"],
        },
        angleAxis: {
          max: 100,
          show: false,
        },
        radiusAxis: {
          type: "category",
          show: true,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            type: "pie",
            startAngle: 0,
            radius: ["83%", "90%"],
            center: ["50%", "50%"],
            data: [
              {
                hoverOffset: 1,
                value: 75,
                name: "",
                itemStyle: {
                  normal: {
                    color: "#00f0ff",
                  },
                },
                label: {
                  show: false,
                },
                labelLine: {
                  normal: {
                    smooth: true,
                    lineStyle: {
                      width: 0,
                    },
                  },
                },
                hoverAnimation: false,
              },
              {
                label: {
                  show: false,
                },
                labelLine: {
                  normal: {
                    smooth: true,
                    lineStyle: {
                      width: 0,
                    },
                  },
                },
                value: 100 - 75,
                hoverAnimation: false,
                itemStyle: {
                  color: "rgba(251, 200, 79, 0)",
                },
              },
            ],
          },
          {
            name: "",
            type: "pie",
            startAngle: 90,
            radius: "80%",
            hoverAnimation: false,
            center: ["50%", "50%"],
            itemStyle: {
              normal: {
                labelLine: {
                  show: false,
                },
                color: new this.$echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                  {
                    offset: 1,
                    color: "rgba(55,70,130, 1)",
                  },
                  {
                    offset: 0,
                    color: "rgba(55,70,130, 0)",
                  },
                ]),
                shadowBlur: 10,
              },
            },
            data: [
              {
                value: 100,
              },
            ],
          },
        ],
      };
      this.chartInstance.setOption(initOption);
    },
    initData() {
      this.$axios.get(url).then((res) => {
        this.deviceData = res.data;
        this.multiplyingPower.forEach((item) => {
          if (item.name === "主轴修调") {
            item.value = this.deviceData.SpindleOverride;
          } else if (item.name === "进给修调") {
            item.value = this.deviceData.FeedOverride;
          } else {
            item.value = this.deviceData.RapidOverride;
          }
        });
        this.tfsForm.toolNumber.value = this.deviceData.CutterInfos.Number;
        this.tfsForm.feedSpeed.value = this.deviceData.FeedSpeed;
        this.tfsForm.feedSpeed.unit = this.deviceData.FeedSpeedUnit;
        this.tfsForm.spindleSpeed.value = this.deviceData.SpindleSpeed;
        this.tfsForm.spindleSpeed.unit = this.deviceData.SpindleSpeedUnit;
      });
    },
    initPartcode() {
      this.$axios.get(partUrl).then((res) => {
        this.Partcode = res.data.data;
      });
    },
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
      height: 60px;
      line-height: 60px;
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
    .content {
      color: #fff;
      margin-top: 16px;
      overflow: auto;
      cursor: move;
      &::-webkit-scrollbar {
        /*高宽分别对应横竖滚动条的尺寸*/
        width: 0;
      }
      .axisItem {
        height: 50px;
        display: flex;
        flex-direction: row;
        font-size: 20px;
        .name {
          flex: 1;
        }
        .value {
          flex: 3;
        }
        .unit {
          flex: 1;
        }
        div {
          text-align: center;
        }
      }
    }
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
              // background: linear-gradient(
              //   to right,
              //   #e6a13a,
              //   #eaefab,
              //   #f30707,
              //   #d64e25
              // );
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
