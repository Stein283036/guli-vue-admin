<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>

    <el-steps
      :active="1"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="发布课程" />
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input
          v-model="courseInfo.title"
          placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"
        />
      </el-form-item>

      <!-- 所属分类 -->
      <el-form-item label="课程分类">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="一级分类"
          @change="subjectFirstChanged"
        >
          <el-option
            v-for="subject in subjectFirstList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>

        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
          <el-option
            v-for="subject in subjectSecondList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>

      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="teacher in teachers"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonSum"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        />
      </el-form-item>

      <!-- 课程简介-->
      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description" />
      </el-form-item>

      <!-- 课程封面-->
      <el-form-item label="课程封面">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :action="BASE_API + '/edu/oss/file'"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img :src="courseInfo.cover" class="avatar" />
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
          placeholder="免费课程请设置为0元"
        />
        元
      </el-form-item>
      <el-button :disabled="btnDisabled" type="primary" @click="next"
        >保存并下一步</el-button
      >
    </el-form>
  </div>
</template>
<script>
import {
  listSubjectFirstAPI,
  listSubjectSecondBySubjectParentIdAPI,
} from "@/api/subject";
import { listTeachersAPI } from "@/api/teacher";
import { saveCourseAPI, getCourseByIdAPI } from "@/api/course";

import Tinymce from "@/components/Tinymce";

export default {
  components: {
    Tinymce,
  },

  data() {
    return {
      BASE_API: process.env.VUE_APP_BASE_API,
      teachers: [], // 课程讲师
      subjectFirstList: [], // 一级课程分类列表
      subjectSecondList: [], // 二级课程分类列表
      courseInfo: {
        cover: "",
      },
      btnDisabled: false,
    };
  },

  created() {
    this.listTeachers();
    this.listSubjectFirst();

    if (this.$route.params.id) {
      this.getCourseById().then((subjectParentId) => {
        this.listSubjectSecondBySubjectParentId(subjectParentId);
      });
    }
  },

  methods: {
    beforeAvatarUpload(file) {
      // console.log(file);
      const isJPG = file.type === "image/jpeg";
      const lt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传的图片格式只能是 jpg");
      }
      if (!lt2M) {
        this.$message.error("上传的图片大小不能超过2M");
      }
    },

    handleAvatarSuccess(res) {
      this.courseInfo.cover = res.data.url;
      console.log(this.courseInfo);
    },

    // 根据课程 id 查询课程基本信息
    getCourseById() {
      return new Promise((resolve) => {
        getCourseByIdAPI(this.$route.params.id).then((res) => {
          if (res.success) {
            this.courseInfo = res.data.courseInfo;
            resolve(res.data.courseInfo.subjectParentId);
          }
        });
      });
    },

    listSubjectSecondBySubjectParentId(subjectParentId) {
      listSubjectSecondBySubjectParentIdAPI(subjectParentId).then((res) => {
        this.subjectSecondList = res.data.subjectSecondList;
      });
    },

    listSubjectFirst() {
      listSubjectFirstAPI().then((res) => {
        this.subjectFirstList = res.data.subjectFirstList;
      });
    },

    listTeachers() {
      listTeachersAPI().then((res) => {
        this.teachers = res.data.teachers;
      });
    },

    subjectFirstChanged(subjectParentId) {
      this.listSubjectSecondBySubjectParentId(subjectParentId);
    },

    saveCourse() {
      saveCourseAPI(this.courseInfo).then((res) => {
        this.$message({
          type: "success",
          message: "成功添加课程基本信息",
        });
        this.$router.push({ path: `/course/chapter/${res.data.courseId}` });
      });
    },

    next() {
      this.saveCourse();
    },
  },
};
</script>
