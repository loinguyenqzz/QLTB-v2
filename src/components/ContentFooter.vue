<template>
  <div class="content-footer">
    <img
      :class="{ disable: currentPage == 1 }"
      src="../assets/Icons/ic_MoveToFirst.png"
      alt=""
      @click="currentPage != 1 && handleChangeCurrentPage(1)"
    />
    <img
      :class="{ disable: currentPage == 1 }"
      src="../assets/Icons/ic_Back.png"
      alt=""
      @click="handleChangeCurrentPage(currentPage - 1)"
    />
    <input
      class="current-page"
      v-model="textInput"
      @keyup.enter="handleChangeCurrentPage(textInput)"
    />
    <img
      :class="{ disable: currentPage == props.totalPages }"
      src="../assets/Icons/ic_Next.png"
      alt=""
      @click="handleChangeCurrentPage(currentPage + 1)"
    />
    <img
      :class="{ disable: currentPage == props.totalPages }"
      src="../assets/Icons/ic_MoveToLast.png"
      alt=""
      @click="currentPage != props.totalPages && handleChangeCurrentPage(totalPages)"
    />
    <span
      >{{ currentPage }}/{{ props.totalPages }} trang
      {{ props.totalRecords }} kết quả</span
    >
  </div>
</template>
<script setup>
import { computed, ref, toRef, watch } from "vue";
import BaseInput from "./common/BaseInput.vue";
const props = defineProps({
  totalPages: {
    type: Number,
    default: 0,
  },
  totalRecords: {
    type: Number,
    default: 0,
  },
  pageSize: {
    type: Number,
    default: 20,
  },
  pageNumber: {
    type: Number,
    default: 1,
  },
});

const emits = defineEmits(["changePageNumber"]);
const textInput = ref(props.pageNumber);
const currentPage = ref(props.pageNumber);

watch(toRef(props, "pageNumber"), (value) => {
  textInput.value = value;
  currentPage.value = value;
});

/**
 * Xử lý khi thay đổi trang hiện tại
 * @param pageNumber: Trang hiện tại
 */
const handleChangeCurrentPage = (pageNumber) => {
  if (pageNumber > 0 && pageNumber <= props.totalPages) {
    currentPage.value = pageNumber;
    emits("changePageNumber", pageNumber);
  } else {
    console.log("invalid page number");
  }
};
</script>
<style>
.content-footer {
  box-shadow: 0px 0px 10px var(--shadow-color);
  height: 56px;
  display: flex;
  align-items: center;
}
.content-footer > * {
  margin-left: 20px !important;
}
.content-footer > *:not(.current-page) {
  cursor: pointer;
}
.current-page {
  width: 64px;
  text-align: center;
  height: 32px;
  padding: 0 12px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  outline: none;
}

.disable {
  opacity: 0.7;
  cursor: default !important;
}
</style>
