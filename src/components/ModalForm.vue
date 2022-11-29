<template>
  <Modal :customClose="true">
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
            id="code"
            label="Số hiệu cán bộ"
            v-model="employee.employeeCode"
            :focus="isFocusEmployeeCode"
            :roles="['isRequire']"
            @validate="handleCheckSubmitAble"
          />
          <FormGroupInput
            id="name"
            label="Họ và tên"
            v-model="employee.fullName"
            :focus="isFocusFullName"
            :label-width="90"
            :roles="['isRequire']"
            @validate="handleCheckSubmitAble"
          />
          <FormGroupInput
            id="phoneNumber"
            label="Số điện thoại"
            v-model="employee.phoneNumber"
            :roles="['phoneNumber']"
            @validate="handleCheckSubmitAble"
          />
          <FormGroupInput
            id="email"
            label="Email"
            v-model="employee.email"
            :labelWidth="90"
            :roles="['email']"
            @validate="handleCheckSubmitAble"
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
      <BaseButton styleButton="style2" @click="handleClose">Đóng</BaseButton>
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
import { department, equipmentRoom, subject } from "../utils/entities";
import {
  computed,
  inject,
  onMounted,
  reactive,
  readonly,
  ref,
  toRef,
  watch,
} from "vue";
import employeeServices from "../api/employeeServices";
import resources from "../utils/resources";

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
  type: {
    type: String,
  },
});

const emits = defineEmits(["submit", "closeByBtn"]);

const isFocusEmployeeCode = ref(null);
const isFocusFullName = ref(null);
const employee = ref({ ...props.data });
const submitable = ref([]);
const isWorking = ref(!employee.value.dayOff);
const { setToast } = inject("toast");
const isChangeEmloyeeData = ref(false);
const { isSaveData, setShowModalConfirm } = inject("modalConfirmSubmit");

onMounted(() => {
  if (!employee.value.employeeCode) {
    getMaxCode();
  }
  isFocusEmployeeCode.value = true;
});

watch(employee.value, () => (isChangeEmloyeeData.value = true));

watch(isSaveData, (value) => {
  if(value === true) {
    setShowModalConfirm(false)
    handleSubmit()
  } else if(value === false) {
    emits("closeByBtn")
    setShowModalConfirm(false)
  }
})
/**
 * Xử lý đóng form
 * @author LOINQ - 20/11/2022
 */
const handleClose = () => {
  if(isChangeEmloyeeData.value) {
    setShowModalConfirm(true);
  } else {
    emits("closeByBtn")
  }
};

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
 * Created by LOINQ (20/11/2022)
 */
const handleSubmit = () => {
  if (!employee.value.fullName) {
    isFocusFullName.value = true;
    setToast("error", "Họ và tên không được để trống");
  } else {
    if (submitable.value.length == 0) {
      emits("submit", employee.value);
    } else {
      setToast("error", resources.MESSAGE_INVALID_DATA);
      console.log(submitable.value);
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

/**
 * Kiểm tra xem form có thể submit hay không
 * @param {object} validate: Gồm id và trạng thái validate của input
 */
const handleCheckSubmitAble = (validate) => {
  if (!validate.isValidate && !submitable.value.includes(validate.id)) {
    submitable.value.push(validate.id);
  } else if (validate.isValidate) {
    submitable.value = submitable.value.filter(
      (element) => element != validate.id
    );
  }
};
</script>

<style scoped>
.modal__inner--extra {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 190px;
  height: 100%;
  padding: 16px 24px;
}

.modal__inner--main {
  position: relative;
  flex-grow: 1;
  padding: 12px 24px 80px 24px;
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
