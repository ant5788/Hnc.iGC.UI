<template>
  <div class="work_state">
    <dv-border-box-13 class="detail_box">
     <dv-decoration-7  class="title">温箱详情</dv-decoration-7>
     <div class="detail fl">
  <img src="../../assets/images/machine_img.png">
     </div>
       <div class="detail fl">
         <div class="line">
          <span>设备ID</span>
         <span></span>
         </div>
         <div class="line">
        <span>设备类型</span>
         <span></span>
         </div>
         <div class="line">
           <span>设备所在车间</span>
         <span></span>
         </div>
         <div class="line">
       <span>工作状态</span>
         <span></span>
         </div>
        <div class="line">
         <span>使用时长</span>
         <span></span>
        </div>
         
       </div>
    </dv-border-box-13>
   
  </div>
</template>
<script>
export default {
  data(){
    return{}
  }
}
</script>
<style scoped lang="scss">
.work_state{
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
img{
  margin-top: 40px;
}
.fl{
  float: left;
}
.detail_box{

}
.detail{
 width: 50%;
 font-size: 18px;
 .line{
   height: 60px;
   line-height: 60px;
 }
}
}
</style>