import axiosClient from "./axiosClient";

const ROOT_URL = "departments";

const departmentServices = {
    getAll: () => {
        return axiosClient.get(ROOT_URL);
    }
};

export default departmentServices