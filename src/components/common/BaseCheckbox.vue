<template>
  <div
    class="base-checkbox"
    :aria-checked="isActive"
    role="checkbox"
    @click.stop="handleChangeState"
    @keyup.enter="handleChangeState"
  >
    <span class="base-checkbox__input" tabindex="0">
      <img v-if="isActive" src="../../assets/Icons/ic_Checkbox_Active.png" />
      <img v-else src="../../assets/Icons/ic_Checkbox_Inactive.png" />
    </span>
    <label :title="props.tooltip" style="margin-left: 12px;">{{ props.label }}</label>
  </div>
</template>
<script setup>
import { ref, toRef, watch } from "vue";

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  tooltip: {
    type: String,
    default: ""
  },
  id: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isCheck : {
    type : Boolean,
    default: false
  }
});
const emit = defineEmits({
  onChange: {
    type: "change",
    default: () => {},
  },
});

const isActive = ref(props.isCheck)

watch(toRef(props, 'isCheck'), (isCheck) => {
  isActive.value = isCheck
})

watch(isActive, () => {
  emit("onChange", {
    id: props.id,
    isCheck: isActive.value
  });
})

const handleChangeState = () => {
  isActive.value = !isActive.value;
};

</script>
<style>
.base-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.base-checkbox[aria-checked = false] .base-checkbox__input:hover {
    content: url("../../assets/Icons/ic_Checkbox_Hover.png");
} 

.base-checkbox__input {
  height: 24px;
  width: 24px;
  visibility: visible;
}

</style>
