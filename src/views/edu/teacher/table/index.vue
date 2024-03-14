<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.name" placeholder="讲师姓名" />
      </el-form-item>

      <el-form-item>
        <el-select
          v-model="teacherQuery.level"
          clearable
          placeholder="讲师头衔"
        >
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="teacherQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teacherQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button
        type="primary"
        icon="el-icon-search"
        @click="pageTeachersWithCondition()"
        >查询</el-button
      >
      <el-button type="default" @click="reset()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table :data="teachers" border fit highlight-current-row>
      <el-table-column label="序号" align="center">
        <template slot-scope="scope">
          {{ (current - 1) * size + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名称" />

      <el-table-column label="头衔">
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? "高级讲师" : "首席讲师" }}
        </template>
      </el-table-column>

      <el-table-column prop="intro" label="资历" />

      <el-table-column prop="gmtCreate" label="添加时间" />

      <el-table-column prop="sort" label="排序" />

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >修改</el-button
            >
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeTeacherById(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="pageTeachersWithCondition"
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
  pageTeachersAPI,
  pageTeachersWithConditionAPI,
  removeTeacherByIdAPI,
} from "@/api/teacher";

export default {
  data() {
    return {
      current: 1,
      size: 10,
      total: 0,
      teacherQuery: {},
      teachers: [],
    };
  },

  created() {
    this.init();
  },

  methods: {
    init() {
      this.pageTeachers();
    },

    reset() {
      this.teacherQuery = {};
      this.pageTeachers();
    },

    handleSizeChange(val) {
      this.size = val;
      this.pageTeachersWithCondition();
    },

    removeTeacherById(id) {
      // console.log(id);
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          removeTeacherByIdAPI(id).then((res) => {
            if (res.success) {
              this.pageTeachers();
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

    pageTeachersWithCondition() {
      pageTeachersWithConditionAPI(
        this.current,
        this.size,
        this.teacherQuery
      ).then((res) => {
        this.teachers = res.data.records;
        this.total = res.data.total;
      });
    },

    pageTeachers() {
      pageTeachersAPI(this.current, this.size).then((res) => {
        this.teachers = res.data.records;
        this.total = res.data.total;
      });
    },
  },
};
</script>
