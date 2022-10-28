<template>
  <div class="content">
    <ContentToolBar />
    <ContentTable />
    <ContentFooter />
  </div>
</template>

<script setup>
import ContentToolBar from "../components/ContentToolBar.vue";
import ContentTable from "../components/ContentTable.vue";
import ContentFooter from "../components/ContentFooter.vue";
</script>

<style scope>
.content {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 48px);
  padding: 0 16px;
}
</style>
