import mongoose from "mongoose";

const SalesSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers",
      required: true,
    },
    vatTax: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    otherCost: {
      type: Number,
    },
    shippingCost: {
      type: Number,
    },
    grandCost: {
      type: Number,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const SalesModel = mongoose.model("sales", SalesSchema);
