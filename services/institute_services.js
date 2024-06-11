const { institute_repository } = require("../repositories/institute_repository");
const { no_content, not_found, bad_request } = require("../libs/error");
const { error_handler } = require("../libs/utils");

const { institute_model } = require("../models");

exports.add_institute = async (payload) => {
  const {
    name,description,location,programs_offered,accreditation,contact_details,website,rating,owner_id
  } = payload.data;
  const institute = { name,description,location,programs_offered,accreditation,contact_details,website,rating,owner_id };
  const response = await institute_repository.add_institute(institute);
  return response;
};

exports.update_institute= async (payload) => {
    const {institute_id } = payload?.params || {};
    const response = await institute_repository.update_institute(institute_id, payload.data);
    if (!response) throw new not_found("institute not found");
    return response;
  }

  exports.delete_institute= async (payload) => {
    const {institute_id } = payload?.params || {};
    const institute = await institute_repository.delete_institute(institute_id);
    if (!institute) throw new not_found("institute not found");
    return { message: "institute deleted successfully" };
  }