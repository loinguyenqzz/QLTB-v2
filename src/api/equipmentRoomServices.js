import axiosClient from "./axiosClient";

const ROOT_URL = "equipmentRooms";

const equipmentRoomServices = {
    getAll: () => {
        return axiosClient.get(ROOT_URL);
    }
};

export default equipmentRoomServices