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
          text: "文件导入",
          id: 5,
        },
        {
          text: "实时产量统计",
          id: 6,
        },
        {
          text: "累计产量统计",
          id: 7,
        },
        {
          text: "合格率统计分析",
          id: 8,
        },
        {
          text: "外协加工进度",
          id: 9,
        },
        {
          text: "设备运行日志",
          id: 10,
        },
      ],
    };
  },
  created() {},
  methods: {
    go(val) {
      console.log(val);
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
