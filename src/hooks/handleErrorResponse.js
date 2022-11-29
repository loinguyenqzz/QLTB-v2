import resources from "../utils/resources";

/**
 * Hàm xử lý lỗi khi gọi api
 * @param {object} error Lỗi khi bắt try catch
 * @return chuỗi thông báo lỗi cho người dùng
 * @author LOINQ (20/11/2022)
 */
const handleErrorResponse = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 0:
        return resources.MESSAGE_STATUS_0;
      case 400:
        return resources.MESSAGE_STATUS_400;
      case 404:
        return resources.MESSAGE_STATUS_404;
      case 500:
        return resources.MESSAGE_STATUS_500;
      default:
        return resources.MESSAGE_ERROR_DEFAULT;
    }
  } else if (error.request) {
    return resources.MESSAGE_ERROR_DEFAULT;
  } else {
    console.log(error);
    return resources.MESSAGE_ERROR_DEFAULT;
  }
};

export default handleErrorResponse;
