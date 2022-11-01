<template>
  <div class="input-date">
    <label for="">{{ props.label }}</label>
    <input type="date" />
  </div>
</template>
<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
});
</script>
<style scoped>
.input-date {
    position: relative;
}

.input-date::before {
    content: "";
    position: absolute;
    width: 1px;
    height: 100%;
    top: 0;
    right: 32px;
    background-color: var(--border-color);
}

.input-date input {
  height: 32px;
  padding: 0 8px 0  12px;
  margin-left: 12px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  outline: none;
}

::-webkit-calendar-picker-indicator {
  background: url("../../assets/Icons/ic_date.svg") center/80% no-repeat;
}
</style>
