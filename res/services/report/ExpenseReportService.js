import { ExpenseModel } from "../../models/expense/ExpenseModel.js";

export const ExpenseReportService = async (req) => {
  try {
    let data = await ExpenseModel.aggregate([
      {
        $match: {
          userEmail: req.email,
          createdAt: {
            $gte: new Date(req.body.fromDate),
            $lte: new Date(req.body.toDate),
          },
        },
      },
      {
        $facet: {
          total: [
            {
              $group: {
                _id: 0,
                total: { $sum: "$amount" },
              },
            },
          ],
          data: [
            {
              $lookup: {
                from: "expense_types",
                localField: "typeID",
                foreignField: "_id",
                as: "types",
              },
            },
            { $unwind: "$types" },
          ],
        },
      },
    ]);
    return { status: "success", response: data };
  } catch (error) {
    return { status: "error", response: error.message };
  }
};
