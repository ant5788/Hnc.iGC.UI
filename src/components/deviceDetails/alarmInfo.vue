<template>
  <div class="alarm_info">
    <dv-border-box-13>
      <dv-decoration-7  class="title">报警信息</dv-decoration-7>
       <div class="alam_info">
        <span>报警编号</span>
        <span>报警内容</span>
        <span>持续时长</span>
        </div>
         <div class="list_warp">
        <ul>
          <li v-for="(item, index) in deviceStateList" :key="index">
            <span>{{ item.deviceNumber }}</span>
            <span>{{ item.alarmMessage }}</span>
            <span>{{ item.durationTime }}</span>
          </li>
        </ul>   
         </div>  
    </dv-border-box-13>
  </div>
</template>
<script>
export default {
  data(){
    return{
      deviceStateList:[{
        deviceNumber:"设备一",
        alarmMessage:"内存不足",
        durationTime:'0时0分5秒'
      },
      {
        deviceNumber:"设备一",
        alarmMessage:"内存不足",
        durationTime:'0时0分5秒'
      },
      {
        deviceNumber:"设备一",
        alarmMessage:"内存不足",
        durationTime:'0时0分5秒'
      },
      {
        deviceNumber:"设备一",
        alarmMessage:"内存不足",
        durationTime:'0时0分5秒'
      },
      {
        deviceNumber:"设备一",
        alarmMessage:"内存不足",
        durationTime:'0时0分5秒'
      },{
        deviceNumber:"设备一",
        alarmMessage:"内存不足",
        durationTime:'0时0分5秒'
      },
      {
        deviceNumber:"设备一",
        alarmMessage:"内存不足",
        durationTime:'0时0分5秒'
      },
      {
        deviceNumber:"设备一",
        alarmMessage:"内存不足",
        durationTime:'0时0分5秒'
      }
      ]
    }
  },
  mounted(){},
  methods:{}
}
</script>
<style scoped lang="scss">
.alarm_info{
margin-top: 20px;
width: 90%;
height: 100%;
color: #fff;
.title{
  height: 60px;
  width: 30%;
  line-height: 60px;
  font-size: 30px;
padding: 10px 0;
}
.alam_info{
  color: #fff;
  font-size: 18px;
      span {
        display: inline-block;
        width: 33%;
        font-size: 20px;
        font-weight: 400;
        line-height: 30px;
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
        margin:0;
        li {
          height: 40px;
          font-size: 20px;
          color: #ffffff;
          line-height: 40px;
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