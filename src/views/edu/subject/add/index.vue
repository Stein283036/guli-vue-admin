<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">excel 模版说明</el-tag>
        <el-tag>
          <i class="el-icon-download" />
          <a
            href="https://guli-edu-stein.oss-cn-nanjing.aliyuncs.com/subject/subject.xlsx"
            >点击下载模版</a
          >
        </el-tag>
      </el-form-item>

      <el-form-item label="选择 Excel">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="btnDisabled"
          :limit="1"
          :action="BASE_API + '/edu/service/subjects'"
          name="file"
          accept="application/vnd.ms-excel"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <el-button
            :loading="loading"
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            >上传到服务器</el-button
          >
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      BASE_API: process.env.VUE_APP_BASE_API,
      Aliyun_OSS_BASE_API: process.env.Aliyun_OSS_BASE_API,
      btnDisabled: false,
      loading: false,
    };
  },

  methods: {
    fileUploadError() {
      this.Loading = false;
      this.disabled = false;
      this.$message({
        type: "error",
        message: "添加课程分类失败",
      });
    },

    fileUploadSuccess() {
      this.loading = false;
      this.disabled = false;
      this.$message({
        type: "success",
        message: "添加课程分类成功",
      });
      this.$router.push({ path: "/subject/tree" });
    },

    submitUpload() {
      this.loading = true;
      this.disabled = true;
      this.$refs.upload.submit();
    },
  },
};
</script>
