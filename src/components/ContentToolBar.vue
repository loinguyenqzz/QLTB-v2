<template>
  <div class="toolbar">
    <BaseInputSearch v-model="inputSearch" />
    <div class="toolbar__right">
      <BaseButton style-button="style1" @click="isShowModalForm = true"
        >Thêm</BaseButton
      >
      <a href="http://localhost:5038/api/Employees/export">
        <BaseButton style-button="style2">Xuất khẩu</BaseButton>
      </a>
      <BaseButton
        style-button="style4 relative"
        tabindex="0"
        @click="isShowMoreAction = !isShowMoreAction"
        @blur="isShowMoreAction = false"
      >
        <img src="../assets/Icons/ic_More.png" alt="" />
        <div
          v-if="isShowMoreAction"
          class="multi-delete shadow"
          @click="isShowModalConfirm = true"
        >
          <img src="../assets/Icons/ic_delete.png" alt="" />
          <span>Xóa</span>
        </div>
      </BaseButton>
      <ModalForm
        v-if="isShowModalForm"
        width="850"
        :title-modal="resources.MODAL_TITLE_INSERT"
        :data="employee"
        @close="isShowModalForm = !isShowModalForm"
        @closeByBtn="isShowModalForm = !isShowModalForm"
        @submit="handleSubmit"
      />
      <ModalReAuth
        v-show="isShowModalConfirm"
        title-modal="Thông báo"
        :message="resources.MESSAGE_CONFIRM_MUTIPLE_DELETE"
        width="350"
        @close="isShowModalConfirm = false"
        @submit="handleConfirm"
      />
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { inject, onBeforeMount, onMounted, ref, watch } from "vue";
import employeeServices from "../api/employeeServices";
import BaseInputSearch from "../components/common/BaseInputSearch.vue";
import BaseButton from "./common/BaseButton.vue";
import ModalForm from "./ModalForm.vue";
import ModalReAuth from "./ModalReAuth.vue";
import useDebounce from "../hooks/useDebounce.js";
import resources from '../utils/resources.js'
import enums from '../utils/enums'
import handleErrorResponse from '../hooks/handleErrorResponse'

const emits = defineEmits(["changeData", "DeleteGridItem", "search"]);

const isShowModalForm = ref(false);
const isShowModalConfirm = ref(false);
const isShowMoreAction = ref(false);
const inputSearch = ref("");
const inputDebounce = useDebounce(inputSearch, 700);
const {setToast} = inject("toast")
const employee = ref({
  employeeId: "",
  employeeCode: "",
  employeeName: "",
  phoneNumber: "",
  department: null,
  subjectApply: [],
  equipmentRoomApply: [],
  isTrained: false,
  dayOff: null,
});

watch(inputDebounce, () => {
  emits("search", inputDebounce.value);
});

/**
 * Xử lý reset lại modal
 * Created By LOINQ (10/11/2022)
 */
watch(isShowModalForm, () => {
  employee.value = {
    employeeId: "",
    employeeCode: "",
    employeeName: "",
    phoneNumber: "",
    department: null,
    subjectApply: [],
    equipmentRoomApply: [],
    isTrained: false,
    dayOff: null,
  };
});

/**
 * Xử lý gửi dữ liệu lên server để thêm mới nhân viên
 * Created By LOINQ (10/11/2022)
 */
const handleSubmit = async (employee) => {
  delete employee.employeeId;
  try {
    const result = await employeeServices.insert(employee)
   setToast("success",resources.MESSAGE_SUCCESS_INSERT);
    emits("changeData");
    isShowModalForm.value = false;
  } catch (error) {
     const { errorCode } = error.response.data;
    if (errorCode == enums.ERROR_CODE.DUPLICATE) {
      setToast("error", resources.MESSAGE_DUPLICATE_EMPLOYEE_CODE);
    } else {
      setToast("error", handleErrorResponse(error));
    }
  }
};
/**
 * Xử lý sự kiện sau khi người dùng click đồng ý vào modal confirm
 * Created By LOINQ (20/11/2022)
 */
const handleConfirm = () => {
  emits("DeleteGridItem");
  isShowModalConfirm.value = false;
};
</script>
<style scoped>
.toolbar {
  height: 64px;
  width: 100%;
  padding: 16px 0;
  display: flex;
}

.toolbar__right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.multi-delete {
  width: 120px;
  position: absolute;
  top: 40px;
  right: 0;
  background-color: white;
  border-radius: 4px;
  padding: 12px;
  display: flex;
  align-items: center;
  z-index: 3;
}

.multi-delete:hover {
  background-color: var(--hover-grid-line);
}

.multi-delete > span {
  padding-left: 12px;
}
</style>
