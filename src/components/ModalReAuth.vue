<template>
  <Modal>
    <template #default>
      <div class="modal__inner">
        <div class="modal__title">{{ props.titleModal }}</div>
        <span style="line-height: 22px">{{ props.message }}</span>
      </div>
    </template>
    <template #submit>
      <BaseButton @click="emits('submit', props.reAuthId)">Đồng ý</BaseButton>
    </template>
  </Modal>
</template>
<script setup>
import Modal from "./Modal.vue";
import BaseButton from "./common/BaseButton.vue";
const props = defineProps({
  titleModal: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
  reAuthId: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["submit"]);
</script>
<style scoped>
.modal__inner {
  height: 100%;
  flex: 1;
  padding: 12px 16px 80px 16px;
}

.modal__title {
  font-size: 16px;
  margin-bottom: 12px;
}
</style>
