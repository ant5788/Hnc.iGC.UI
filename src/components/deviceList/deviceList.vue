<template>
  <div class="main">
    <div class="left fl">
      <leftNav></leftNav>
    </div>
    <div class="con fl">
      <div class="warp">
        <div class="item" @click="getdevice">
          <div class="img_box fl">
            <img src="../../assets/images/machine_img.png" />
          </div>
          <div class="device_info fl">
            <p>
              <span class="text">设备名称：</span>
              <span></span>
            </p>
            <p>
              <span class="text">设备编号：</span>
              <span></span>
            </p>
            <p>
              <span class="text">资产编号：</span>
              <span></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import leftNav from "../common/leftNav.vue";
export default {
  components: { leftNav },
  data() {
    return {};
  },
  created() {},
  methods: {
    getdevice() {
      this.$router.push("/Machine");
    },
  },
};
</script>
<style scoped lang="scss">
.main {
  .fl {
    float: left;
  }
  .left {
    width: 14%;
    margin-top: 20px;
    margin-right: 10px;
  }
  .con {
    width: 85%;
    margin-top: 20px;
  }
  .warp {
    width: 100%;
    display: flex;
    flex-flow: wrap;
  }
  .item {
    width: 32%;
    border: 1px solid #59ebe8;
    border-radius: 8px;
  }
  .img_box {
    width: 45%;
    img {
      width: 220px;
    }
  }
  .device_info {
    width: 55%;
    color: #fff;
    font-size: 18px;
  }
}
</style>
