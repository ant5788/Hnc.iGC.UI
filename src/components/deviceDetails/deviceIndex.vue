<template>
  <div>
   <div class="con_top">
   <div class="con_topLeft">
     <workState></workState>
   </div>
   <div class="con_topRight">
     <alarmInfo></alarmInfo>
   </div>
   </div>
   <div class="con_bottom">
     <curveInfo></curveInfo>
   </div>
  </div>
</template>
<script>
import workState from "./workState"
import alarmInfo from "./alarmInfo"
import curveInfo from "./curveInfo"
export default {
  components:{workState,alarmInfo,curveInfo},
  data(){
    return{
      
    }
  },
  mounted(){},
  methods:{}
}
</script>
<style scoped lang="scss">
.con_top{
  width: 100%;
  height: 450px;
  display: flex;
  .con_topLeft{
    flex: 1;
  }
  .con_topRight{
    flex:1
  }
}
.con_bottom{
  width: 100%;
  height: 500px;
}

</style>