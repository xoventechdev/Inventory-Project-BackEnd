import mongoose from "mongoose";

const expenseTypeSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
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

export const ExpenseTypeModel = mongoose.model(
  "expense_types",
  expenseTypeSchema
);
