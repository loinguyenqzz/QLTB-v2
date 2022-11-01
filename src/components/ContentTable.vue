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

            >
              {{ item.text }}
            </th>
            <th style="width: 80px"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td class="column-checkbox">
              <BaseCheckbox
                :id="`record-checkbox-${index}`"
                :isCheck="data.isCheck"
              />
            </td>
            <td>{{ item.employeeCode }}</td>
            <td>{{ item.employeeName }}</td>
            <td>{{ item.phoneNumber }}</td>
            <td>{{ item.department }}</td>
            <td>{{ item.subjectApply }}</td>
            <td>{{ item.ManagementByDepartment }}</td>
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
                @click="handleDelete(index)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import BaseCheckbox from "./common/BaseCheckbox.vue";

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

const checkList = [];
const data = reactive(
  props.items.map((item) => ({
    ...item,
    isCheck: false,
  }))
);

const handleSelectAll = (state) => {
  data.forEach((element) => (data.isCheck = state.isCheck));
};

const handleDelete = (index) => {
  data.splice(index, 1);
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
</style>
