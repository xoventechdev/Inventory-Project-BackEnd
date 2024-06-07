import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    typeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "expense_types",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ExpenseModel = mongoose.model("expenses", expenseSchema);
