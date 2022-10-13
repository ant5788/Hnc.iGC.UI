<template>
  <div class="reg_con">
    <dv-border-box-12>
      <div class="title">
        ▎设备稼动率
        <el-select v-model="model" @change="getModel" class="selet_style">
          <el-option
            v-for="item in optionData"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>

      <div class="chart-container" ref="loadBar"></div>
    </dv-border-box-12>
  </div>
</template>
<script>
let getperUrl = "/api/CNC/GetStatusPercentage?";
export default {
  data() {
    return {
      chartInstance: null,
      dataList: [],
      statusmap: {
        0: "复位",
        1: "停止",
        2: "保持进给",
        3: "循环启动",
        4: "指令启动",
        98: "急停",
        99: "报警",
      },
      optionData: [
        { id: 1, label: "日", value: 1 },
        { id: 2, label: "周", value: 2 },
        { id: 3, label: "月", value: 3 },
      ],
      model: "",
    };
  },
  mounted() {
    this.initchart();
    this.getdata();
    window.addEventListener("resize", () => {
      this.screenAdapter();
    });
    this.startInterval();
    this.screenAdapter();
  },
  created() {
    this.getdata();
  },
  methods: {
    //日,周，月选择
    getModel(val) {
      this.model = val;
      console.log(val);
    },
    //初始化图表
    initchart() {
      this.chartInstance = this.$echarts.init(this.$refs.loadBar);
      const initOption = {
        color: ["#FF343F", "#FFCF21", "#00FF7F", "#808080"],
        series: {
          type: "pie",
          clockwise: false, //饼图的扇区是否是顺时针排布
          minAngle: 2, //最小的扇区角度（0 ~ 360）
          radius: ["40%", "60%"],
          center: ["50%", "55%"],
          avoidLabelOverlap: false,
          itemStyle: {
            //图形样式
            normal: {
              borderColor: "#ffffff",
              borderWidth: 1,
            },
          },
          label: {
            normal: {
              show: true,
              formatter: "{b|{b}:}\n{per|{d}%}",
              rich: {
                b: {
                  color: "#fff",
                  fontSize: 18,
                  padding: 8,
                },
                per: {
                  fontSize: 18,
                },
              },
            },
          },
          data: [],
        },
      };
      this.chartInstance.setOption(initOption);
    },
    //获取设备稼动率
    getdata() {
      let id = this.getUrlParams(window.location.search, "id");
      let startTime = new Date(new Date().toLocaleDateString()).getTime();
      let endTime = new Date().getTime();
      this.$axios
        .get(
          this.$api +
            getperUrl +
            "deviceId=" +
            id +
            "&startTime=" +
            startTime +
            "&=endTime" +
            endTime
        )
        .then((res) => {
          this.dataList = [];
          if (res.data.data !== null) {
            this.dataList = res.data.data;
            this.dataList = [
              {
                name: 0,
                ratio: 20,
              },
              {
                name: 1,
                ratio: 30,
              },
              {
                name: 2,
                ratio: 40,
              },
            ];
            this.dataList.forEach((item) => {
              item.name = this.statusmap[item.name];
            });
          }
        });
      this.updateChart();
    },
    //更新设备数据
    updateChart() {
      let seriesData = this.dataList;
      const dataOption = {
        series: {
          data: seriesData,
        },
      };
      this.chartInstance.setOption(dataOption);
    },
    //获取url传参
    getUrlParams(url, params) {
      var res = new RegExp("(?:&|/?)" + params + "=([^&$]+)").exec(url);
      return res ? res[1] : "";
    },
    screenAdapter() {
      const adapterOption = {};
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
    startInterval() {
      if (this.timer5Sec != null) {
        clearInterval(this.timer5Sec);
      }
      this.timer5Sec = setInterval(() => {
        this.getdata();
      }, 1000 * 5);
    },
  },
};
</script>
<style scoped lang="scss">
.reg_con {
  width: 100%;
  height: 280px;
  color: #fff;
  .banner {
    display: flex;
    flex-direction: row;
    .banner-item {
      flex: 1;
      line-height: 42px;
      margin: 10px 0 0 10px;
      text-align: center;
    }
    .active {
      background: #51d9d9;
    }
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
    height: 90%;
    margin-left: 2%;
  }
  .selet_style {
    margin-left: 50px;
  }
}
</style>
