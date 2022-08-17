<template>
  <div>
    <div class="box-border">
      <ul class="lists">
        <li
          v-for="item in navList"
          :key="item.id"
          @click="go(item.id)"
          class="nav"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navList: [
        {
          text: "设备列表",
          id: 1,
        },
        {
          text: "设备档案管理",
          id: 2,
        },
        {
          text: "设备维保计划",
          id: 3,
        },
        {
          text: "设备点检情况",
          id: 4,
        },
        {
          text: "生产统计",
          id: 5,
        },
        {
          text: "合格率统计分析",
          id: 6,
        },
        {
          text: "外协加工进度",
          id: 7,
        },
        {
          text: "设备运行日志",
          id: 8,
        },
        {
          text: "设备稼动率/运动率",
          id: 11,
        },
        {
          text: "达成率分析",
          id: 9,
        },
        {
          text: "计划产量实际产量列表",
          id: 10,
        },
      ],
    };
  },
  created() {},
  methods: {
    go(index) {
      switch (index) {
        case 1:
          this.$router.push("/deviceList").catch(() => {});
          break;
        case 2:
          this.$router.push("/Equipment").catch(() => {});
          break;
        case 3:
          this.$router.push("/Maintenance").catch(() => {});
          break;
        case 4:
          this.$router.push("/Examine").catch(() => {});
          break;
        case 5:
          this.$router.push("/Production").catch(() => {});
          break;
        case 6:
          this.$router.push("/Rate").catch(() => {});
          break;
        case 7:
          this.$router.push("/OutsideP").catch(() => {});
          break;
        case 8:
          this.$router.push("/Efficiency").catch(() => {});
          break;
        case 9:
          this.$router.push("/Achievement").catch(() => {});
          break;
        case 10:
          this.$router.push("/Output").catch(() => {});
          break;
        case 11:
          this.$router.push("/Grain").catch(() => {});
      }
    },
  },
};
</script>
<style scoped lang="scss">
.lists {
  height: calc(100% - 114px);
  color: #52b0f7;
  text-align: center;
  list-style: none;
  padding: 0;
  .nav {
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    cursor: pointer;
    padding: 0;
    margin: 0;
  }
}
.box-border {
  border: 1px solid #0bc4e9;
  background: rgba(0, 72, 115, 0.28);
  border-radius: 10px;
}
</style>
