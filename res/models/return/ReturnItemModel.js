import mongoose from "mongoose";

const returnItemSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    returnId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "return",
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    unitCost: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ReturnItemModel = mongoose.model("return_items", returnItemSchema);
