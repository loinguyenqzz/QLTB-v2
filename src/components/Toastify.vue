<template>
  <div class="toastify" :class="[props.isOpen ? 'toastify-active' : '']">
    <img src="../assets/Icons/ic_ToastMessage_Success.png" alt="" />
    <div class="toastify-content">
      <span class="toastify-content__title">Thông báo</span>
      <span class="toastify-content__message">{{ props.message }}</span>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  message: {
    type: String,
    default: "",
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});
</script>
<style scoped>
.toastify {
  display: flex;
  min-height: 80px;
  min-width: 300px;
  background-color: white;
  position: fixed;
  z-index: 2;
  top: 10px;
  right: 10px;
  transform: translateX(calc(100% + 20px));
  border-radius: 4px;
  padding: 18px;
  transition: transform 0.3s ease-in;
  border-left: 5px solid var(--green);
}

.toastify > img {
  height: 44px;
}

.toastify-content {
  display: flex;
  flex-direction: column;
  padding-left: 18px;
}

.toastify-active {
  transform: translateX(0) !important;
}

.toastify-content__title {
  font-size: 16px;
  font-weight: 700;
}

.toastify-content__message {
}
</style>
