<template>
  <div class="main"> 
     <div class="left fl">
     <AlamTime></AlamTime>
     <AlamInfo></AlamInfo>
     <TimeUti></TimeUti>
     </div>
   <div class="center fl">
     <deviceMap></deviceMap>
      <TimeUtilizationTop></TimeUtilizationTop>  
   </div>
   <div class="right fl">
  <RealTimeState></RealTimeState>
  <StateDistribute></StateDistribute>
   </div>
  </div>
</template>
<script>

import AlamTime from "./AlamTime"
import AlamInfo from "./alarmInfo"
import TimeUti from "./TimeUtilization"
import deviceMap from  "./DeviceMap"
import TimeUtilizationTop from "./TimeUtilizationTop"
import RealTimeState from "./RealTimeState"
import StateDistribute from "./StateDistribute"
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components:{
   AlamTime,
   AlamInfo,
   TimeUti,
   deviceMap,
   TimeUtilizationTop,
   RealTimeState,
   StateDistribute
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main{
height: calc(100% - 114px);
 width: 100%;
 margin-top:20px;
}
 .fl{
   float: left;
 }
 .left,.right{
  width: 25%;
  height: 100%;
 }
 .center{
   width: 50%;
   height: 100%;
 }
 .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
.clearfloat{zoom:1}
</style>
