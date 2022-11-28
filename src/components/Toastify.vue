<template>
  <div class="toastify" :class="[isOpen ? 'toastify-active': '', classType]">
    <img :src="imgToast" alt="" />
    <div class="toastify-content">
      <span class="toastify-content__title">{{ title }}</span>
      <span class="toastify-content__message">{{ toastMessage }}</span>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import imgSuccess from "../assets/Icons/ic_ToastMessage_Success.png";
import imgInfor from "../assets/Icons/ic_ToastMessage_Info.png";
import imgWarning from "../assets/Icons/ic_ToastMessage_Warning.png";
import imgFail from "../assets/Icons/ic_ToastMessage_Fail.png";

const props = defineProps({
  countdown: Number,
});

const title = ref("");
const toastMessage = ref("");
const imgToast = ref(null);
const isOpen = ref(false);
const countdown = ref(props.countdown || 3000);
const classType = ref("");

/**
 * Xử lý đóng toastify
 */
const handleHidden = () => {
  setTimeout(() => {
    isOpen.value = false;
  }, 3000);
};

defineExpose({
  success: (message) => {
    isOpen.value = true;
    title.value = "Thành công";
    toastMessage.value = message;
    imgToast.value = imgSuccess;
    classType.value = "toastify-success";
    handleHidden();
  },
  warning: (message) => {
    isOpen.value = true;
    title.value = "Cảnh báo";
    toastMessage.value = message;
    imgToast.value = imgWarning;
    classType.value = "toastify-warning";
    handleHidden();
  },
  error: (message) => {
    isOpen.value = true;
    title.value = "Lỗi";
    toastMessage.value = message;
    imgToast.value = imgFail;
    classType.value = "toastify-error";
    handleHidden();
  },
  notification: (message) => {
    isOpen.value = true;
    title.value = "Thông báo";
    toastMessage.value = message;
    imgToast.value = imgInfor;
    classType.value = "toastify-notification";
    handleHidden();
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
  z-index: 4;
  bottom: 50px;
  right: 20px;
  transform: translateX(calc(100% + 20px));
  border-radius: 4px;
  padding: 18px;
  transition: transform 0.3s ease-in;
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

.toastify-success {
  border-left: 5px solid var(--green);
}

.toastify-error {
  border-left: 5px solid var(--red);
}

.toastify-warning {
  border-left: 5px solid orange;
}

.toastify-notification {
  border-left: 5px solid var(--link-color);
}

.toastify-content__message {
}
</style>
