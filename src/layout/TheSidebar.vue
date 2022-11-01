<template>
  <div class="sidebar" :class="{'sidebar-mini' : isSidebarMini}">
    <div class="sidebar-header">
      <img
        class="sidebar-header__logo"
        src="../assets/Icons/ic_IconThietBi.svg"
        alt=""
        v-show="!isSidebarMini"
      />
      <span class="sidebar-header__title" v-show="!isSidebarMini">Thiết bị</span>
      <img
        class="btn-navigation"
        src="../assets/Icons/ic_navigation.svg"
        alt=""
        @click="isSidebarMini = !isSidebarMini"
      />
    </div>
    <div class="sidebar-menu">
      <div
        class="sidebar-item"
        v-for="(item, index) in sidebarItems"
        :key="index"
        @click="sidebarItemActive = index"
        :class="{'sidebar-item--active' : sidebarItemActive == index}"
      >
        <img :src="item.icon" alt="" />
        <span v-show="!isSidebarMini">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const sidebarItemActive = ref(4)
const isSidebarMini = ref(false)
const sidebarItems = [
  {
    icon: "../src/assets/Icons/ic_TongQuan.svg",
    name: "Tổng quan",
  },
  {
    icon: "../src/assets/Icons/ic_ThietBi.svg",
    name: "Thiết bị",
  },
  {
    icon: "../src/assets/Icons/ic_MuonTra.svg",
    name: "Mượn trả",
  },
  {
    icon: "../src/assets/Icons/ic_BaoCao.svg",
    name: "Báo cáo",
  },
  {
    icon: "../src/assets/Icons/ic_HeThong.svg",
    name: "Hệ thống",
  },
];

</script>

<style scoped>
.sidebar {
  height: 100vh;
  width: 220px;
  background-color: var(--background-sidebar);
  transition: width 0.3s ease;
  flex-shrink: 0;
}

.sidebar-mini {
  width: 55px;
}

.sidebar-header {
  height: 48px;
  padding: 8px 12px;
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
}

.sidebar-header__title {
  flex: 1;
  margin: 0;
  font-size: 14px;
}

.sidebar-header__logo {
  height: 32px;
  width: 32px;
  margin-right: 8px;
}

.btn-navigation {
  height: 16px;
  width: 16px;
  cursor: pointer;
}

.sidebar-item {
  padding: 0 12px;
  margin-bottom: 6px;
  height: 40px;
  display: flex;
  align-items: center;
  color: white;
  cursor: pointer;
}

.sidebar-item--active {
  color: var(--green);
  position: relative;
  background-color: #404f64;
}

.sidebar-item--active::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 3px;
  background-color: var(--green);
}

.sidebar-item > img {
  margin-right: 8px;
}
</style>
