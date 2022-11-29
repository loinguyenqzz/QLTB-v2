<template>
  <ModalForm
    v-if="isModalActive"
    width="850"
    title-modal="Thêm hồ sơ Cán bộ, giáo viên"
    @close="isModalActive = false"
    @submit="handleSubmit"
  />
  <Loading v-if="isLoading" />
  <div v-if="totalPages > 0 || params.keyword" class="content">
    <ContentToolBar
      @changeData="getEmployeeByFilter"
      @DeleteGridItem="handleDeleteMutiple"
      @search="(value) => (params.keyword = value)"
    />
    <ContentTable
      :headers="headers"
      :items="employees"
      @changeData="getEmployeeByFilter"
      @selectedGrid="(value) => (checkedList = value)"
    />
    <ContentFooter
      :totalPages="totalPages"
      :totalRecords="totalRecords"
      :pageSize="params.pageSize"
      :pageNumber="params.pageNumber"
      @changePageNumber="(value) => (params.pageNumber = value)"
    />
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
</template>

<script setup>
import ContentToolBar from "../components/ContentToolBar.vue";
import ContentTable from "../components/ContentTable.vue";
import ContentFooter from "../components/ContentFooter.vue";
import BaseButton from "../components/common/BaseButton.vue";
import ModalForm from "../components/ModalForm.vue";
import Loading from "../components/Loading.vue";
import { inject, onMounted, ref, watch } from "vue";
import employeeServices from "../api/employeeServices";
import handleErrorResponse from "../hooks/handleErrorResponse";

const headers = [
  {
    text: "Số hiệu cán bộ",
    width: 120,
  },
  {
    text: "Họ và tên",
    width: 200,
  },
  {
    text: "Số điện thoại",
    width: 110,
  },
  {
    text: "Tổ chuyên môn",
    width: 130,
  },
  {
    text: "QL theo môn",
    width: 100,
    tooltip: "Quản lý theo môn",
  },
  {
    text: "QL kho phòng",
    width: 130,
    tooltip: "Quản lý kho phòng",
  },
  {
    text: "Đào tạo QLTB",
    width: 120,
    tooltip: "Đào tạo quản lý thiết bị",
  },
  {
    text: "Đang làm việc",
    width: 120,
  },
];
const isModalActive = ref(false);
const isLoading = ref(false);
const employees = ref([]);
const totalRecords = ref(0);
const totalPages = ref(0);
const checkedList = ref([]);

const { setToast } = inject("toast");

const params = ref({
  pageSize: 20,
  pageNumber: 1,
  keyword: "",
});

/**
 * Call api lấy dữ liệu nhân viên khi comonent được mount
 * Created by LOINQ - (20//11/2022)
 */
onMounted(() => {
  getEmployeeByFilter();
});

/**
 * Call api mõi khi search
 * Created by LOINQ - (20//11/2022)
 */
watch(
  () => params.value.keyword,
  () => {
    params.value.pageNumber = 1;
    getEmployeeByFilter();
  }
);

/**
 * Call api mõi khi chuyển page
 * Created by LOINQ - (20//11/2022)
 */
watch(
  () => params.value.pageNumber,
  () => getEmployeeByFilter()
);

/**
 * Call api lấy dữ liệu có phân trang hiển thị ra grid
 * @author LOINQ(10/11/2022)
 */
const getEmployeeByFilter = async () => {
  try {
    isLoading.value = true;
    const response = await employeeServices.getByFilter(params.value);
    const results = response.data;
    totalPages.value = results.totalPages;
    if (params.value.pageNumber > totalPages.value) {
      params.value.pageNumber = totalPages.value;
      getEmployeeByFilter();
    }
    employees.value = results.data;
    totalRecords.value = results.totalRecords;
    isLoading.value = false;
  } catch (error) {
    const message = handleErrorResponse(error);
    setToast("error", message);
    isLoading.value = false;
  }
};

/**
 * Xử lý gửi dữ liệu lên server khi người dùng submit form
 * @async
 * @param: employee: dữ liệu thông tin nhân viên
 * @author LOINQ(11/11/2022)
 */
const handleSubmit = async (employee) => {
  isModalActive.value = false;
  try {
  } catch (error) {
    setToast("error", handleErrorResponse(error));
  }
};

/**
 * Xử lý xóa nhiều bản ghi
 * @author LOINQ(16/11/2022)
 */
const handleDeleteMutiple = async () => {
  if (checkedList.value.length == 0) {
    setToast("warning", "Bạn chưa chọn bản ghi nào");
  } else {
    try {
      await employeeServices.multipleDelete({
        employeeIds: checkedList.value.toString(),
      });
      getEmployeeByFilter();
      setToast(
        "success",
        `Đã xóa thành công ${checkedList.value.length} bản ghi`
      );
    } catch (error) {
      const message = handleErrorResponse(error);
      setToast("error", message);
    }
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
