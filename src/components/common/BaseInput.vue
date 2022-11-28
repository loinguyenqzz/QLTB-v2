<template>
  <input
    type="text"
    class="base-input"
    :modelValue="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
<script setup>
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>
<style scoped>
.base-input {
  height: 32px;
  padding: 0 12px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  outline: none;
}
</style>
