<template>
  <screenadapter>
    <div id="app">
      <!-- <Header></Header> -->
      <router-view></router-view>
    </div>
  </screenadapter>
</template>
<script>
// import Header from "./components/common/Header"
import screenadapter from "./components/ScreenAdapter";
export default {
  name: "App",
  components: {
    // Header,
    screenadapter,
  },
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
