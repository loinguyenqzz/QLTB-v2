<template>
  <div class="content-footer">
    <img src="../assets/Icons/ic_MoveToFirst.png" alt="" />
    <img src="../assets/Icons/ic_Back.png" alt="" />
    <BaseInput class="current-page"/>
    <img src="../assets/Icons/ic_Next.png" alt="" />
    <img src="../assets/Icons/ic_MoveToLast.png" alt="" />
    <span>1/n trang x kết quả</span>
  </div>
</template>
<script setup>
import BaseInput from "./common/BaseInput.vue";
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
}
</style>
