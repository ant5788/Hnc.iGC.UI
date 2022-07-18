<template>
  <div class="screen-adapter">
    <div class="content-wrap" :style="style">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "ScreenAdapter",
  data() {
    return {
      style: {
        width: `${this.w}px`,
        height: `${this.h}px`,
        transform: "scale(1) translate(-50%, -50%)", // 默认不缩放，垂直水平居中
      },
    };
  },
  props: {
    w: {
      // 设计图尺寸宽
      type: Number,
      default: 1920,
    },
    h: {
      // 设计图尺寸高
      type: Number,
      default: 1080,
    },
  },
  mounted() {
    this.setScale();
    this.onresize = this.debounce(() => this.setScale(), 100);
    window.addEventListener("resize", this.onresize);
  },
  methods: {
    // 防抖
    debounce(fn, t) {
      const delay = t || 500;
      let timer;
      // eslint-disable-next-line func-names
      return function () {
        // eslint-disable-next-line prefer-rest-params
        const args = arguments;
        if (timer) {
          clearTimeout(timer);
        }
        const context = this;
        timer = setTimeout(() => {
          timer = null;
          fn.apply(context, args);
        }, delay);
      };
    },
    // 获取缩放比例
    getScale() {
      console.log(window.innerHeight, window.innerWidth);
      const w = window.innerWidth / this.w;
      const h = window.innerHeight / this.h;
      return w < h ? w : h;
    },
    // 设置缩放比例
    setScale() {
      this.style.transform = `scale(${this.getScale()}) translate(-50%, -50%)`;
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onresize);
  },
};
</script>

<style lang="scss">
.screen-adapter {
  width: 100vw;
  min-height: 100%;
  max-height: 100vh;
  overflow: hidden;
  .content-wrap {
    transform-origin: 0 0;
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 18px 64px;
  }
}
</style>
