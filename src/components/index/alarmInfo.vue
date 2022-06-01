<template>
  <div class="alaminfo_box">
    <dv-border-box-12>
      <div class="title">▎实时报警信息</div>
      <div class="alam_info">
        <!-- <span class="alarm_number">报警号</span> -->
        <span>报警内容</span>
        <span>报警开始时间</span>
        <span>报警结束时间</span>
      </div>
      <div class="list_warp">
        <ul>
          <li v-for="(item, index) in alarmData" :key="index">
            <!-- <span class="alarm_number">{{ item.Number }}</span> -->
            <span>{{ item.Message }}</span>
            <span>{{ item.StartAt }}</span>
            <span>{{ item.EndAt }}</span>
          </li>
        </ul>
      </div>
    </dv-border-box-12>
  </div>
</template>
<script>
export default {
  props: {
    alarmData: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.alaminfo_box {
  width: 100%;
  height: 316px;
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
    // .alarm_number {
    //   width: 20%;
    // }
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
    height: 65%;
    overflow: scroll;
    ul {
      height: 100%;
      padding: 0;
      margin: 0;
      li {
        height: 30px;
        font-size: 14px;
        color: #ffffff;
        line-height: 30px;
        text-align: center;
        list-style: none;
        // .alarm_number {
        //   width: 20%;
        // }
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
