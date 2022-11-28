<template>
  <Modal>
    <template #extra>
      <div class="modal__inner--extra">
        <img src="../assets/Images/default_avatar.png" alt="" />
        <div class="btn-chose-file">Chọn ảnh</div>
        <span style="font-size: 14px">{{
          employee.fullName || "Họ và tên"
        }}</span>
        <span style="font-size: 12px">{{
          employee.employeeCode || "Số hiệu cán bộ"
        }}</span>
      </div>
    </template>

    <template #default>
      <div class="modal__inner--main">
        <div class="modal__title">{{ props.titleModal }}</div>
        <form action="" class="modal__form">
          <FormGroupInput
            label="Số hiệu cán bộ"
            v-model="employee.employeeCode"
            :focus="focusInput"
            :roles="['isRequire']"
            @validate="(isValidate) => (submitable = isValidate)"
          />
          <FormGroupInput
            label="Họ và tên"
            v-model="employee.fullName"
            :label-width="90"
            :roles="['isRequire']"
            @validate="(isValidate) => (submitable = isValidate)"
          />
          <FormGroupInput
            label="Số điện thoại"
            v-model="employee.phoneNumber"
            :roles="['phoneNumber']"
            @validate="(isValidate) => (submitable = isValidate)"
          />
          <FormGroupInput
            label="Email"
            v-model="employee.email"
            :labelWidth="90"
            :roles="['email']"
            @validate="(isValidate) => (submitable = isValidate)"
          />
          <BaseSelect
            label="Tổ bộ môn"
            :default="employee.department?.departmentName"
            :options="departmentOptions"
            @input="handleGetValueDepartment"
          />
          <ContextMenu
            label="QL theo môn"
            :label-width="90"
            tooltip="Quản lý theo môn"
            :default="defaultSubjectOptions"
            :options="subjectOptions"
            @change="handleGetValueSubjectApply"
          />
          <ContextMenu
            label="QL kho, phòng"
            width="100%"
            tooltip="Quản lý kho, phòng"
            :default="defaultEquipmentRoomOptions"
            :options="equipmentRoomOptions"
            @change="handleGetEquipmentRoomApply"
          />
          <div class="work-infor">
            <BaseCheckbox
              :isCheck="employee.isTrained"
              label="Trình độ nghiệp vụ QLTB"
              tooltip="Trình độ nghiệp vụ quản lý thiết bị"
              @onChange="(state) => (employee.isTrained = state.isCheck)"
            />
            <BaseCheckbox
              :isCheck="isWorking"
              label="Đang làm việc"
              @onChange="handleChangeIsWorking"
            />
            <BaseInputDate
              :style="{ visibility: !isWorking ? 'visible' : 'hidden' }"
              v-model="employee.dayOff"
              label="Ngày nghỉ việc"
            />
          </div>
        </form>
      </div>
    </template>
    <template #submit>
      <BaseButton @click="handleSubmit" @keyup.tab="focusInput++"
        >Lưu</BaseButton
      >
      <Toastify ref="toastifyRef" />
    </template>
  </Modal>
</template>
<script setup>
import Modal from "./Modal.vue";
import FormGroupInput from "./FormGroupInput.vue";
import BaseSelect from "./common/BaseSelect.vue";
import ContextMenu from "./ContextMenu.vue";
import BaseCheckbox from "./common/BaseCheckbox.vue";
import BaseInputDate from "./common/BaseInputDate.vue";
import BaseButton from "./common/BaseButton.vue";
import Toastify from "./Toastify.vue";
import { department, equipmentRoom, subject } from "../utils/entities";
import {
  computed,
  onMounted,
  reactive,
  readonly,
  ref,
  toRef,
  watch,
} from "vue";
import employeeServices from "../api/employeeServices";

const props = defineProps({
  titleModal: {
    type: String,
    default: "",
  },
  data: {
    type: Object,
    default: {
      employeeId: "",
      employeeCode: "",
      employeeName: "",
      phoneNumber: "",
      department: null,
      subjectApply: [],
      equipmentRoomApply: [],
      isTrained: false,
      dayOff: null,
    },
  },
});

const emits = defineEmits(["submit"]);

