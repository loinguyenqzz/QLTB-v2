<template>
  <div class="base-input-search">
    <input class="base-input-search__input" type="text" />
    <img
      class="base-input-search__icon"
      src="../../assets/Icons/Ic_seerch.png"
      alt=""
    />
  </div>
</template>
<script></script>
<style scope>
.base-input-search {
  height: 32px;
  width: 300px;
  position: relative;
  display: flex;
}

.base-input-search__input {
  border: 1px solid var(--border-color);
  border-radius: 4px;
  height: 100%;
  width: 100%;
  outline: 0;
  padding: 0 36px 0 12px;
}

.base-input-search__input:focus {
  border: 1px solid var(--green);
}

.base-input-search__icon {
  margin: 4px 0;
  padding: 0 4px;
  position: absolute;
  right: 0;
  border-left: 2px solid var(--line-grid-panel);
}
</style>
