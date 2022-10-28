<template>
  <div class="toolbar">
    <BaseInputSearch />
    <div class="toolbar__right">
      <BaseButton style-button="style1">Thêm</BaseButton>
      <BaseButton style-button="style2">Xuất khẩu</BaseButton>
      <BaseButton style-button="style4">
        <img src="../assets/Icons/ic_More.png" alt="" />
      </BaseButton>
    </div>
  </div>
</template>
<script setup>
import BaseInputSearch from "../components/common/BaseInputSearch.vue";
import BaseButton from "./common/BaseButton.vue";
</script>
<style scope>
.toolbar {
  height: 64px;
  width: 100%;
  padding: 16px 0;
  display: flex;
}

.toolbar__right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
</style>
