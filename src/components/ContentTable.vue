<template>
  <div class="outer">
    <div class="content-table-wrapper">
      <table>
        <thead>
          <tr>
            <th class="column-checkbox">
              <BaseCheckbox id="select-all" @onChange="handleSelectAll" />
            </th>
            <th
              v-for="(item, index) in props.headers"
              :key="index"
              :title="item.tooltip"
              :style="{ width: item.width + 'px' }"
            >
              {{ item.text }}
            </th>
            <th style="width: 75px"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in data"
            style="cursor: pointer"
            :key="item.employeeId"
            @dblclick="handleClickBtnEdit(item)"
          >
            <td class="column-checkbox">
              <BaseCheckbox
                :id="item.employeeId"
                :isCheck="item.isCheck"
                @onChange="handleSelectItemChecked"
              />
            </td>
            <td>{{ item.employeeCode }}</td>
            <td style="color: #03ae66">{{ item.fullName }}</td>
            <td>{{ item.phoneNumber }}</td>
            <td>{{ item.department?.departmentName }}</td>
            <td class="ellipsis">{{ item.subjectList }}</td>
            <td class="ellipsis">{{ item.equipmentRoomList }}</td>
            <td style="text-align: center">
              <img
                v-if="item.isTrained"
                src="../assets/Icons/ic_Check.png"
                alt=""
              />
            </td>
            <td style="text-align: center">
              <img
                v-if="!item.dayOff"
                src="../assets/Icons/ic_Check.png"
                alt=""
              />
            </td>
            <td class="column-activity">
              <img
                class="record__btn--edit"
                src="../assets/Icons/ic_Edit.png"
                alt=""
                @click="handleClickBtnEdit(item)"
              />
              <img
                class="record__btn--delete"
                src="../assets/Icons/ic_Remove.png"
                alt=""
                @click="handleClickBtnDelete(item.employeeId)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ModalReAuth
      v-show="isModalActive"
      title-modal="Th??ng b??o"
      :message="resources.MESSAGE_CONFIRM_DELETE"
      width="350"
      :re-auth-id="reAuthId"
      @close="closeModal"
      @submit="handleDelete"
    />
    <ModalForm
      v-if="isModalFormActive"
      width="850"
      title-modal="S???a h??? s?? C??n b???, gi??o vi??n"
      :data="defaultData"
      @close="isModalFormActive = false"
      @closeByBtn="isModalFormActive = false"
      @submit="handleEditEmployee"
    />
  </div>
</template>
<script setup>
import { inject, onMounted, reactive, ref, toRef, watch } from "vue";
import BaseCheckbox from "./common/BaseCheckbox.vue";
import ModalReAuth from "./ModalReAuth.vue";
import ModalForm from "./ModalForm.vue";
import employeeServices from "../api/employeeServices";
import axios from "axios";
import resources from "../utils/resources";
import enums from "../utils/enums";
import handleErrorResponse from '../hooks/handleErrorResponse'

const props = defineProps({
  headers: {
    type: Array,
    default: [],
  },
  items: {
    type: Array,
    default: [],
  },
});

const emits = defineEmits(["changeData", "selectedGrid"]);

const checkedList = ref([]);
const data = ref([]);
const defaultData = ref({});
const isModalFormActive = ref(false);
const isModalActive = ref(false);
const reAuthId = ref("");
const { setToast } = inject("toast");

onMounted(() => {
  convertData();
});

watch(toRef(props, "items"), () => {
  convertData();
  checkedList.value = [];
});

/**
 * Copy d??? li???u ra bi???n m???i v?? th??m v??o c??c tr?????ng kh??c
 * isCheck - Ki???m tra xem b???n ghi c?? ???????c ch???n hay kh??ng
 * equipmentRoomList - Chuy???n ?????i equipmentRoomApply sang String ????? thu???n ti???n render
 * subjectList - Chuy???n ?????i subjectApply sang String ????? thu???n ti???n render
 * @author LOINQ(10/11/2022)
 */
const convertData = () => {
  data.value = props.items.map((item) => ({
    ...item,
    isCheck: false,
    subjectList: item.subjectApply
      .map((element) => element.subjectName)
      .toString(),
    equipmentRoomList: item.equipmentRoomApply
      .map((element) => element.equipmentRoomName)
      .toString(),
  }));
};

