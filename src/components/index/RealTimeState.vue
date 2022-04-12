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
            <span>{{ item.deviceNumber }}</span>
            <span>{{ item.alarmMessage }}</span>
            <span>{{ item.durationTime }}</span>
          </li>
        </ul>     
      </div>
     </dv-border-box-12>
  </div>
</template>
<script>
export default {
  data(){
    return{
      deviceStateList:[]
    }
  },
  mounted(){},
  methods:{}
}
</script>
<style scoped lang="scss">
.realTime_box{
  width: 100%;
  height: 550px;
  .title{
   height: 60px;
   line-height: 60px;
   width: 100%;
   color: #fff;
   font-size: 20px;
   padding-left: 30px;
  }
  .alam_info{
  color: #fff;
  font-size: 18px;
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
        margin:0;
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