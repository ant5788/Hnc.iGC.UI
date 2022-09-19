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
};
</script>
