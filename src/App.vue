<template>
  <div class="flex">
    <TheSidebar />
    <div class="container">
      <TheHeader />
      <router-view></router-view>
    </div>
    <Toastify ref="toast" />
  </div>
</template>

<script setup>
import TheSidebar from "./layout/TheSidebar.vue";
import TheHeader from "./layout/TheHeader.vue";
import Toastify from "./components/Toastify.vue";
import { provide, ref } from "vue";

const toast = ref(null);
const setToast = (type, message) => {
  toast.value[type](message)
};

provide("toast", {
  toast,
  setToast,
});
</script>

<style scoped>
.container {
  flex: 1;
  width: calc(100vw - 220px);
  height: 100vh;
}
</style>
