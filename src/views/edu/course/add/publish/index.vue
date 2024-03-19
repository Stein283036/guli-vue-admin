<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>

    <el-steps
      :active="3"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="发布课程" />
    </el-steps>

    <div class="course-pulish-info">
      <img :src="coursePublishInfo.cover" />
      <div class="main">
        <h2>{{ coursePublishInfo.title }}</h2>
        <p class="gray">
          <span>共{{ coursePublishInfo.lessonSum }}课时</span>
        </p>
        <p>
          <span
            >所属分类：{{ coursePublishInfo.subjectFirstTitle }} —
            {{ coursePublishInfo.subjectSecondTitle }}</span
          >
        </p>
        <p>课程讲师：{{ coursePublishInfo.teacherName }}</p>
        <h3 class="red">￥{{ coursePublishInfo.price }}</h3>
      </div>
    </div>

    <el-form label-width="120px">
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="btnDisabled" type="primary" @click="publishCourse"
        >发布课程</el-button
      >
    </el-form>
  </div>
</template>
<script>
import {
  getCoursePublishInfoByCourseIdAPI,
  publishCourseAPI,
} from "@/api/course";

export default {
  data() {
    return {
      btnDisabled: false,
      courseId: "",
      coursePublishInfo: {},
    };
  },

  created() {
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id;
    }

    this.getCoursePublishInfoByCourseId(this.courseId);
  },

  methods: {
    getCoursePublishInfoByCourseId(courseId) {
      getCoursePublishInfoByCourseIdAPI(courseId).then((res) => {
        this.coursePublishInfo = res.data.coursePublishInfo;
      });
    },

    previous() {
      this.$router.push({ path: `/course/chapter/${this.courseId}` });
    },

    publishCourse() {
      publishCourseAPI(this.courseId).then((res) => {
        this.$message({
          type: "success",
          message: "课程发布成功",
        });
        this.$router.push({path: '/course/table'})
      });
    },
  },
};
</script>

<style scoped>
.course-pulish-info {
  background: #f5f5f5;
  padding: 20px;
  overflow: hidden;
  border: 1px dashed #ddd;
  margin-bottom: 40px;
  position: relative;
}
.course-pulish-info img {
  background: #d6d6d6;
  width: 500px;
  height: 278px;
  display: block;
  float: left;
  border: none;
}
.course-pulish-info .main {
  margin-left: 520px;
}

.course-pulish-info .main h2 {
  font-size: 28px;
  margin-bottom: 30px;
  line-height: 1;
  font-weight: normal;
}
.course-pulish-info .main p {
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}

.course-pulish-info .main p {
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}
.course-pulish-info .main h3 {
  left: 540px;
  bottom: 20px;
  line-height: 1;
  font-size: 28px;
  color: #d32f24;
  font-weight: normal;
  position: absolute;
}
</style>
