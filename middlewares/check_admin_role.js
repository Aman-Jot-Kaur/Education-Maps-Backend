const { no_content, not_found,bad_request } = require("../libs/error");
const {users_repository}=require("../repositories/users_repository")
const check_admin_role = async (req, res, next) => {
    try{
    const user_id= req.user.user_id;
    const user = await users_repository.get_user_by_uuid(user_id);
   
    console.log("user in check_admin_role",user)
    if(user.role==="admin"){
        next();
    }
    else{
        throw new bad_request("unAuthorized request");
    }
}
catch (error) {
    next(error.message);
  }
}
  
  module.exports=check_admin_role;