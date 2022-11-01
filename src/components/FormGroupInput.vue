<template>
  <div class="input-group">
    <label for="" class="input-label">
      {{ props.label }}
      <span v-if="props.isRequire" style="color: red">*</span>
    </label>
    <input
      type="text"
      class="base-input"
      @input="handleInput"
      :value="props.modelValue"
    />
    <div v-if="errorMessage" class="error-message">
      <div class="triangle"></div>
      <span>Looi</span>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  isRequire: {
    type: Boolean,
    default: false,
  },
  label: String,
  errorMessage: {
    type: String,
    default: null,
  },
  modelValue: {
    type: String,
    default: ""
  },
});

const emits = defineEmits(["update:modelValue"]);

const handleInput = (e) => {
  emits("update:modelValue", e.target.value);
};
</script>
<style scope>
.base-input {
  height: 32px;
  padding: 0 12px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  outline: none;
}

.base-input:focus {
  border: 1px solid var(--green);
}

.input-group {
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  width: 300px;
  position: relative;
}

.triangle {
  height: 10px;
  width: 10px;
  background-color: #ff8484;
  transform: rotate(45deg);
  position: absolute;
  top: calc(50% - 5px);
  left: -5px;
  z-index: -1;
}

.error-message {
  width: 150px;
  height: 28px;
  background-color: #ff8484;
  color: white;
  display: flex;
  align-items: center;
  padding-left: 5px;
  position: absolute;
  border-radius: 4px;
  top: 0;
  right: -160px;
  z-index: 2;
}

.input-label {
  color: var(--label-color);
  min-width: 110px;
}
</style>
