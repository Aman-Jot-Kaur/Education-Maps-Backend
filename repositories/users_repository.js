const { user_model } = require("../models");
const { base_repository } = require("./base_repository");
const { no_content, not_found, bad_request } = require("../libs/error");
const {generateJWT} = require("../libs/utils");
class users_repository extends base_repository {
  constructor(payload) {
    super(payload);
  }

  async add_user(payload) {
    const response = await this.create(payload);
    response.token = await generateJWT(response?.user_id);
    return response;
  }
  async get_user_by_uuid(user_id) {
    const criteria = { user_id, deleted_at: null };
    const response = await this.find_one(criteria);
    return response;
  }
  async update_user(user_id, payload) {
    const criteria = {  user_id, deleted_at: null };
    const update = { $set: {} };
    if (payload?.role) update.$set.name = payload?.role;
    if (payload?.password) update.$set.password = payload?.password;
    if (payload?.email) update.$set.location = payload?.email;
    const response = await this.update_one(criteria, update, {
      new: true,
      runValidators: true,
    });
    return response;
  }

  async login_user(email, password) {
    const criteria = { email, deleted_at: null };
    const user = await user_model.findOne(criteria).select("+password");//select means to hide the password field in response
    if(!user){
      return null;
    }
    // @ts-ignore
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      const token= await generateJWT(user?.user_id);
      user.password = undefined;
   
       return {user,token};
    }
    return null;
  }
}
module.exports = {
  users_repository: new users_repository({ model: user_model }),
};
