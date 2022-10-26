<script setup>
defineProps({
  type: String,
});

</script>

<template>
  <button class="common" :class="type">
    <slot></slot>
  </button>
</template>

<style scope>
  .common {
    padding: 0 12px;
    margin: 0 0 0 8px;
    height: 32px;
    min-width: 96px;
    font-family: OpenSans-Semibold;
    font-size: 13px;
    cursor: pointer;
  }

  .style1 {
    color: #ffffff;
    background-color: var(--green);
    border: 0;
    border-radius: 4px;
  }
  .style1:hover {
    background-color: var(--greenHover);
  }

  .style2 {
    border: 1px solid var(--boderColor);
    background-color: var(--white);
    border-radius: 4px;
  }
  .style2:hover {
    background-color: var(--whiteHover);
  }
</style>
