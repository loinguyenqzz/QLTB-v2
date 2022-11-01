<template>
  <div class="toolbar">
    <BaseInputSearch />
    <div class="toolbar__right">
      <BaseButton style-button="style1" @click="handleClick">Thêm</BaseButton>
      <BaseButton style-button="style2">Xuất khẩu</BaseButton>
      <BaseButton style-button="style4">
        <img src="../assets/Icons/ic_More.png" alt="" />
      </BaseButton>
      <ModalForm
        v-if="isModalActive"
        width="850"
        title-modal="Thêm hồ sơ Cán bộ, giáo viên"
        @close="closeModal"
      />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import BaseInputSearch from "../components/common/BaseInputSearch.vue";
import BaseButton from "./common/BaseButton.vue";
import ModalForm from "./ModalForm.vue";

const isModalActive = ref(false);

const handleClick = () => {
  isModalActive.value = !isModalActive.value;
};

const closeModal = () => {
  isModalActive.value = !isModalActive.value;
};
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
