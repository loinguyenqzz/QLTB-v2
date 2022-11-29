/**
 * Lớp tài nguyên các text hiển thị trên UI
 * @author LOINQ (10/11/2022)
 */
const resources = {
  /**
   * Tiêu đề form thêm mỡi cán bộ giáo viên
   * @author LOINQ (10/11/2022)
   */
  MODAL_TITLE_INSERT: "Thêm hồ sơ Cán bộ, giáo viên",
  /**
   * Tiêu đề form sửa cán bộ giáo viên
   * @author LOINQ (10/11/2022)
   */
  MODAL_TITLE_UPDATE: "Sửa hồ sơ Cán bộ, giáo viên",
  /**
   * Thông báo xác nhân khi xóa nhiều bản ghi
   * @author LOINQ (10/11/2022)
   */
  MESSAGE_CONFIRM_MUTIPLE_DELETE:
    "Bạn có chắc chắn muốn xóa những Cán bộ giáo viên đang chọn không?",
    /**
   * Thông báo xác nhân khi xóa 1 bản ghi
   * @author LOINQ (10/11/2022)
   */
  MESSAGE_CONFIRM_SINGLE_DELETE:
    "Bạn có chắc chắn muốn xóa Cán bộ giáo viên đang chọn không?",
    /**
   * Thông báo khi thêm mới thành công
   * @author LOINQ (10/11/2022)
   */
  MESSAGE_SUCCESS_INSERT: "Đã thêm thành công cán bộ giáo viên",
  /**
   * Thông báo khi sửa thông tin thành công
   * @author LOINQ (10/11/2022)
   */
  MESSAGE_SUCCESS_UPDATE: "Đã sửa thành công cán bộ giáo viên",
  /**
   * Thông báo khi trùng mã cán bộ giáo viên
   * @author LOINQ (10/11/2022)
   */
  MESSAGE_DUPLICATE_EMPLOYEE_CODE: "Mã số cán bộ, giáo viên đã tồn tại",
    /**
   * Thông báo khi status code = 0
   * @author LOINQ (10/11/2022)
   */
  MESSAGE_STATUS_0: "Máy chủ hiện không phản hồi vui lòng quay lại sau",
    /**
   * Thông báo khi status code = 400
   * @author LOINQ (10/11/2022)
   */
  MESSAGE_STATUS_400: "Yêu cầu không hợp lệ vui lòng thử lại",
    /**
   * Thông báo khi status code = 404
   * @author LOINQ (10/11/2022)
   */
  MESSAGE_STATUS_404: "Yêu cầu không tồn tại vui lòng thử lại",
    /**
   * Thông báo khi status code = 500
   * @author LOINQ (10/11/2022)
   */
  MESSAGE_STATUS_500: "Đã có lỗi xảy ra vui lòng tải lại trang",
      /**
   * Thông báo lỗi khi gặp lỗi k định nghĩa được
   * @author LOINQ (10/11/2022)
   */
  MESSAGE_ERROR_DEFAULT: "Có lỗi xẳy ra vui lòng liên hệ MISA",
};

export default Object.freeze(resources);
