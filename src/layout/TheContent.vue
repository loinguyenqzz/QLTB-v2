<template>
  <div class="content">
    <ContentToolBar />
    <ContentTable :headers="headers" :items="items" />
    <ContentFooter />
  </div>
</template>

<script setup>
import ContentToolBar from "../components/ContentToolBar.vue";
import ContentTable from "../components/ContentTable.vue";
import ContentFooter from "../components/ContentFooter.vue";

const headers = [
  {
    text: "Số hiệu cán bộ",
    width : 100
  },
  {
    text: "Họ và tên",
    width : 200
  },
  {
    text: "Số điện thoại",
    width : 100
  },
  {
    text: "Tổ chuyên môn",
    width : 130
  },
  {
    text: "QL theo môn",
    width : 130
  },
  {
    text: "QL kho phòng",
    width : 130
  },
  {
    text: "Đào tạo QLTB",
    width : 100
  },
  {
    text: "Đang làm việc",
    width : 100
  },
];
let id = 0
const items = new Array(30).fill({}).map(() => ({
    employeeId: ++id,
    employeeCode: `SHCB${id}`,
    employeeName: "Nguyễn Quang Lợi",
    phoneNumber: "012301144",
    department : "Toán",
    subjectApply: "Toán - tin",
    equipmentRoomAplly: "Phòng tin học",
    isTraned: true,
    isWorking: false
  }))
</script>

<style scope>
.content {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 48px);
  padding: 0 16px;
}
</style>
