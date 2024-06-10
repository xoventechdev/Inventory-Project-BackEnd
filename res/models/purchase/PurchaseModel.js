import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "suppliers",
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

export const PurchaseModel = mongoose.model("purchases", purchaseSchema);
