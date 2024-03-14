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

    <el-button type="text" @click="openChapterSaveDialog()">添加章节</el-button>

    <!-- 章节 -->
    <ul class="chapters">
      <li v-for="chapter in chapters" :key="chapter.id">
        <p>
          {{ chapter.title }}

          <span class="acts">
            <el-button
              style=""
              type="text"
              @click="openSectionSaveDialog(chapter.id)"
              >添加小节</el-button
            >
            <el-button
              style=""
              type="text"
              @click="openChapterEditDialog(chapter.id)"
              >编辑</el-button
            >
            <el-button type="text" @click="deleteChapterById(chapter.id)"
              >删除</el-button
            >
          </span>
        </p>

        <!-- 小节 -->
        <ul class="chapters sections">
          <li v-for="section in chapter.sections" :key="section.id">
            <p>
              {{ section.title }}

              <span class="acts">
                <el-button
                  style=""
                  type="text"
                  @click="openSectionEditDialog(section.id)"
                  >编辑</el-button
                >
                <el-button type="text" @click="deleteSection(section.id)"
                  >删除</el-button
                >
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>

    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title" />
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number
            v-model="chapter.sort"
            :min="0"
            controls-position="right"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateChapter">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加和修改小节 -->
    <el-dialog :visible.sync="dialogSectionFormVisible" title="添加小节">
      <el-form :model="section" label-width="120px">
        <el-form-item label="小节标题">
          <el-input v-model="section.title" />
        </el-form-item>
        <el-form-item label="小节排序">
          <el-input-number
            v-model="section.sort"
            :min="0"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="section.isFree">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <!-- TODO -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSectionFormVisible = false">取 消</el-button>
        <el-button
          :disabled="saveSectionBtnDisabled"
          type="primary"
          @click="saveOrUpdateSection"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-form label-width="120px">
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="btnDisabled" type="primary" @click="next"
        >保存并下一步</el-button
      >
    </el-form>
  </div>
</template>

<script>
import {
  getSectionByIdAPI,
  saveSectionAPI,
  updateSectionByIdAPI,
  deleteSectionByIdAPI,
} from "@/api/section";
import {
  treeListChapterAPI,
  saveChapterAPI,
  getChapterByIdAPI,
  updateChapterByIdAPI,
  deleteChapterByIdAPI,
} from "@/api/chapter";

export default {
  data() {
    return {
      section: {},
      saveSectionBtnDisabled: false,
      dialogSectionFormVisible: false, // 小节表单显示标志

      chapter: {},
      dialogChapterFormVisible: false, // 章节表单显示标志
      btnDisabled: false,
      courseId: "",
      chapters: [],
    };
  },

  created() {
    this.courseId = this.$route.params.id;
    this.chapter.courseId = this.courseId;
    this.treeListChapter();
  },

  methods: {
    saveOrUpdateSection() {
      // console.log(this.section.id);
      if (this.section.id) {
        // 修改小节
        this.updateSection();
      } else {
        // 添加小节
        this.saveSection();
      }
    },

    updateSection() {
      updateSectionByIdAPI(this.section).then((res) => {
        this.dialogSectionFormVisible = false;
        this.$message({
          type: "success",
          message: "小节修改成功",
        });
        this.treeListChapter();
      });
    },

    saveSection() {
      saveSectionAPI(this.section).then((res) => {
        this.dialogSectionFormVisible = false;
        this.$message({
          type: "success",
          message: "小节添加成功",
        });
        this.treeListChapter();
      });
    },

    openSectionEditDialog(sectionId) {
      this.section = {};
      getSectionByIdAPI(sectionId).then((res) => {
        this.section = res.data.section;
      });
      this.dialogSectionFormVisible = true;
    },

    openSectionSaveDialog(chapterId) {
      this.section = {};
      this.section.chapterId = chapterId;
      this.section.courseId = this.courseId;
      this.dialogSectionFormVisible = true;
    },

    deleteSection(sectionId) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteSectionByIdAPI(sectionId).then((res) => {
            if (res.success) {
              this.$message({
                type: "success",
                message: "小节删除成功",
              });
              this.treeListChapter();
            } else {
              this.$message({
                type: "error",
                message: res.message,
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

    deleteChapterById(chapterId) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteChapterByIdAPI(chapterId).then((res) => {
            if (res.success) {
              this.$message({
                type: "success",
                message: "章节删除成功",
              });
              this.treeListChapter();
            } else {
              this.$message({
                type: "error",
                message: res.message,
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

    updateChapterById() {
      updateChapterByIdAPI(this.chapter).then((res) => {
        this.dialogChapterFormVisible = false;
        this.$message({
          type: "success",
          message: "章节修改成功",
        });
        this.treeListChapter();
      });
    },

    openChapterEditDialog(chapterId) {
      this.chapter = {};
      getChapterByIdAPI(chapterId).then((res) => {
        this.chapter = res.data.chapter;
      });
      this.dialogChapterFormVisible = true;
    },

    saveChapter() {
      saveChapterAPI(this.chapter).then((res) => {
        this.dialogChapterFormVisible = false;
        this.$message({
          type: "success",
          message: "章节添加成功",
        });
        this.treeListChapter();
      });
    },

    saveOrUpdateChapter() {
      if (this.chapter.id) {
        this.updateChapterById();
      } else {
        this.saveChapter();
      }
    },

    openChapterSaveDialog() {
      this.chapter = {};
      this.dialogChapterFormVisible = true;
    },

    treeListChapter() {
      treeListChapterAPI(this.courseId).then((res) => {
        this.chapters = res.data.chapters;
      });
    },

    previous() {
      this.$router.push({ path: `/course/info/${this.courseId}` });
    },

    next() {
      this.$router.push({ path: "/course/publish/1" });
    },
  },
};
</script>

<style scoped>
.chapters {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chapters li {
  position: relative;
}
.chapters p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #ddd;
}
.chapters .acts {
  float: right;
  font-size: 14px;
}

.sections {
  padding-left: 50px;
}
.sections p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #ddd;
}
</style>
