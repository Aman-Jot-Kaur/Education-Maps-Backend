const { randomUUID } = require("crypto");
const { Schema, model } = require("mongoose");
const { bad_request } = require("../libs/error");
// experience_id ** (Primary Key)
// user_id **(Foreign Key to User)
// institute_id(Foreign key to institute)
// role**
// description**
// start_date**
// end_date**
const experience_schema = new Schema(
  {
    experience_id: {
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
    institute_id: {
      type: String,
      ref: "institutes",
    },
    role: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
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
experience_schema.pre("save", async function (next) {
  if (!this.user_id) throw new bad_request("User id is required");
  if (!this.role) throw new bad_request("Role is required");
  if (!this.description) throw new bad_request("Description is required");
  if (!this.start_date) throw new bad_request("Start date is required");
  next();
});

experience_schema.pre("findOneAndUpdate", function (next) {
  const experience_id = this.getQuery();
  if (!experience_id) {
    throw new bad_request("Experience id is required");
  }
  next();
});
module.exports = model("experiences", experience_schema);
