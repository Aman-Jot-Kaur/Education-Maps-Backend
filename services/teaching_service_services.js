const { teaching_service_repository } = require("../repositories/teaching_service_repository");
const { no_content, not_found, bad_request } = require("../libs/error");
const { error_handler } = require("../libs/utils");

exports.add_teaching_service = async (payload) => {
  const {
    user_id, title, description, category, subcategory, price, duration, availability,contact_details,location
  } = payload.data;
  const teaching_service = { user_id, title, description, category, subcategory, price, duration, availability,contact_details,location };
  const response = await teaching_service_repository.add_teaching_service(teaching_service);
  return response;
};

exports.update_teaching_service= async (payload) => {
    const {service_id } = payload?.params || {};
    const response = await teaching_service_repository.update_teaching_service(service_id, payload.data);
    if (!response) throw new not_found("teaching_service not found");
    return response;
  }

  exports.delete_teaching_service= async (payload) => {
    const {service_id } = payload?.params || {};
    const teaching_service = await teaching_service_repository.delete_teaching_service(service_id);
    if (!teaching_service) throw new not_found("teaching_service not found");
    return { message: "teaching_service deleted successfully" };
  }