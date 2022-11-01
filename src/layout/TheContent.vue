<template>
  <div class="content">
    <ContentToolBar @changeData="getData" />
    <ContentTable :headers="headers" :items="data" @changeData="getData" />
    <ContentFooter />
  </div>
</template>

<script setup>
import ContentToolBar from "../components/ContentToolBar.vue";
import ContentTable from "../components/ContentTable.vue";
import ContentFooter from "../components/ContentFooter.vue";
import { ref } from "vue";

const data = ref([]);
const headers = [
  {
    text: "Số hiệu cán bộ",
    width: 100,
  },
  {
    text: "Họ và tên",
    width: 200,
  },
  {
    text: "Số điện thoại",
    width: 100,
  },
  {
    text: "Tổ chuyên môn",
    width: 130,
  },
  {
    text: "QL theo môn",
    width: 130,
  },
  {
    text: "QL kho phòng",
    width: 130,
  },
  {
    text: "Đào tạo QLTB",
    width: 100,
  },
  {
    text: "Đang làm việc",
    width: 100,
  },
];

const getData = async () => {
  try {
    const response = await fetch("http://localhost:3000/employee");
    data.value = await response.json();
    console.log(data.value);
  } catch (error) {
    console.log(error); 
  }
};
getData();
</script>

<style scope>
.content {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 48px);
  padding: 0 16px;
}
</style>