const focusInput = ref(0)
const inputEmployeeCode = ref(null);
const employee = ref({ ...props.data });
const submitable = ref(false);
const toastifyRef = ref(null);
const isWorking = ref(!employee.value.dayOff);

onMounted(() => {
  if (!employee.value.employeeCode) {
    getMaxCode();
  }
});

/**
 * Lấy mã số cán bộ lớn nhất
 * @author LOINQ - 20/11/2022
 */
const getMaxCode = async () => {
  const response = await employeeServices.getMaxCode();
  employee.value.employeeCode = "SHCB" + (response.data + 1);
};
/**
 * Convert sang đối tượng có thuộc tính đồng nhất
 */
const defaultEquipmentRoomOptions = computed(() => {
  return employee.value.equipmentRoomApply?.map((item) => ({
    id: item.equipmentRoomId,
    name: item.equipmentRoomName,
  }));
});
const defaultSubjectOptions = computed(() => {
  return employee.value.subjectApply?.map((item) => ({
    id: item.subjectId,
    name: item.subjectName,
  }));
});
/**
 * Convert sang đối tượng có thuộc tính đồng nhất
 */
const departmentOptions = department.map((item) => ({
  id: item.departmentId,
  name: item.departmentName,
}));

const subjectOptions = subject.map((item) => ({
  id: item.subjectId,
  name: item.subjectName,
}));

const equipmentRoomOptions = equipmentRoom.map((item) => ({
  id: item.equipmentRoomId,
  name: item.equipmentRoomName,
}));

/**
 * Xử lý sự kiện khi người dùng ấn submit
 */
const handleSubmit = () => {
  if (!isWorking.value && !employee.value.dayOff) {
    toastifyRef.value.error("Bạn phải chọn ngày nghỉ việc");
  } else if (!employee.value.fullName) {
    toastifyRef.value.error("Bạn phải nhập tên Cán bộ");
  } else if (!employee.value.employeeCode) {
    toastifyRef.value.error("Bạn phải nhập số hiệu cán bộ");
  } else {
    if (submitable.value) {
      emits("submit", employee.value);
    } else {
      toastifyRef.value.error("Bạn phải nhập các trường đúng định dạng");
    }
  }
};

/**
 * Lấy từ liệu từ context menu mapping vào subject apply
 * @Created by LOINQ (20/11/2022)
 */
const handleGetValueSubjectApply = (selected) => {
  employee.value.subjectApply = selected.map((item) => ({
    subjectId: item.id,
    subjectName: item.name,
  }));
};

/**
 * Lấy từ liệu từ context menu mapping vào equipment room apply
 * @Created by LOINQ (20/11/2022)
 */
const handleGetEquipmentRoomApply = (selected) => {
  employee.value.equipmentRoomApply = selected.map((item) => ({
    equipmentRoomId: item.id,
    equipmentRoomName: item.name,
  }));
};

/**
 * Lấy từ liệu từ select mapping vào department
 * @Created by LOINQ (20/11/2022)
 */
const handleGetValueDepartment = (selected) => {
  employee.value.department = {
    departmentId: selected.id,
    departmentName: selected.name,
  };
};

/**
 * Xử lý khi người dùng click vào checkbox đang làm việc
 * @Created by LOINQ (20/11/2022)
 */
const handleChangeIsWorking = (state) => {
  isWorking.value = state.isCheck;
  employee.value.dayOff = null;
};

const handleValidate = (isValidate) => {};
</script>

<style scoped>
.modal__inner--extra {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  padding: 16px 28px;
}

.modal__inner--main {
  position: relative;
  flex-grow: 1;
  padding: 12px 16px 80px 16px;
}

.modal__inner--main::before {
  content: "";
  background-color: #e0e0e0;
  position: absolute;
  width: 1.5px;
  height: 90%;
  left: 0;
  top: 10px;
}

.modal__form {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
}

.modal__inner--extra > span {
  text-align: center;
}

.modal__title {
  font-size: 16px;
  margin-bottom: 20px;
}

.btn-chose-file {
  height: 30px;
  background-color: var(--green);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  margin-bottom: 12px;
}

.work-infor {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 32px;
}
</style>
