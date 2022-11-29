/**
 *  Lớp định nghĩa các số đại diện
 * @author LOINQ (10/11/2022)
 */
const enums = {
  ERROR_CODE: {
    /**
     * Lỗi server gặp exception
     * @author LOINQ (10/11/2022)
     */
    EXCEPTION: 1,
    /**
     * Lỗi trùng mã số cán bộ
     * @author LOINQ (10/11/2022)
     */
    DUPLICATE: 2,
    /**
     * Lỗi dữ liệu gửi lên không hợp lên
     * @author LOINQ (10/11/2022)
     */
    INVALID_DATA: 3,
  },
};

export default Object.freeze(enums);
