<template>
  <div>
    <Header :title="title"></Header>
    <div class="left fl">
      <leftNav></leftNav>
    </div>
    <div class="con fl"></div>
  </div>
</template>
<script>
import Header from "../common/Header.vue";
import leftNav from "../common/leftNav.vue";
export default {
  components: { Header, leftNav },
  data() {
    return {
      title: "三维车间",
    };
  },
};
</script>
<style scoped lang="scss">
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
</style>
