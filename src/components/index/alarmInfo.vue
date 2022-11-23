<template>
  <div class="alaminfo_box">
    <dv-border-box-12>
      <div class="title">▎实时报警信息</div>
      <div class="alam_info">
        <span>报警号</span>
        <span>报警内容</span>
        <span>报警时长</span>
      </div>
      <div class="list_warp">
        <ul>
          <li v-for="(item, index) in alarmData" :key="index">
            <span>{{ item.Number }}</span>
            <span>{{ item.Message }}</span>
            <span>{{ item.EndAt }}</span>
          </li>
        </ul>
      </div>
    </dv-border-box-12>
  </div>
</template>
<script>
let url = "/api/CNC/RealTimeAlarmMessage";
export default {
  data() {
    return {
      alarmData: [],
      time: null,
    };
  },
  mounted() {
    this.time = setInterval(() => {
      this.getdata();
    }, 1500);
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.alarmData = [];
      this.$axios.get(this.$api + url).then((res) => {
        this.alarmData = [];
        this.alarmData.push(res.data.data);
        console.log(res);
        if (this.alarmData != null) {
          this.alarmData.forEach((item) => {
            item.StartAt = this.Timeconversion(item.StartAt);
            item.EndAt = this.Timeconversion(item.EndAt);
          });
        }
      });
    },
    Timeconversion(time) {
      var d = time ? new Date(time) : new Date();
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      var hours = d.getHours();
      var min = d.getMinutes();
      var seconds = d.getSeconds();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      if (hours < 0) hours = "0" + hours;
      if (min < 10) min = "0" + min;
      if (seconds < 10) seconds = "0" + seconds;

      return (
        year + "-" + month + "-" + day + " " + hours + ":" + min + ":" + seconds
      );
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
.alaminfo_box {
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
    margin: 0 8px;
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
