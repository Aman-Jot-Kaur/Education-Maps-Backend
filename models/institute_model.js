const { Schema, model } = require("mongoose");
const { bad_request } = require("../libs/error");
const { randomUUID } = require("crypto");
// institute_id **(Primary Key)
// name**
// description**
// location**
// programs_offered
// accreditation
// contact_details**
// website
// images 
// videos
// rating
const institute_schema = new Schema(
  {
    institute_id: {
        type: String,
        required: true,
        unique: true,
        default: randomUUID
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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
    programs_offered: {
      type: [String],
    },
    accreditation: {
      type: String
    },
    contact_details: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    images: [
      {
        type: String
      },
    ],
    videos: [
      {
        type: String
      },
    ],
    rating: {
        type: Number,
        default: 0,
      },
      owner_id: {
        type: String,
        ref: "users",
        required: true,
      }
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

institute_schema.pre("save", async function (next) {
  if (!this.name) throw new bad_request("Name is required");
  if (!this.description) throw new bad_request("Description is required");
  if (!this.location || !this.location.longitude || !this.location.latitude) {
    throw new bad_request("Location is required with longitude and latitude");
  }
  if (!this.contact_details) throw new bad_request("Contact details are required");
  if (!this.owner_id) throw new bad_request("Creater details are required");
  next();
});

institute_schema.pre("findOneAndUpdate", function (next) {
  const institute_id = this.getQuery();
  if (!institute_id) {
    throw new bad_request("Institute id is required");
  }
  next();
});

module.exports = model("institutes", institute_schema);
