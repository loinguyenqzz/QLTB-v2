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
            :is-require="true"
          />
          <FormGroupInput
            label="Họ và tên"
            v-model="employee.employeeName"
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
            @input="handleChangeSelect"
          />
          <ContextMenu label="QL theo môn" :options="subject" />
          <ContextMenu
            label="QL kho, phòng"
            width="100%"
            :options="equipmentRoom"
          />
          <div class="work-infor">
            <BaseCheckbox label="Trình độ nghiệp vụ QLTB" />
            <BaseCheckbox
              label="Đang làm việc"
              @onChange="handleCheckWorking"
            />
            <BaseInputDate
              :style="{ visibility: isWorking ? 'hidden' : 'visible' }"
              label="Ngày nghỉ việc"
            />
          </div>
        </form>
      </div>
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
import { onUpdated, reactive, ref } from "vue";

const props = defineProps({
  titleModal: {
    type: String,
    default: "",
  },
});

const department = [
  {
    id: "department-1",
    name: "Tổ Toán - Tin",
  },
  {
    id: "department-2",
    name: "Tổ Hóa - Sinh",
  },
  {
    id: "department-3",
    name: "Tổ Lý",
  },
  {
    id: "department-4",
    name: "Tổ Anh - Văn",
  },
  {
    id: "department-5",
    name: "Tổ Lý",
  },
];

const subject = [
  {
    id: "subject-1",
    name: "Toán",
  },
  {
    id: "subject-2",
    name: "Hóa",
  },
  {
    id: "subject-3",
    name: "Lý",
  },
  {
    id: "subject-4",
    name: "Anh",
  },
  {
    id: "subject-5",
    name: "Văn",
  },
  {
    id: "subject-6",
    name: "Sinh",
  },
];

const equipmentRoom = [
  {
    id: "equipmentRoom-1",
    name: "Kho thiết bị chung",
  },
  {
    id: "equipmentRoom-2",
    name: "Phòng hóa - sinh",
  },
  {
    id: "equipmentRoom-3",
    name: "Phòng tin học",
  },
  {
    id: "equipmentRoom-3",
    name: "Phòng tin học",
  },
];

const isWorking = ref(false);
const employee = reactive({
  employeeCode: "",
  employeeName: "",
  phoneNumber: "",
  department: "",
  subjectApply: "",
  equipmentRoomAplly: "",
  isTraned: false,
  isWorking: false,
});

const handleChangeSelect = (option) => {
  console.log(option);
};
const handleCheckWorking = (checkbox) => {
  isWorking.value = checkbox.isCheck;
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
