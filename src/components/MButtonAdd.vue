<template>
  <div class="m-btn-add">
    <img src="../assets/Icons/ic_Plus.png" alt="" class="icon-add" />
    <button class="btn-add">
      <slot></slot>
    </button>
  </div>
</template>

<script setup></script>

<style>
.m-btn-add {
  margin-top: 10px;
  height: 32px;
  display: flex;
  width: 190px;
  border: 1px solid #0FA655;
  border-radius: 4px;
}

.btn-add {
  padding: 0 12px 0 0;
  height: 100%;
  font-family: OpenSans-Semibold;
  font-size: 13px;
  cursor: pointer;
  border: 0;
  color: var(--green);
  background-color: var(--white);
}

.icon-add {
    padding: 0 8px;
}
</style>
