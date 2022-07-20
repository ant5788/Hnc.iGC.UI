<template>
  <div class="linChart_box">
    <dv-border-box-12>
      <div class="time_box fl">
        <p><button class="btn">每班</button></p>
        <p><button class="btn">每天</button></p>
        <p><button class="btn">每周</button></p>
      </div>
      <div class="chart-container fl" ref="load_diagram_ref"></div>
    </dv-border-box-12>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.initChart();
    this.getAxisData();
    this.updateChart();
    window.addEventListener("resize", () => {
      this.screenAdapter();
    });
  },
  methods: {
    getAxisData() {
      // this.updateChart();
    },
    screenAdapter() {
      const adapterOption = {};
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
  },
};
</script>
<style scoped lang="scss">
.linChart_box {
  width: 100%;
  height: 280px;
  .chart-container {
    width: 96%;
    height: 90%;
  }
}
.time_box {
  width: 10%;
  text-align: center;
}
.fl {
  float: left;
  height: 100%;
}
.btn {
  width: 80px;
  height: 30px;
  border-radius: 8px;
}
</style>
