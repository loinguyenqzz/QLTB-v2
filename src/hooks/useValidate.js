import { ref } from "vue";

/**
 * Lớp chứa các kiểu validate dữ liệu 
 */
const validate = {
    isRequire: function (value) {
        return value?.trim(" ") ? "" : "Trường này không được để trống"
    },
    email: function (value) {
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return !value || value.match(mailFormat) ? "" : "Email không đúng định dạng"
    },
    phoneNumber: (value) => {
        const phoneNumberFormat = /^[0-9]*$/
        return value.match(phoneNumberFormat) ? "" : "Số điện thoại phải là những chữ số"
    }
}

export default validate