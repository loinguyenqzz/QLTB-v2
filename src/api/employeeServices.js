import axiosClient from "./axiosClient";

const ROOT_URL = "employees";

const employeeServices = {
  getByFilter: (params) => {
    const url = `${ROOT_URL}/filter`;
    return axiosClient.get(url, { params });
  },
  getMaxCode: () => {
    const url = `${ROOT_URL}/maxCode`;
    return axiosClient.get(url);
  },
  getAll: () => {
    const url = ROOT_URL;
    return axiosClient.get(url);
  },
  getById: (employeeId) => {
    const url = ROOT_URL + "/" + employeeId;
    return axiosClient.get(url);
  },
  insert: (employee) => {
    const url = ROOT_URL;
    return axiosClient.post(url, employee);
  },
  update: (employee) => {
    const url = ROOT_URL + "/" + employee.employeeId;
    return axiosClient.put(url, employee);
  },
  delele: (employeeId) => {
    const url = ROOT_URL + "/" + employeeId;
    return axiosClient.delete(url);
  },
};

export default employeeServices;
