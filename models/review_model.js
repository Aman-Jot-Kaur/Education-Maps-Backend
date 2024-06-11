const { randomUUID } = require("crypto");
const { Schema, model } = require("mongoose");
const { bad_request } = require("../libs/error");
// review_id ** (Primary Key)
// user_id ** (Foreign Key to User)
// service_id (Foreign Key to TeachingService)
// institute_id(foreign key to institute service)
// rating **
// comment
// date **
const reviews_schema = new Schema(
  {
    review_id: {
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
    service_id: {
      type: String,
      ref: "teaching_services",
    },
    institute_id: {
      type: String,
      ref: "institutes",
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
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
reviews_schema.pre("save", async function (next) {
  if (!this.user_id) throw new bad_request("User id is required");
  if (!this.rating) throw new bad_request("Rating is required");
  if (!this.date) throw new bad_request("Date is required");
  next();
});

reviews_schema.pre("findOneAndUpdate", function (next) {
  const review_id = this.getQuery();
  if (!review_id) {
    throw new bad_request("Review id is required");
  }
  next();
});
module.exports = model("reviews", reviews_schema);
