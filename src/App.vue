<script setup>
import TheSidebar from "./layout/TheSidebar.vue";
import TheHeader from "./layout/TheHeader.vue";
import TheContent from "./layout/TheContent.vue";
</script>

<template>
  <div class="flex">
    <TheSidebar />
    <div class="container">
      <TheHeader />
      <TheContent />
    </div>
  </div>
</template>

<style scoped>
.container {
  flex-grow: 1;
  height: 100vh;
}
</style>
