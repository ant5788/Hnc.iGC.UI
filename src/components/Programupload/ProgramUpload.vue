<template>
  <div>
    <Header :title="title"></Header>
    <div class="left fl">
      <leftNav></leftNav>
    </div>
    <div class="con fl">
      <div class="upload_box">
        <input
          type="file"
          name="file"
          id="file"
          class="inputfile"
          @change="changeFile"
        />
        <label class="upload" for="file">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text"><em>点击上传</em></div>
          <div class="el-upload__text">
            <span>上传程序名称：</span>{{ fileName }}
          </div>
        </label>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../common/Header.vue";
import leftNav from "../common/leftNav.vue";
export default {
  components: { leftNav, Header },
  data() {
    return {
      title: "程序上传",
      fileName: "",
    };
  },
  methods: {
    changeFile() {
      let files = document.getElementById("file").files[0];
      console.log(files);
      this.fileName = files.name;
    },
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
  text-align: center;
}
.upload {
  display: block;
  width: 400px;
  height: 400px;
  border: 1px dashed #409eff;
  margin: 30px auto;
}
.upload_box {
  clear: both;
  text-align: center;
  width: 100%;
}
.el-icon-upload {
  font-size: 200px;
  color: #c0c4cc;
}
.el-upload__text {
  font-size: 20px;
  color: #fff;
}
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
</style>
