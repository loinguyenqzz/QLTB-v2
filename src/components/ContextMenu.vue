<template>
  <div class="context-menu" ref="contextMenuRef" :style="{ width: props.width }">
    <label
      for=""
      class="label"
      :title="props.tooltip"
      :style="{ 'min-width': props.labelWidth + 'px' }"
      >{{ props.label }}</label
    >
    <div
      class="tag-wrapper"
      :tabindex="props.tabindex"
      @click.self="isOpen = !isOpen"
    >
      <div class="tag-picked" v-for="tag in tagPicked" :key="tag.id">
        {{ tag.name }}
        <img
          src="../assets/Icons/ic_x.svg"
          alt=""
          @click="handleRemoveTag(tag)"
        />
      </div>
      <img
        src="../assets/Icons/icon_down-arrow-small.svg"
        alt=""
        @click.self="isOpen = !isOpen"
      />
      <div class="option-wrapper" v-show="isOpen">
        <div class="select-all">
          <BaseCheckbox
            label="Tất cả"
            :isCheck="false"
            @onChange="handleSelectAll"
          />
        </div>
        <div class="option-list">
          <div class="option" v-for="(option, i) in options" :key="i">
            <BaseCheckbox
              :id="option.id"
              :label="option.name"
              :isCheck="option.isCheck"
              @onChange="handleChangeCheckbox"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onUpdated, reactive, ref } from "vue";
import BaseCheckbox from "./common/BaseCheckbox.vue";
import useClickOutSide from '../hooks/useClickOutSide.js'

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  tabindex: {
    type: Number,
    default: 0,
  },
  labelWidth: {
    type: Number,
    default: 110,
  },
  width: {
    type: String,
    default: "300px",
  },
  options: {
    type: Array,
    default: [],
  },
  default: {
    type: Array,
    default: [],
  },
  tooltip: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["change"]);

const contextMenuRef = ref(null)
const tagPicked = ref(props.default);
const isOpen = ref(false);

const options = reactive(
  props.options.map((option) => ({
    ...option,
    isCheck: !!props.default.find((item) => item.id == option.id),
  }))
);

useClickOutSide(contextMenuRef, () => isOpen.value = false)

/**
 * Xử lý chọn tất cả
 * @param checkbox: Trạng thái của ô checkbox
 * @author LOINQ (04/11/2022)
 */
const handleSelectAll = (checkbox) => {
  options.forEach((option) => (option.isCheck = checkbox.isCheck));
  emits("change", tagPicked.value);
};

/**
 * Xử lý xóa 1 tag
 * @param tag: Đối tượng tag đang được chọn
 * @author LOINQ (04/11/2022)
 */
const handleRemoveTag = (tag) => {
  tagPicked.value = tagPicked.value.filter((element) => element.id !== tag.id);
  const index = options.findIndex((option) => option.id === tag.id);
  options[index].isCheck = false;
  emits("change", tagPicked.value);
};

/**
 * Xử lý sự kiện khi checkbox thay đổi
 * @param checkbox: Trạng thái của ô checkbox
 * @author LOINQ (04/11/2022)
 */
const handleChangeCheckbox = (checkbox) => {
  if (checkbox.isCheck) {
    const option = options.find((option) => option.id === checkbox.id);
    option.isCheck = true;
    tagPicked.value.push(option);
  } else {
    tagPicked.value = tagPicked.value.filter(
      (element) => element.id !== checkbox.id
    );
  }
  emits("change", tagPicked.value);
};
</script>
<style scoped>
.context-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.tag-wrapper {
  border-radius: 4px;
  border: 1px solid var(--border-color);
  padding: 0 28px 0 4px;
  position: relative;
  min-height: 32px;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
}

.tag-wrapper:focus {
  outline: 0;
  border: 1px solid var(--green);
}

.tag-wrapper > img {
  top: 10px;
  right: 10px;
  position: absolute;
}

.tag-picked {
  background-color: #e0e0e0;
  height: 24px;
  border-radius: 4px;
  margin: 3px;
  padding-left: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tag-picked > img {
  margin: 0 8px 0 12px;
  color: white;
  height: 11px;
  width: 11px;
  cursor: pointer;
}

.tag-picked > img:hover {
  content: url("../assets/Icons/ic_x_hover.svg");
}

.option-wrapper {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 0 10px var(--shadow-color);
  z-index: 2;
}

.select-all {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  padding: 14px 16px 4px 16px;
}

.option-list {
  overflow: auto;
  max-height: 100px;
  padding: 4px 0 4px 0;
  margin-bottom: 10px;
}

.option {
  display: flex;
  align-items: center;
  padding: 0px 16px;
  height: 28px;
}

.option:hover {
  background-color: var(--hover-grid-line);
}

.option-list::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
</style>
