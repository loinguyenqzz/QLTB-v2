<template>
  <div v-if="data.length > 0" class="content">
    <ContentToolBar @changeData="getAll" />
    <ContentTable :headers="headers" :items="data" @changeData="getAll" />
    <ContentFooter />
  </div>
  <div v-else class="content--non-data">
    <img src="../assets/Icons/ic_Alert.png" alt="" />
    <span style="font-size: 16px">Chưa có giáo viên</span>
    <span
      >Vui lòng chọn Thêm mới từng giáo viên hoặc Nhập khẩu để lấy danh sách
      hiện có tại trường.</span
    >
    <div class="btn-wrap">
      <BaseButton @click="isModalActive = true">Thêm mới</BaseButton>
      <BaseButton>Nhập khẩu</BaseButton>
    </div>
  </div>
      <ModalForm
      v-if="isModalActive"
      width="850"
      title-modal="Thêm hồ sơ Cán bộ, giáo viên"
      @close="closeModal"
      @submit="handleSubmit"
    />
</template>

<script setup>
import ContentToolBar from "../components/ContentToolBar.vue";
import ContentTable from "../components/ContentTable.vue";
import ContentFooter from "../components/ContentFooter.vue";
import BaseButton from "../components/common/BaseButton.vue";
import ModalForm from "../components/ModalForm.vue";
import useData from '../hooks/useData'
import { ref, watch } from "vue";

const {data, getAll} = useData()

const isModalActive = ref(false);
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
getAll()

watch(data, () => getAll())

const closeModal = () => {
  isModalActive.value = false;
};

const handleSubmit = async (employee) => {
  isModalActive.value = false;
  try {
    await fetch("http://localhost:3000/employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });
    emits("changeData");
  } catch (error) {
    console.error("Error:", error);
  }
};
</script>

<style scope>
.content {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 48px);
  padding: 0 16px;
}

.content--non-data {
  height: calc(100vh - 48px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content--non-data > * ~ * {
  margin-top: 16px;
}

.content--non-data > img {
  height: 130px;
  margin-bottom: 16px;
}

.btn-wrap {
  display: flex;
}
</style>
