const { randomUUID } = require("crypto");
const { Schema, model } = require("mongoose");
const { bad_request } = require("../libs/error");
// booking_id ** (Primary Key)
// user_id ** (Foreign Key to User)
// service_id (Foreign Key to TeachingService)
// institute_id (Foreign key to Institute)
// date
// time
// status (confirmed, pending, canceled)
const booking_schema = new Schema(
  {
    booking_id: {
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
    service_id: {
      type: String,
      ref: "teaching_services",
    },
    institute_id: {
      type: String,
      ref: "institutes",
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["confirmed", "pending", "canceled","completed"],
      default: "pending",
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
booking_schema.pre("save", async function (next) {
  if (!this.booking_id) throw new bad_request("Booking id is required");
  if (!this.user_id) throw new bad_request("User id is required");
  next();
});

booking_schema.pre("findOneAndUpdate", function (next) {
  const booking_id = this.getQuery();
  if (!booking_id) {
    throw new bad_request("Booking id is required");
  }
  next();
});
module.exports = model("bookings", booking_schema);
