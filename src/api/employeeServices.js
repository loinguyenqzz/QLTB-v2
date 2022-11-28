import axiosClient from "./axiosClient";

const ROOT_URL = "employees";

/**
 * Lớp chứa các api về nhân viên
 * @author LOINQ (10/11/2022)
 */
const employeeServices = {
  /**
   * Xóa nhiều bản ghi
   * @author LOINQ (10/11/2022)
   */
  multipleDelete: (employeeIds) => {
    const url = `${ROOT_URL}/delete-request`;
    return axiosClient.post(url, employeeIds);
  },
  /**
   * Lấy dữ liệu nhân viên có thể tìm kiếm và phân trang
   * @param {object} params Tham số truyền vào query {pageSize,pageNumber,keyword}
   * @author LOINQ (10/11/2022)
   */
  getByFilter: (params) => {
    const url = `${ROOT_URL}/filter`;
    return axiosClient.get(url, { params });
  },
  /**
   * Lấy mã nhân viên lớn nhất
   * @author LOINQ (10/11/2022)
   */
  getMaxCode: () => {
    const url = `${ROOT_URL}/max-code`;
    return axiosClient.get(url);
  },
  /**
   * Lấy danh sách tất cả nhân viên
   * @author LOINQ (10/11/2022)
   */
  getAll: () => {
    const url = ROOT_URL;
    return axiosClient.get(url);
  },
  /**
   *Lấy dữ liệu nhân viên theo id
   * @param {string} employeeId id của nhân viên muốn lấy dữ liệu
   * @author LOINQ (10/11/2022)
   */
  getById: (employeeId) => {
    const url = ROOT_URL + "/" + employeeId;
    return axiosClient.get(url);
  },
  /**
   * Thêm mới nhân viên
   * @param {object} employee Đối tượng nhân viên muốn thêm mới
   * @author LOINQ (10/11/2022)
   */
  insert: (employee) => {
    const url = ROOT_URL;
    return axiosClient.post(url, employee);
  },
  /**
   * Sửa dữ liệu nhân viên
   * @param {object} employee id của nhân viên muốn sửa
   * @author LOINQ (10/11/2022)
   */
  update: (employee) => {
    const url = ROOT_URL + "/" + employee.employeeId;
    return axiosClient.put(url, employee);
  },
  /**
   * Xóa nhân viên theo id
   * @param {string} employeeId id của nhân viên muốn xóa
   * @author LOINQ (10/11/2022)
   */
  delele: (employeeId) => {
    const url = ROOT_URL + "/" + employeeId;
    return axiosClient.delete(url);
  },
};

export default employeeServices;
