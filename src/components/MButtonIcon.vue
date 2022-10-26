<script setup></script>

<template>
  <div class="m-button-icon">
    <button class="btn">
      <slot></slot>
    </button>
    <img src="../assets/Icons/ic_show.png" alt="" class="btn-icon" />
  </div>
</template>

<style>
.m-button-icon {
  margin-top: 10px;
  height: 32px;
  display: flex;
}

.btn {
  padding: 0 12px;
  margin: 0 0 0 8px;
  height: 100%;
  min-width: 96px;
  font-family: OpenSans-Semibold;
  font-size: 13px;
  cursor: pointer;
  background-color: var(--green);
  border: 0;
  color: var(--white);
  border-radius: 4px 0 0 4px;
}

.btn-icon {
  padding: 0 3px;
  height: 100%;
  background-color: #05a25e;
  border-radius: 0 4px 4px 0;
}

</style>
