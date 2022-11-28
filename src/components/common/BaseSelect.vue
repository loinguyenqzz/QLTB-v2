<template>
  <div class="base-select">
    <label for="" class="label" style="min-width: 110px">{{ props.label }}</label>
    <div
      class="selected"
      :tabindex="props.tabindex"
      @click.self="isOpen = !isOpen"
      @blur="isOpen = false"
    >
      {{ selected }}
      <img
        src="../../assets/Icons/icon_down-arrow-small.svg"
        alt=""
        @click.self="isOpen = !isOpen"
      />
      <div class="items" v-show="isOpen">
        <div
          v-for="(option, index) in props.options"
          :key="index"
          class="option"
          @click="handleClick(option)"
        >
          {{ option.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
const props = defineProps({
  options: Array,
  label: String,
  default: {
    type: String,
    default: "",
  },
  tabindex: {
    type: Number,
    default: 0,
  }
});

const emit = defineEmits(["input"]);
const selected = ref(props.default);
const isOpen = ref(false);

const handleClick = (option) => {
  selected.value = option.name;
  emit("input", option);
  isOpen.value = false;
};

</script>
<style scoped>
.base-select {
  display: flex;
  align-items: center;
  position: relative;
  width: 300px;
  justify-content: space-between;
  margin-bottom: 12px;
}

.selected {
  position: relative;
  height: 32px;
  border: 1px solid #cecece;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex: 1;
}

.selected:focus {
  outline: 0;
  border: 1px solid var(--green);
}

.selected > img {
  top: 10px;
  right: 10px;
  position: absolute;
}

.items {
  position: absolute;
  right: 0;
  top: 40px;
  width: 100%;
  padding: 8.5px 0;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 0 10px var(--shadow-color);
  z-index: 2;
}

.items > .option {
  line-height: 28px;
  padding-left: 16px;
  height: 28px;
  cursor: pointer;
  width: 100%;
}

.items > .option:hover {
  background-color: var(--hover-grid-line);
}
</style>
