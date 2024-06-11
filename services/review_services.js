const { review_repository } = require("../repositories/review_repository");
const { no_content, not_found, bad_request } = require("../libs/error");
const { error_handler } = require("../libs/utils");

const { review_model } = require("../models");
// review_id ** (Primary Key)
// user_id ** (Foreign Key to User)
// service_id (Foreign Key to TeachingService)
// institute_id(foreign key to institute service)
// rating **
// comment
// date **
exports.add_review = async (payload) => {
  const {
    user_id,service_id,institute_id,rating,comment,date
  } = payload.data;
  const review = { user_id,service_id,institute_id,rating,comment,date };
  const response = await review_repository.add_review(review);
  return response;
};

exports.get_review= async (payload) => {
    const {service_id,hotel_id } = payload?.query || {};
    const reviews = await review_repository.get_review(service_id);
    if (!reviews) throw new not_found("review not found");
    return reviews
  }
 
