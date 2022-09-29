<template>
  <div>
    <Unity
      src="../../../public/unity/Build/apk.json"
      unityLoader="../../../public/unity/Build/UnityLoader.js"
      with="960"
      height="600"
      ref="unityvue"
      class="main-unity"
    ></Unity>
  </div>
</template>
<script>
import Unity from "vue-unity-webgl";
export default {
  components: { Unity },
  data() {
    return {};
  },
  created() {
    console.log("ok");
    // this.$refs.unityPlan.message("JSManager", "SendData", "测试数据");
    window["unityClick"] = (id, value) => {
      alert(id + ":" + value);
    };
  },
  methods: {},
};
</script>
