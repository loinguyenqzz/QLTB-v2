import {ref, watch } from "vue";

/**
 * Xử lý delay khi người dùng search
 * @param {String} input: Dữ liệu từ input
 * @param {Number} delay: Thời gian delay để thay đổi dữ liệu
 * @return Dữ liệu sau 1 thời gian delay
 */
export default function useDebounce(input, delay) {
    const debounce = ref(null)
    let handler = null
    watch(input, (value) => {
        clearTimeout(handler)
        handler = setTimeout(() => {
            debounce.value = value
            console.log(value);
        }, delay)
    })
    return debounce
};
