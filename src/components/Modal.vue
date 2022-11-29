<template>
  <div class="modal-backdrop">
    <div class="modal" :style="modalStyle">
      <img
        class="modal__btn--close"
        src="../assets/Icons/ic_X_2.png"
        alt=""
        @click="handleCloseModal"
      />
      <div class="modal-container">
        <slot name="extra"></slot>
        <slot></slot>
        <div class="modal-footer">
          <BaseButton v-if="!props.customClose" styleButton="style2" @click="handleCloseModal"
            >Đóng</BaseButton>
          <slot name="submit"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import BaseButton from "./common/BaseButton.vue";
const props = defineProps({
  width: {
    type: String,
    default: 0,
  },
  customClose: {
    type: Boolean,
    default: false
  }
});
const emits = defineEmits(["close"]);
const modalStyle = {
  "max-width": props.width + "px",
};

/**
 * Xử lý đóng modal
 */
const handleCloseModal = () => {
  emits('close')
};
</script>
<style scoped>
.modal-backdrop {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background-color: white;
  position: relative;
  flex: 1;
}

.modal__btn--close {
  position: absolute;
  right: 8px;
  top: 8px;
  cursor: pointer;
  z-index: 2;
}

.modal-container {
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
}

.modal-footer {
  position: absolute;
  display: flex;
  right: 24px;
  bottom: 24px;
}
</style>