/**
 * X??? l?? ????ng modal
 * @author LOINQ(10/11/2022)
 */
const closeModal = () => {
  isModalActive.value = !isModalActive.value;
};

/**
 * X??? l?? t??ch ch???n nhi???u
 * @param state - Tr???ng th??i c???a checkbox select all
 * @author LOINQ(10/11/2022)
 */
const handleSelectAll = (state) => {
  data.value.forEach((element) => (element.isCheck = state.isCheck));
};

/**
 * X??? l?? x??a b???n ghi
 * @async
 * @param id - Id c???a nh??n vi??n c???n x??a
 * @author LOINQ(10/11/2022)
 */
const handleDelete = async (id) => {
  isModalActive.value = false;
  try {
    const result = await employeeServices.delele(id);
    setToast("success", `???? x??a th??nh c??ng ${result.data} b???n ghi`);
    emits("changeData");
  } catch (error) {
    setToast("error", handleErrorResponse(error));
  }
};

/**
 * X??? l?? s??? ki???n khi ng?????i d??ng click v??o icon ch???nh s???a
 * @param employee - ?????i t?????ng nh??n vi??n
 * @author LOINQ(10/11/2022)
 */
const handleEditEmployee = async (employee) => {
  try {
    const result = await employeeServices.update(employee);
    emits("changeData");
    setToast("success", resources.MESSAGE_SUCCESS_UPDATE);
    isModalFormActive.value = false;
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
 * X??? l?? s??? ki???n khi ng?????i d??ng click v??o icon x??a
 * @param id: id c???a nh??n vi??n
 * @author LOINQ(10/11/2022)
 */
const handleClickBtnDelete = (id) => {
  isModalActive.value = true;
  reAuthId.value = id;
};

/**
 * X??? l?? s??? ki???n khi ng?????i d??ng click v??o icon ch???nh s???a
 * @param employee: ?????i t?????ng nh??n vi??n
 * @author LOINQ(10/11/2022)
 */
const handleClickBtnEdit = (item) => {
  defaultData.value = item;
  isModalFormActive.value = true;
};

/**
 * X??? l?? s??? ki???n khi ng?????i d??ng t??ch ch???n c??c row tr??n grid
 * @param selected: tr???ng th??i c???a d??ng ???????c t??ch ch???n
 * @author LOINQ(10/11/2022)
 */
const handleSelectItemChecked = (selected) => {
  if (selected.isCheck) {
    checkedList.value.push(selected.id);
  } else {
    checkedList.value = checkedList.value.filter(
      (element) => element != selected.id
    );
  }
  emits("selectedGrid", checkedList.value);
};
</script>
<style scope>
.outer {
  width: 100%;
  flex: 1;
  overflow: auto;
}
.content-table-wrapper {
  height: 100%;
  width: 100%;
  min-width: max-content;
  overflow-y: auto;
  border: 1px solid white;
  position: relative;
}
.content-table-wrapper > table {
  width: 100%;
  border-collapse: collapse;
}

.content-table-wrapper th {
  background-color: var(--header-grid-panel);
  padding: 0 8px;
  font-weight: normal;
  font-size: 14px;
  position: sticky;
  top: 0;
  z-index: 2;
}

.content-table-wrapper tr {
  height: 40px;
}

.content-table-wrapper tbody tr:hover {
  background-color: var(--hover-grid-line);
}

.content-table-wrapper td + td,
.content-table-wrapper th + th {
  border-left: 1px solid var(--line-grid-panel);
}

.content-table-wrapper tbody tr {
  border-top: 1px solid var(--line-grid-panel);
}

.content-table-wrapper tbody td {
  padding: 0 8px;
}

.column-checkbox {
  width: 50px;
  position: relative;
}

.column-checkbox > * {
  position: absolute;
  top: calc(50% - 12px);
  left: calc(50% - 12px);
}

.column-activity > img {
  cursor: pointer;
  float: left;
  height: 28px;
  width: 28px;
  border-radius: 50%;
  padding: 2px;
}

.record__btn--edit:hover {
  background-color: #e0e0e0;
}

.record__btn--delete:hover {
  background-color: #e0e0e0;
  content: url("../assets/Icons/ic_Remove_Hover.png");
}

.ellipsis {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
