const { teaching_service_model } = require("../models");
const { base_repository } = require("./base_repository");
const { no_content, not_found, bad_request } = require("../libs/error");

class teaching_service_repository extends base_repository {
    constructor(payload) {
      super(payload);
    }
  
    async add_teaching_service(payload) {
      const response = await this.create(payload);
      return response;
    }
   
    async update_teaching_service(service_id, payload) {
      const criteria = { service_id, deleted_at: null };
      const update = { $set: {} };
      if (payload?.title) update.$set.title = payload?.title;
      if (payload?.description) update.$set.description = payload?.description;
      if (payload?.category) update.$set.category = payload?.category;
      if (payload?.subcategory) update.$set.subcategory = payload?.subcategory;
      if (payload?.price) update.$set.price = payload?.price;
      if (payload?.duration) update.$set.duration= payload?.duration;
      if (payload?.availability) update.$set.availability = payload?.availability;
      if (payload?.location) update.$set.location= payload?.location;
      if (payload?.images) update.$set.images= payload?.images;
      if (payload?.contact_details) update.$set.contact_details= payload?.contact_details;
      if (payload?.videos) update.$set.images= payload?.videos;
      const response = await this.update_one(criteria, update, {
        new: true,
        runValidators: true,
      });
      console.log(update, response)
      return response;
    }
  
    async delete_teaching_service(service_id) {
        const criteria = {service_id, deleted_at: null };
        const update = { deleted_at: new Date() };
        const options = { new: true };
        const response = await this.update_one(criteria, update, options);
        return response;
      }
    
    }
  module.exports = {
    teaching_service_repository: new teaching_service_repository({ model: teaching_service_model }),
  };
