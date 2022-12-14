import { onBeforeUnmount, onMounted } from "vue";

/**
 * Xử lý click nằm ngoài 1 component
 * @param {ref} component Thành phần muốn click bên ngoài nó
 * @param {function} callback Hành động sau khi click outside
 */
const useClickOutSide = (component, callback) => {
  if (!component) return;
  const listener = (event) => {
    if (
      event.target !== component.value &&
      event.composedPath().includes(component.value)
    ) {
      return;
    }
    if (typeof callback === "function") {
      callback();
    }
  };
  onMounted(() => {
    window.addEventListener("click", listener);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("click", listener);
  });

  return { listener };
}

export default useClickOutSide