<template>
  <div class="realTime_box">
    <dv-border-box-12>
      <div class="title">▎设备实时状态</div>
      <div class="alam_info">
        <span>设备名称</span>
        <span>设备状态</span>
      </div>
      <div class="list_warp">
        <ul>
          <li v-for="(item, index) in deviceStateList" :key="index">
            <span>{{ item.name }}</span>
            <span>{{ item.StatusName }}</span>
          </li>
        </ul>
      </div>
    </dv-border-box-12>
  </div>
</template>
<script>
let url = "/api/CNC/DeviceRealTimeStatus";
export default {
  data() {
    return {
      deviceStateList: [],
      statusmap: {
        0: "复位",
        1: "停止",
        2: "保持进给",
        3: "循环启动",
        4: "指令启动",
        98: "急停",
        99: "报警",
      },
      time: null,
    };
  },
  mounted() {
    this.time = setInterval(() => {
      this.getData();
    }, 1500);
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.get(this.$api + url).then((res) => {
        console.log(res);
        this.deviceStateList = res.data.data;
        this.deviceStateList.forEach((item) => {
          item.StatusName = this.statusmap[item.State];
        });
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
.realTime_box {
  width: 100%;
  height: 550px;
  .title {
    height: 60px;
    line-height: 60px;
    width: 100%;
    color: #fff;
    font-size: 20px;
    padding-left: 30px;
  }
  .alam_info {
    color: #fff;
    font-size: 18px;
    margin: 0 auto;
    span {
      display: inline-block;
      width: 50%;
      font-size: 18px;
      font-weight: 400;
      line-height: 18px;
      text-align: center;
      color: #ffffff;
    }
  }
  .list_warp {
    height: 78%;
    overflow: auto;
    margin: 0 8px;
    ul {
      height: 100%;
      padding: 0;
      margin: 0;
      li {
        height: 30px;
        font-size: 18px;
        color: #ffffff;
        line-height: 30px;
        text-align: center;
        list-style: none;
        span {
          display: inline-block;
          width: 50%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 10px;
      /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      box-shadow: inset 0 0 5px #59ebe8;
      background: #59ebe8;
    }
  }
}
</style>
