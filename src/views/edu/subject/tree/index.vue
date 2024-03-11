<template>
  <div class="app-container">
    <el-input
      v-model="filterText"
      placeholder="Filter keyword"
      style="margin-bottom: 30px"
    />

    <el-tree
      ref="tree"
      :data="data"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />
  </div>
</template>

<script>
import { treeListSubjectAPI } from "@/api/subject";

export default {
  data() {
    return {
      filterText: "",
      data: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },

  created() {
    this.treeListSubject();
  },

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },

  methods: {
    treeListSubject() {
      treeListSubjectAPI().then((res) => {
        this.data = res.data.subjects;
      });
    },

    filterNode(value, data) {
      if (!value) return true;
      return data.title.indexOf(value) !== -1;
    },
  },
};
</script>
