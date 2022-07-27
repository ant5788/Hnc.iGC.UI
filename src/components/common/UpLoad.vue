<template>
  <div>
    <el-dialog
      title="文件上传"
      :visible="upShow"
      :modal-append-to-body="false"
      :before-close="onClose"
      width="30"
    >
      <el-upload
        class="upload-demo"
        ref="upload"
        action=""
        :http-request="myUploadFile"
        :on-remove="handleRemove"
        :on-change="handlChange"
        :on-exceed="handlExceed"
        :file-list="fileList"
        :limit="1"
        accept=".xlsx,.xls"
        :auto-upload="false"
      >
        <el-button slot="trigger" type="success">选取文件</el-button>
        <div class="text">只能上传xls/xlsx文件</div>
      </el-upload>
    </el-dialog>
  </div>
</template>
<script>
let upLoad = "";
export default {
  props: {
    upShow: {
      type: Boolean,
      require: true,
    },
    type: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      fileList: [],
    };
  },
  created() {
    console.log(this.type);
  },
  methods: {
    /**
     * 文件删除回调
     */
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },

    /**
     * 选择文件时回调
     */
    handlChange(file, fileList) {
      this.fileList = fileList;
    },
    /**
     * 文件提交回调
     * @param data
     */
    myUploadFile(data) {
      let file = data.file;
      let formData = new FormData();
      formData.append("file", file);
      const loading = this.$loading({
        lock: true,
        text: "文件导入中",
      });
      this.$axios
        .post(this.$api + upLoad, formData)
        .then((res) => {
          console.log(res);
          loading.close();
          this.submitLoading = false;
          this.$confirm("", "导入成功", {
            confirmButtonText: "确定",
            type: "success",
            showCancelButton: false,
            closeOnClickModal: false,
            center: true,
          });
        })
        .catch(() => {
          loading.close();
          this.submitLoading = false;
        });
    },

    /**
     * 导入按钮触发
     */
    submitUpload() {
      this.submitLoading = true;
      if (this.fileList.length <= 0) {
        this.$message.error("请先选择上传文件");
        this.submitLoading = false;
        return;
      }
      this.$refs.upload.submit(); //如果:http-request=""指定了回调函数,则会覆盖默认的上传,会流入到http-request的回调中
    },
    /**
     * 超出上传个数回调
     */
    handlExceed() {
      this.$message.error("只能选择一个文件进行上传");
    },
    onClose() {
      this.$emit("update:upShow", false);
    },
  },
};
</script>
