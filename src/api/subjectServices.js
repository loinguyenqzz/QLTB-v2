import axiosClient from "./axiosClient";

const ROOT_URL = "subject";

const subjectServices = {
    getAll: () => {
        return axiosClient.get(ROOT_URL);
    }
};

export default subjectServices