<template>
  <div class="input-group">
    <label
      for=""
      :title="props.tooltip"
      class="label"
      :style="{ 'min-width': props.labelWidth + 'px'}"
    >
      {{ props.label }}
      <span v-if="isRequire" style="color: red">*</span>
    </label>
    <input
      type="text"
      class="base-input"
      :class="{ 'base-input-error': errorMessage }"
      ref="inputRef"
      :value="modelValue"
      @blur="handleValidate"
      @input="handleChange"
      @focus="errorMessage = ''"
    />
    <div v-if="errorMessage" class="error-message">
      <div class="triangle"></div>
      <span>{{ errorMessage }}</span>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, toRef, watch } from "vue";
import validate from "../hooks/useValidate";

/**
 * @label: Nội dung bên trong thẻ label nhận từ bên ngoài
 * @roles: Các role của việc validate dữ liệu
 * @modelValue: Custom v-model
 * @focus: Xác định input này có focus vào hay không
 */
const props = defineProps({
  label: String,
  labelWidth: {
    type: Number,
    default: 110,
  },
  roles: {
    type: Array,
    default: [],
  },
  modelValue: {
    type: String,
    default: null,
  },
  focus: {
    type: Number,
    default: -99999,
  },
  tooltip: {
    type: String,
    default: ""
  }
});

const emits = defineEmits(["update:modelValue", "validate"]);

const isRequire = props.roles.includes("isRequire");
const inputRef = ref(null);
const inputValue = ref(props.modelValue);
const errorMessage = ref("");

onMounted(() => {
  if (props.focus > -1) {
    inputRef.value.focus();
  }
});

watch(toRef(props, 'focus'), (value) => {
  if (value > 0 ) {
    inputRef.value.focus();
  }
})

watch(toRef(props, "modelValue"), (value) => {
  inputValue.value = value;
});

/**
 * Validate theo các roles được truyền vào
 * Created by LOINQ (10/11/2022)
 */
const handleValidate = () => {
  props.roles.forEach((role) => {
    errorMessage.value = validate[role](inputValue.value);
  });
  emits("validate", !errorMessage.value);
};

/**
 * Truyền đi giá trị của input để kích hoạt v-model
 * Created by LOINQ (10/11/2022)
 */
const handleChange = (e) => {
  emits("update:modelValue", e.target.value);
};
</script>
<style scoped>
.base-input {
  flex: 1;
  height: 32px;
  padding: 0 12px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  outline: none;
}

.base-input-error {
  border: 1px solid var(--red) !important;
}

.base-input:focus {
  border: 1px solid var(--green);
}

.input-group {
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  width: 300px;
  position: relative;
}

.triangle {
  height: 10px;
  width: 10px;
  background-color: #ff8484;
  transform: rotate(45deg);
  position: absolute;
  top: calc(50% - 5px);
  left: -5px;
  z-index: -1;
}

.error-message {
  display: none;
  min-width: max-content;
  height: 28px;
  background-color: #ff8484;
  color: white;
  align-items: center;
  padding: 0 5px;
  position: absolute;
  border-radius: 4px;
  top: 0;
  left: calc(100% + 5px);
  z-index: 2;
}

.input-group:hover .error-message {
  display: flex !important;
}
</style>
