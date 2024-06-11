const { no_content, not_found } = require("../libs/error");
const { error_handler } = require("../libs/utils");
const {review_services}=require("../services")

exports.add_review=async(req,res)=>{
    try {
      
        const response = await review_services.add_review({ data: req.body });
        if (!response) throw new Error("review could not be created.");
        console.log("Modified response:", response.token);
        return res.status(201).json(response);
      } catch (error) {
        console.log("error in create message controller", error);
        res.status(error_handler(error)).json({ message: error.message });
      }
}

exports.get_review = async (req, res) => {
  try {
    const response = await review_services.get_review({ query: req.query});
    if (!response) throw new not_found("review could not be found.");
    return res.status(200).json(response);
  } catch (error) {
    console.log("error in get by id service review controller", error);
    res.status(error_handler(error)).json({ message: error.message });
  }
}

