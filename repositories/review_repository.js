const { review_model } = require("../models");
const { base_repository } = require("./base_repository");
class review_repository extends base_repository {
  constructor(payload) {
    super(payload);
  }

  async add_review(payload) {
    const response = await this.create(payload);
    return response;
  }
 
  async get_review(filter_obj={}) {
       const {service_id,institute_id}=filter_obj;
    const criteria = {
       ...(service_id && { service_id }),
      ...(institute_id && { institute_id})
  };
    const response = await this.find_all(criteria, {},[]);
    return response;
}

}
module.exports = {
review_repository: new review_repository({ model: review_model }),
};
