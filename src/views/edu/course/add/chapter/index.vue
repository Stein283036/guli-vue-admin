<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>

    <el-steps
      :active="2"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="发布课程" />
    </el-steps>

    <el-form label-width="120px">
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="btnDisabled" type="primary" @click="next"
        >保存并下一步</el-button
      >
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      btnDisabled: false,
      courseId: "",
    };
  },

  created() {
    this.courseId = this.$route.params.id;
  },

  methods: {
    previous() {
      this.$router.push({ path: `/course/info/${this.courseId}` });
    },

    next() {
      this.$router.push({ path: "/course/publish/1" });
    },
  },
};
</script>
