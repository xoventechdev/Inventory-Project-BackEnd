import mongoose from "mongoose";

const purchaseItemSchema = new mongoose.Schema(
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
    purchaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "purchases",
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

export const PurchaseItemModel = mongoose.model(
  "purchases_items",
  purchaseItemSchema
);
