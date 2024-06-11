const { Schema, model } = require("mongoose");
const { bad_request } = require("../libs/error");
const { randomUUID } = require("crypto");


// service_id ** (Primary Key)
// user_id ** (Foreign Key to User)
// title **
// description **
// category **
// subcategory
// price
// duration
// availability
// location {longi,lati} ** 
// images
// videos
// rating
// contact_details **
const teaching_services_schema = new Schema(
  {
    service_id: {
        type: String,
      required: true,
      unique: true,
      default: randomUUID
    },
    user_id: {
      type: String,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
    },
    price: {
      type: Number
    },
    duration: {
      type: String
    },
    availability: {
      type: String,
    },
    location: {
      longitude: {
        type: Number,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
    },
    images: [
      {
        type: String,
      },
    ],
    videos: [
      {
        type: String,
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    contact_details: {
      type: String,
      required: true
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false,
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
      },
    },
  }
);
teaching_services_schema.pre("save", async function (next) {
  if (!this.user_id) throw new bad_request("User id is required");
  if (!this.title) throw new bad_request("Title is required");
  if (!this.description) throw new bad_request("Description is required");
  if (!this.category) throw new bad_request("Category is required");
  if (!this.location || !this.location.longitude || !this.location.latitude) {
    throw new bad_request("Location is required with longitude and latitude");
  }
  if (!this.contact_details) throw new bad_request("Contact details are required");
  next();
});
teaching_services_schema.pre("findOneAndUpdate", function (next) {
  const profile_id = this.getQuery();
  if (!profile_id) {
    throw new bad_request("Profile id is required");
  }
  next();
});
module.exports = model("teaching_services", teaching_services_schema);
