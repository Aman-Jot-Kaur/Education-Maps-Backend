const { no_content, not_found } = require("../libs/error");
const { error_handler } = require("../libs/utils");
const {teaching_service_services}=require("../services")

exports.add_teaching_service=async(req,res)=>{
    try {
      
        const response = await teaching_service_services.add_teaching_service({ data: req.body });
        if (!response) throw new Error("Teaching service could not be created.");
        return res.status(201).json(response);
      } catch (error) {
        console.log("error in add Teaching service controller", error);
        res.status(error_handler(error)).json({ message: error.message });
      }
}
exports.update_teaching_service = async (req, res) => {
    try {
      const response = await teaching_service_services.update_teaching_service({
        params: req.params,
        data: req.body,
      });
      if (!response) throw new Error("teaching service could not be updated.");
      res.status(200).json(response);
    } catch (error) {
      console.log("error in update teaching service controller", error);
      res.status(error_handler(error)).json({ message: error.message });
    }
  };

  exports.delete_teaching_service=async(req,res)=>{
    try {
      const response = await teaching_service_services.delete_teaching_service({ params: req.params });
      if (!response) throw new Error("teaching_service could not be deleted.");
      return res.status(200).json(response);
    } catch (error) {
      console.log("error in delete teaching_service controller", error);
      res.status(error_handler(error)).json({ message: error.message });
    }
  }