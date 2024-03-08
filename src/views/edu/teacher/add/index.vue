<template>
  <div class="app-container">
    <el-form
      :model="teacher"
      :rules="rules"
      ref="teacher"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="讲师姓名" prop="name">
        <el-input v-model="teacher.name"></el-input>
      </el-form-item>

      <el-form-item label="讲师头衔" prop="level">
        <el-select v-model.number="teacher.level" placeholder="请选择讲师头衔">
          <el-option label="高级讲师" :value="1"></el-option>
          <el-option label="首席讲师" :value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="讲师排序" prop="sort">
        <el-input-number
          v-model.number="teacher.sort"
          controls-position="right"
          :min="0"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="讲师资历" prop="career">
        <el-input v-model="teacher.career"></el-input>
      </el-form-item>

      <el-form-item label="讲师简介" prop="intro">
        <el-input type="textarea" v-model="teacher.intro" :rows="10"></el-input>
      </el-form-item>

      <!-- 讲师头像：TODO -->

      <el-form-item>
        <el-button
          type="primary"
          @click="saveOrUpdateTeacher('teacher')"
          :disabled="disabled"
          >保存</el-button
        >
        <el-button @click="resetForm('teacher')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  saveTeacherAPI,
  updateTeacherAPI,
  getTeacherByIdAPI,
} from "@/api/teacher";

export default {
  data() {
    return {
      disabled: false,

      teacher: {},

      editFlag: false,

      rules: {
        name: [
          { required: true, message: "请输入讲师姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        level: [{ required: true, message: "请选择讲师头衔", trigger: "blur" }],
        career: [
          { required: true, message: "请输入讲师资历", trigger: "blur" },
        ],
        sort: [{ required: true, message: "请输入讲师排序", trigger: "blur" }],
      },
    };
  },

  created() {
    if (this.$route.params && this.$route.params.id) {
      this.teacher.id = this.$route.params.id;
      this.editFlag = true;
      this.getTeacherById();
    }
  },

  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    saveOrUpdateTeacher(formName) {
      this.disabled = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.editFlag) {
            this.updateTeacher();
            this.editFlag = false;
          } else {
            this.saveTeacher();
          }
          this.disabled = false;
          this.$router.push({ path: "/teacher/table" });
        } else {
          this.disabled = false;
          return false;
        }
      });
    },

    getTeacherById() {
      getTeacherByIdAPI(this.teacher.id).then((res) => {
        this.teacher = res.data.teacher;
      });
    },

    saveTeacher() {
      saveTeacherAPI(this.teacher).then((res) => {
        this.$message({
          type: "success",
          message: "添加成功!",
        });
      });
    },

    updateTeacher() {
      updateTeacherAPI(this.teacher).then((res) => {
        this.$message({
          type: "success",
          message: "修改成功!",
        });
      });
    },
  },
};
</script>
