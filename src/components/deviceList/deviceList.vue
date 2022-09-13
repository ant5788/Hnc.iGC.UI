<template>
  <div class="main">
    <Header :title="title"></Header>
    <div class="left fl">
      <leftNav></leftNav>
    </div>
    <div class="con fl">
      <div class="deviceList">
        <div class="warp">
          <div
            class="item"
            @click="getdevice(item.DeviceId)"
            v-for="item in deviceList"
            :key="item.Id"
          >
            <div class="img_box fl">
              <img :src="item.DevicePhoto" />
            </div>
            <div class="device_info fl">
              <p>
                <span class="text">设备名称：</span>
                <span>{{ item.DeviceName }}</span>
              </p>
              <p>
                <span class="text">设备编号：</span>
                <span>{{ item.DeviceNumber }}</span>
              </p>
              <p>
                <span class="text">资产编号：</span>
                <span>{{ item.AssetsNumber }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <el-pagination
        v-show="isshow"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="[10, 20, 30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
let query = "/api/CNC/GetDeviceDetailList";
import leftNav from "../common/leftNav.vue";
import Header from "../common/Header.vue";
export default {
  components: { leftNav, Header },
  data() {
    return {
      title: "设备列表",
      deviceList: [],
      isshow: false,
      pageSize: 10,
      pageNo: 1,
      total: 0,
    };
  },
  created() {
    this.getDeviceData();
  },
  methods: {
    getdevice(id) {
      console.log(id);
      this.$router
        .push({ path: "/Machine", query: { id: id } })
        .catch(() => {});
    },
    getDeviceData() {
      this.deviceList = [];
      this.$axios
        .get(
          this.$api +
            query +
            "?pageNo=" +
            this.pageNo +
            "&pageSize=" +
            this.pageSize
        )
        .then((res) => {
          if (res.data.state === 1) {
            this.deviceList = res.data.data.list;
            if (this.deviceList.length > 0) {
              this.isshow = true;
            } else {
              this.isshow = false;
            }
          }
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getDeviceData();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getDeviceData();
    },
  },
};
</script>
<style scoped lang="scss">
.main {
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
    // overflow-y: auto;
    // &::-webkit-scrollbar {
    //   /*滚动条整体样式*/
    //   width: 10px;
    //   /*高宽分别对应横竖滚动条的尺寸*/
    //   height: 1px;
    // }
    // &::-webkit-scrollbar-thumb {
    //   /*滚动条里面小方块*/
    //   border-radius: 10px;
    //   box-shadow: inset 0 0 5px #59ebe8;
    //   background: #59ebe8;
    // }
  }
  .warp {
    width: 100%;
    display: flex;
    flex-flow: wrap;
  }
  .item {
    width: 32%;
    border: 1px solid #59ebe8;
    border-radius: 8px;
    margin: 8px;
  }
  .img_box {
    width: 45%;
    img {
      width: 220px;
    }
  }
  .device_info {
    width: 55%;
    color: #fff;
    font-size: 18px;
  }
  .el-pagination button,
  /deep/.el-pagination span:not([class*="suffix"]) {
    font-size: 18px;
    height: 30px;
    line-height: 30px;
  }
  /deep/.el-input--mini {
    font-size: 18px;
  }
}
</style>
