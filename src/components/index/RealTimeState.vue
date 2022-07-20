<template>
  <div class="realTime_box">
    <dv-border-box-12>
      <div class="title">▎设备实时状态</div>
      <div class="alam_info">
        <span>工位</span>
        <span>设备状态</span>
        <span>持续时长</span>
      </div>
      <div class="list_warp">
        <ul>
          <li v-for="(item, index) in deviceStateList" :key="index">
            <span>{{ item.Station }}</span>
            <span>{{ item.StatusName }}</span>
            <span>{{ item.Duration }}</span>
          </li>
        </ul>
      </div>
    </dv-border-box-12>
  </div>
</template>
<script>
let url = "http://192.168.20.160:24912/api/CNC/DeviceRealTimeStatus";
export default {
  data() {
    return {
      deviceStateList: [],
      statusmap: {
        0: "复位",
        99: "报警",
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.get(url).then((res) => {
        this.deviceStateList = res.data.data;
        this.deviceStateList.forEach((item) => {
          item.StatusName = this.statusmap[item.Status];
        });
      });
    },
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
      width: 33%;
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
          width: 33%;
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
