const { institute_model } = require("../models");
const { base_repository } = require("./base_repository");
const { no_content, not_found, bad_request } = require("../libs/error");

class institute_repository extends base_repository {
    constructor(payload) {
      super(payload);
    }
  
    async add_institute(payload) {
      const response = await this.create(payload);
      return response;
    }
   
    async update_institute(institute_id, payload) {
      const criteria = { institute_id, deleted_at: null };
      const update = { $set: {} };
      if (payload?.name) update.$set.name = payload?.name;
      if (payload?.description) update.$set.description = payload?.description;
      if (payload?.programs_offered) update.$set.programs_offered = payload?.programs_offered;
      if (payload?.accreditation) update.$set.accreditation = payload?.accreditation;
      if (payload?.contact_details) update.$set.contact_details = payload?.contact_details;
      if (payload?.website) update.$set.website= payload?.website;
      if (payload?.location) update.$set.location= payload?.location;
      const response = await this.update_one(criteria, update, {
        new: true,
        runValidators: true,
      });
      return response;
    }
  
    async delete_institute(institute_id) {
        const criteria = { institute_id, deleted_at: null };
        const update = { deleted_at: new Date() };
        const options = { new: true };
        const response = await this.update_one(criteria, update, options);
        return response;
      }
    
    }
  module.exports = {
    institute_repository: new institute_repository({ model: institute_model }),
  };

