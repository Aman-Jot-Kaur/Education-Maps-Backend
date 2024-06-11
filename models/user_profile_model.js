const { Schema, model } = require("mongoose");
const { randomUUID } = require("crypto");
const { bad_request } = require("../libs/error");
const uuid_validator = require("uuid-validate");
const validator = require("validator");
// user:
// profile_id**
// user_id (foreign key to user) ** 
// bio
// location {longitude,latitude}
// social_links
// education_degrees
// experiences
// skill
// certifications
const user_profile_schema = new Schema(
  {
    profile_id: {
      type: String,
      required: true,
      unique: true,
      default: randomUUID,
    },
    user_id: {
      type: String,
      ref: "users",
      required: true,
    },
    bio: {
      type: String,
    },
    location: {
      longitude: {
        type: Number,
      },
      latitude: {
        type: Number,
      },
    },
    social_links: {
      type: [String],
    },
    education_degrees: {
      type: [String],
    },
    experiences: [
      {
        experience_id: {
          type: String,
          ref: "experiences",
        },
      },
    ],
    skills: [
      {
        type: String,
      },
    ],
    certifications: [
      {
        type: String,
      },
    ],
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

user_profile_schema.pre("save", async function (next) {
  if (!this.profile_id) throw new bad_request("Profile id is required");
  if (!this.user_id) throw new bad_request("User id is required");
  next();
});
user_profile_schema.pre("findOneAndUpdate", function (next) {
  const profile_id = this.getQuery();
  if (!profile_id) {
    throw new bad_request("Profile id is required");
  }
  next();
});


module.exports = model("user_profiles", user_profile_schema);
