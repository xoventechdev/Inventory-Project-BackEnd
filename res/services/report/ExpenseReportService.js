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
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                total: { $sum: "$amount" },
              },
            },
            { $sort: { _id: 1 } },
          ],
        },
      },
    ]);
    return { status: "success", response: data };
  } catch (error) {
    return { status: "error", response: error.message };
  }
};
