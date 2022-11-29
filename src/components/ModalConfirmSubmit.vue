<template>
  <Modal>
    <template #default>
      <div class="modal__inner">
        <div class="modal__title">{{ props.titleModal }}</div>
        <span style="line-height: 22px">{{ props.message }}</span>
      </div>
    </template>
    <template #submit>
     <BaseButton styleButton="style2" @click="emits('isSave', false)">Không</BaseButton>
     <BaseButton @click="emits('isSave', true)">Lưu</BaseButton>
    </template>
  </Modal>
</template>
<script setup>
import Modal from "../components/Modal.vue";
import BaseButton from "./common/BaseButton.vue";

const props = defineProps({
  titleModal: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  }
});

const emits = defineEmits(["isSave"]);
</script>
<style scoped>
.modal__inner {
  height: 100%;
  flex: 1;
  padding: 20px 24px calc(24px + 32px + 16px) 24px;
}

.modal__title {
  font-size: 16px;
  margin-bottom: 12px;
  font-family: OpenSans-Semibold;
}
</style>