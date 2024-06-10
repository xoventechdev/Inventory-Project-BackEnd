import { ExpenseModel } from "../../models/expense/ExpenseModel.js";

export const ExpenseSummaryService = async (req) => {
  try {
    let data = await ExpenseModel.aggregate([
      {
        $match: {
          userEmail: req.email,
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
          last30days: [
            {
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                total: { $sum: "$amount" },
              },
            },
            { $sort: { _id: -1 } },
            { $limit: 30 },
          ],
        },
      },
    ]);
    return { status: "success", response: data };
  } catch (error) {
    return { status: "error", response: error.message };
  }
};
