<template>
  <div>
    <div class="con_top">
      <div class="chart fl">
        <ratePice></ratePice>
      </div>
      <div class="chart fl">
        <rateLine></rateLine>
      </div>
    </div>
    <div class="con_bottom">
      <div class="chart fl">
        <rateBar></rateBar>
      </div>
      <div class="chart fl">
        <rateAlam></rateAlam>
      </div>
    </div>
  </div>
</template>
<script>
import ratePice from "./ratePice.vue";
import rateLine from "./rateLine.vue";
import rateBar from "./rateBar.vue";
import rateAlam from "./rateAlarm.vue";
export default {
  components: { ratePice, rateLine, rateBar, rateAlam },
  data() {
    return {};
  },
};
</script>
<style scoped lang="scss">
.fl {
  float: left;
}
.con_top,
.con_bottom {
  display: flex;
  width: 100%;
  height: calc(100vh - 114px) / 2;
}
.chart {
  height: 444px;
  flex: 1;
}
</style>
