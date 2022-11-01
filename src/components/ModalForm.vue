<template>
  <Modal>
    <template #extra>
      <div class="modal__inner--extra">
        <img src="../assets/Images/default_avatar.png" alt="" />
        <div class="btn-chose-file">Chọn ảnh</div>
        <span style="font-size: 14px">{{
          employee.employeeName || "Họ và tên"
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
            :error-message="errorMessageEmployeeCode"
            :focus="true"
            :is-require="true"
          />
          <FormGroupInput
            label="Họ và tên"
            v-model="employee.employeeName"
            :error-message="errorMessageEmployeeName"
            :is-require="true"
          />
          <FormGroupInput
            label="Số điện thoại"
            v-model="employee.phoneNumber"
          />
          <FormGroupInput label="Email" v-model="employee.email" />
          <BaseSelect
            label="Tổ bộ môn"
            :options="department"
            @input="(option) => (employee.department = option.name)"
          />
          <ContextMenu
            label="QL theo môn"
            :options="subject"
            @change="(selected) => (employee.subjectApply = selected)"
          />
          <ContextMenu
            label="QL kho, phòng"
            width="100%"
            :options="equipmentRoom"
            @change="(selected) => (employee.equipmentRoomAplly = selected)"
          />
          <div class="work-infor">
            <BaseCheckbox
              label="Trình độ nghiệp vụ QLTB"
              @onChange="(state) => (employee.isTraned = state.isCheck)"
            />
            <BaseCheckbox
              label="Đang làm việc"
              @onChange="(state) => (employee.isWorking = state.isCheck)"
            />
            <BaseInputDate
              :style="{ visibility: employee.isWorking ? 'hidden' : 'visible' }"
              label="Ngày nghỉ việc"
            />
          </div>
        </form>
      </div>
    </template>
    <template #submit>
      <BaseButton @click="handleSubmit">Lưu</BaseButton>
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
import { computed, onMounted, reactive, ref, toRef, watch } from "vue";
import useData from "../hooks/useData";

const { data, getAll, getMaxEmployeeCode, checkDuplicate } = useData();
getAll();

const props = defineProps({
  titleModal: {
    type: String,
    default: "",
  },
  data: {
    type: Object,
    default: {
      employeeCode: "",
      employeeName: "",
      phoneNumber: "",
      department: "",
      subjectApply: [],
      equipmentRoomAplly: [],
      isTraned: false,
      isWorking: false,
    },
  },
});

const emits = defineEmits(["submit"]);

const inputEmployeeCode = ref(null);
const errorMessageEmployeeCode = ref("");
const errorMessageEmployeeName = ref("");

const department = [
  {
    id: "d-1",
    name: "Tổ Toán - Tin",
  },
  {
    id: "d-2",
    name: "Tổ Hóa - Sinh",
  },
  {
    id: "d-3",
    name: "Tổ Lý",
  },
  {
    id: "d-4",
    name: "Tổ Anh - Văn",
  },
  {
    id: "d-5",
    name: "Tổ Lý",
  },
];

const subject = [
  {
    id: "s-1",
    name: "Toán",
  },
  {
    id: "s-2",
    name: "Hóa",
  },
  {
    id: "s-3",
    name: "Lý",
  },
  {
    id: "s-4",
    name: "Anh",
  },
  {
    id: "s-5",
    name: "Văn",
  },
  {
    id: "s-6",
    name: "Sinh",
  },
];

const equipmentRoom = [
  {
    id: "e-1",
    name: "Kho thiết bị chung",
  },
  {
    id: "e-2",
    name: "Phòng hóa - sinh",
  },
  {
    id: "e-3",
    name: "Phòng tin học",
  },
  {
    id: "e-3",
    name: "Phòng tin học",
  },
];

const employee = reactive({
  employeeCode: "",
  employeeName: "",
  phoneNumber: "",
  department: "",
  subjectApply: [],
  equipmentRoomAplly: [],
  isTraned: false,
  isWorking: false,
});

watch(data, () => {
  employee.employeeCode = `SHCB${getMaxEmployeeCode() + 1}`;
});

watch(toRef(employee, "employeeCode"), () => {
  if (!employee.employeeCode) {
    errorMessageEmployeeCode.value = "Trường này không được để trống";
  } else {
    if (checkDuplicate(employee.employeeCode)) {
      errorMessageEmployeeCode.value = "Số hiệu cán bộ đã tồn tại";
    } else {
      errorMessageEmployeeCode.value = "";
    }
  }
});

watch(toRef(employee, "employeeName"), () => {
  errorMessageEmployeeName.value = !employee.employeeName
    ? "Trường này không được để trống"
    : "";
});

const handleSubmit = () => {
  if (!employee.employeeName) {
    errorMessageEmployeeName.value = "Trường này không được để trống";
  } else if (
    !errorMessageEmployeeCode.value &&
    !errorMessageEmployeeName.value
  ) {
    emits("submit", employee);
  } else {
  }
};
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
