const { no_content, not_found } = require("../libs/error");
const { error_handler } = require("../libs/utils");
const {institute_services}=require("../services")


exports.add_institute=async(req,res)=>{
    try {
        const response = await institute_services.add_institute({ data: req.body });
        if (!response) throw new Error("Institute could not be created.");
        return res.status(201).json(response);
      } catch (error) {
        console.log("error in add Institute controller", error);
        res.status(error_handler(error)).json({ message: error.message });
      }
}
exports.update_institute = async (req, res) => {
    try {
      const response = await institute_services.update_institute({
        params: req.params,
        data: req.body,
      });
      if (!response) throw new Error("Institute could not be updated.");
      res.status(200).json(response);
    } catch (error) {
      console.log("error in update Institute controller", error);
      res.status(error_handler(error)).json({ message: error.message });
    }
  };

  exports.delete_institute=async(req,res)=>{
    try {
      const response = await institute_services.delete_institute({ params: req.params });
      if (!response) throw new Error("institute could not be deleted.");
      return res.status(200).json(response);
    } catch (error) {
      console.log("error in delete institute controller", error);
      res.status(error_handler(error)).json({ message: error.message });
    }
  }