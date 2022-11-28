<template>
  <div tabindex="0" class="common" :class="props.styleButton">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  styleButton: {
    type: String,
    default: "style1",
  },
});
</script>

<style scope>
.common {
  padding: 0 12px;
  height: 32px;
  min-width: 96px;
  font-family: OpenSans-Semibold;
  margin-left: 8px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.style1 {
  background-color: var(--green);
  color: white;
}

.style1:hover {
  background-color: var(--green-hover);
}

.style2 {
  background-color: #ffffff;
  color: #3d3f4e;
  border: 1px solid #cecece;
}

.style2:hover {
  background-color: #eaecef;
}

.style4 {
  padding: 0 4px;
  display: flex;
  align-items: center;
  min-width: 0;
  color: #3d3f4e;
  border: 1px solid #cecece;
}

.style4:hover {
  background-color: #f8f8f8;
}
</style>
