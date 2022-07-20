<template>
  <div class="device_con">
    <div class="device_title">
      <div class="content">
        <img src="../../assets/images/mechanic_icon/running_icon.gif" />
        <span class="text">加工台数</span>
        <span class="number">{{ unitsNumber }}台</span>
      </div>
      <div class="content">
        <img src="../../assets/images/mechanic_icon/alarm_icon.gif" />
        <span class="text">报警台数</span>
        <span class="number">{{ AlamNumber }}台</span>
      </div>
      <div class="content">
        <img src="../../assets/images/mechanic_icon/standby_icon.gif" />
        <span class="text">待机台数</span>
        <span class="number">{{ StandbyNumber }}台</span>
      </div>
      <div class="content">
        <img src="../../assets/images/mechanic_icon/off_line_icon.png" />
        <span class="text">离线台数</span>
        <span class="number">{{ offlineNumber }}台</span>
      </div>
    </div>
    <div
      class="device-distribution-map"
      ref="device_distribution_map"
      :style="{
        backgroundImage: 'url(' + layoutImgUrl + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: '100% 100%',
      }"
    ></div>
    <div class="map-tab">
      <a class="arrow-left" href="#" @click="slidePrev"></a>
      <a class="arrow-right" href="#" @click="slideNext"></a>
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          :class="{ normal: !item.isSelected, selected: item.isSelected }"
          v-for="item in swiperShowList"
          :key="item.workshopName"
        >
          <div class="swiper-option">{{ item.workshopName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      unitsNumber: 0,
      AlamNumber: 0,
      StandbyNumber: 0,
      offlineNumber: 0,
      selectedIndex: 0,
      layoutImgUrl: require("../../assets/images/ce1.png"),
      swiperShowList: [
        { workshopName: "大件加工车间", isSelected: true },
        { workshopName: "精密加工车间", isSelected: false },
        { workshopName: "中小件加工车间", isSelected: false },
      ],
    };
  },
  mounted() {},
  methods: {
    //向左点击移动车间
    slidePrev() {
      let currentIndex = this.selectedIndex - 1;
      this.swiperShowList.forEach((item, index) => {
        if (index === currentIndex) {
          item.isSelected = true;
          this.selectedIndex = this.selectedIndex - 1;
        } else {
          item.isSelected = false;
        }
      });
    },
    //向右点击移动车间
    slideNext() {
      let currentIndex = this.selectedIndex + 1;
      this.swiperShowList.forEach((item, index) => {
        if (index === currentIndex) {
          item.isSelected = true;
          this.selectedIndex = this.selectedIndex + 1;
        } else {
          item.isSelected = false;
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
.device_con {
  width: 100%;
  height: 716px;
  .device_title {
    height: 6%;
    width: 90%;
    margin-left: 5%;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    .content {
      flex: 1;
      position: relative;
      font-size: 21px;
      @-webkit-keyframes myAnimation {
        0% {
          opacity: 0;
          filter: alpha(opacity=0);
        }
        100% {
          opacity: 1;
          filter: alpha(opacity=100);
        }
      }
      @keyframes myAnimation {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      img {
        width: 33px;
        height: 33px;
        -webkit-animation: myAnimation 1.5s infinite;
        animation: myAnimation 1.5s infinite;
      }
      .text {
        color: rgb(71, 191, 196);
        padding-left: 8px;
        position: absolute;
        left: 33px;
      }
      .number {
        color: #ffffff;
        position: absolute;
        right: 16px;
      }
    }
  }
  .device-distribution-map {
    width: 98%;
    height: 70%;
    margin-top: 5%;
    margin-left: 1%;
    position: relative;
  }
  .map-tab {
    width: 100%;
    height: 20%;
    margin-top: 2%;
    margin-bottom: 42px;
    position: relative;
    .arrow-left {
      background: url("../../assets/images/distribution_map/arrow_left.png")
        no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: 50%;
      margin-top: -33px;
      left: 10px;
      width: 66px;
      height: 66px;
    }
    .arrow-right {
      background: url("../../assets/images/distribution_map/arrow_right.png")
        no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: 50%;
      margin-top: -33px;
      right: 10px;
      width: 66px;
      height: 66px;
    }
  }
  .swiper-wrapper {
    width: 790px;
    height: 100%;
    margin-left: 83px;
    margin-top: 20px;
    position: absolute;
    overflow: hidden;
    .swiper-slide {
      width: 158px;
      height: 76px;
      margin-top: 16px;
      margin-left: 13px;
      margin-right: 13px;
      display: inline-block;
      font-size: 20px;
      line-height: 75px;
      text-align: center;
    }
    .normal {
      background: url("../../assets/images/border_normal.png") no-repeat;
      background-size: 100% 100%;
      color: #ffffff;
    }
    .selected {
      background: url("../../assets/images/border_selected.png") no-repeat;
      background-size: 100% 100%;
      color: #77dcdd;
    }
  }
}
</style>
