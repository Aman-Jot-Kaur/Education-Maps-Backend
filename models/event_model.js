const { randomUUID } = require("crypto");
const { Schema, model } = require("mongoose");
const { bad_request } = require("../libs/error");
// event_id** (Primary Key)
// title**
// description**
// location {longi,lati}**
// date**
// time**
// organizer_id** (Foreign Key to User)
// category**
// registration_link
const event_schema = new Schema(
  {
    event_id: {
        type: String,
        required: true,
        unique: true,
        default: randomUUID
    },
    title: {
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
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    organizer_id: {
      type: String,
      ref: "users",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    registration_link: {
      type: String,
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
event_schema.pre("save", async function (next) {
    if (!this.title) throw new bad_request("Title is required");
    if (!this.description) throw new bad_request("Description is required");
    if (!this.location || !this.location.longitude || !this.location.latitude) {
      throw new bad_request("Location is required with longitude and latitude");
    }
    if (!this.date) throw new bad_request("Date is required");
    if (!this.time) throw new bad_request("Time is required");
    if (!this.organizer_id) throw new bad_request("Organizer id is required");
    if (!this.category) throw new bad_request("Category is required");
    next();
  });
  
  event_schema.pre("findOneAndUpdate", function (next) {
    const event_id = this.getQuery();
    if (!event_id) {
      throw new bad_request("Event id is required");
    }
    next();
  });
module.exports = model("events", event_schema);
