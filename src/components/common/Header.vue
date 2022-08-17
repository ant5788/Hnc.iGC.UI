<template>
  <div class="main">
    <div class="clearfloat">
      <div class="left"></div>
      <div class="center">
        <div class="title">{{ title }}</div>
        <dv-decoration-5 class="top" />
      </div>
      <div class="right">
        <button class="btn" @click="go(0)">首页</button>
        <button class="btn" @click="go(1)">设备监控</button>
      </div>
    </div>
    <div class="bottom_img"></div>
  </div>
</template>

<script>
export default {
  name: "HeaderCom",
  props: {
    title: {
      type: String,
      require: true,
    },
  },
  methods: {
    go(val) {
      if (val === 1) {
        this.$router.push("/deviceList");
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main {
  width: 100%;
  height: 80px;
  color: #fff;
  .center,
  .left,
  .right {
    float: left;
    width: 30%;
    height: 80px;
    line-height: 80px;
    text-align: right;
    .btn {
      width: 120px;
      height: 40px;
      color: #fff;
      font-size: 18px;
      background: #010c22;
      border: 1px solid #00d8ff;
      cursor: pointer;
      border-radius: 10px;
      margin: 0 10px;
    }
  }
  .center {
    position: relative;
    text-align: center;
    width: 40%;
  }
  .top {
    position: absolute;
    bottom: -30px;
    left: 0%;
  }
  .title {
    font-size: 36px;
    font-weight: 700;
    line-height: 80px;
  }
  .bottom_img {
    float: left;
    width: 100%;
    height: 16px;
    background: url("../../assets/images/header.png") no-repeat;
    margin-top: 10px;
  }
}
.clearfloat:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.clearfloat {
  zoom: 1;
}
</style>
