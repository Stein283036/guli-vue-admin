<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="courseQuery.title" placeholder="课程名称" />
      </el-form-item>

      <el-form-item>
        <el-select
          v-model="courseQuery.status"
          clearable
          placeholder="课程状态"
        >
          <el-option value="Normal" label="已发布" />
          <el-option value="Draft" label="未发布" />
        </el-select>
      </el-form-item>

      <el-button
        type="primary"
        icon="el-icon-search"
        @click="pageCoursesWithCondition()"
        >查询</el-button
      >
      <el-button type="default" @click="reset()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table :data="courses" border fit highlight-current-row>
      <el-table-column label="序号" align="center">
        <template slot-scope="scope">
          {{ (current - 1) * size + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="课程名称" />

      <el-table-column label="课程状态">
        <template slot-scope="scope">
          {{ scope.row.status === "Normal" ? "已发布" : "未发布" }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/course/info/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >编辑课程基本信息</el-button
            >
          </router-link>
          <router-link :to="'/course/chapter/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >编辑课程大纲</el-button
            >
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeCourseById(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="pageCoursesWithCondition"
      :current-page.sync="current"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="size"
      layout="sizes, prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
import {
  pageCoursesWithConditionAPI,
  pageCoursesAPI,
  removeCourseByIdWithCascade,
} from "@/api/course";

export default {
  components: {},

  data() {
    return {
      current: 1,
      size: 10,
      total: 0,
      courses: [],
      courseQuery: {},
    };
  },

  created() {
    this.init();
  },

  methods: {
    removeCourseById(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          removeCourseByIdWithCascade(id).then((res) => {
            if (res.success) {
              this.pageCourses();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    handleSizeChange(val) {
      this.size = val;
      this.pageCoursesWithCondition();
    },

    init() {
      this.pageCourses();
    },

    reset() {
      this.courseQuery = {};
      this.pageCourses();
    },

    pageCoursesWithCondition() {
      pageCoursesWithConditionAPI(
        this.current,
        this.size,
        this.courseQuery
      ).then((res) => {
        this.courses = res.data.courses;
        this.total = res.data.total;
      });
    },

    pageCourses() {
      pageCoursesAPI(this.current, this.size).then((res) => {
        this.courses = res.data.courses;
        this.total = res.data.total;
      });
    },
  },
};
</script>
