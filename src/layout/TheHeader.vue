<template>
  <div class="header">
    <div class="header-left">
      <span class="sub-title">Cán bộ, giáo viên</span>
      <img src="../assets/Icons/ic_help.svg" alt="" />
    </div>
    <div class="header-right">
      <div class="notification">
        <img
          class="ic-notification"
          src="../assets/Icons/ic_Notification_32.png"
          alt=""
        />
        <div class="new-notification"></div>
      </div>
      <span>Admin</span>
      <img src="../assets/Icons/icon_down-arrow-small.svg" alt="" />
      <img class="ic_avatar" src="../assets/Icons/ic_Avatar_36.png" alt="" />
    </div>
  </div>
</template>
<script setup>
</script>

<style scope>
.header {
  padding: 0 16px;
  width: 100%;
  height: 48px;
  box-shadow: 5px 0px 10px var(--shadow-color);
  display: flex;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-left > img {
  height: 20px;
  width: 20px;
  margin-left: 8px;
}

.header-right {
  display: flex;
  align-items: center;
}

.header-right > span {
  border-left: 2px solid var(--header-grid-panel);
  padding-left: 16px;
  line-height: 32px;
}

.header-right > * ~ * {
  margin-left: 16px;
}

.notification {
  position: relative;
}

.new-notification {
  position: absolute;
  top: 10%;
  right: 5%;
  border-radius: 50%;
  height: 12px;
  width: 12px;
  background-color: var(--red);
  border: 2px solid white;
}

.ic-notification {
  height: 32px;
  width: 32px;
}

.ic_avatar {
  height: 40px;
  width: 40px;
}
</style>
