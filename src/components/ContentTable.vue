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
              :style="{ width: item.width + 'px' }"
            >
              {{ item.text }}
            </th>
            <th style="width: 80px"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="item.id">
            <td class="column-checkbox">
              <BaseCheckbox
                :id="`record-checkbox-${index}`"
                :isCheck="item.isCheck"
              />
            </td>
            <td>{{ item.employeeCode }}</td>
            <td>{{ item.employeeName }}</td>
            <td>{{ item.phoneNumber }}</td>
            <td>{{ item.department }}</td>
            <td class="ellipsis">{{ item.subjectList }}</td>
            <td class="ellipsis">{{ item.equipmentRoomList }}</td>
            <td>
              <img
                v-if="item.isTraned"
                src="../assets/Icons/ic_Check.png"
                alt=""
              />
            </td>
            <td>
              <img
                v-if="item.isWorking"
                src="../assets/Icons/ic_Check.png"
                alt=""
              />
            </td>
            <td class="column-activity">
              <img
                class="record__btn--edit"
                src="../assets/Icons/ic_Edit.png"
                alt=""
              />
              <img
                class="record__btn--delete"
                src="../assets/Icons/ic_Remove.png"
                alt=""
                @click="handleClickBtnDelete(item.id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ModalReAuth
      v-show="isModalActive"
      title-modal="Thông báo"
      message="Bạn có chắc chắn muốn xóa cán bộ giáo viên đang chọn không ?"
      width="350"
      :re-auth-id="reAuthId"
      @close="closeModal"
      @submit="handleDelete"
    />
    <Toastify :isOpen="isOpenToastify" message="Đã xóa thành công 1 bản ghi" />
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, toRef, watch } from "vue";
import BaseCheckbox from "./common/BaseCheckbox.vue";
import ModalReAuth from "./ModalReAuth.vue";
import Toastify from "./Toastify.vue";

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

const emits = defineEmits(["changeData"]);

const checkList = [];
const data = ref([]);
const isModalActive = ref(false);
const reAuthId = ref("");
const isOpenToastify = ref(false);

onMounted(async () => {
  data.value = props.items.map((item) => ({
    ...item,
    isCheck: false,
    subjectList: item.subjectApply.map((element) => element.name).toString(),
    equipmentRoomList: item.equipmentRoomAplly
      .map((element) => element.name)
      .toString(),
  }));
})

watch(toRef(props, "items"), () => {
  data.value = props.items.map((item) => ({
    ...item,
    isCheck: false,
    subjectList: item.subjectApply.map((element) => element.name).toString(),
    equipmentRoomList: item.equipmentRoomAplly
      .map((element) => element.name)
      .toString(),
  }));
});

const closeModal = () => {
  isModalActive.value = !isModalActive.value;
};

const handleSelectAll = (state) => {
  data.value.forEach((element) => (element.isCheck = state.isCheck));
};

const handleDelete = async (id) => {
  isModalActive.value = false;
  try {
    await fetch(`http://localhost:3000/employee/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    isOpenToastify.value = true;
    setTimeout(() => {
      isOpenToastify.value = false;
    }, 3000);
    emits("changeData");
  } catch (error) {
    console.error("Error:", error);
  }
};

const handleClickBtnDelete = (id) => {
  isModalActive.value = true;
  reAuthId.value = id;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
