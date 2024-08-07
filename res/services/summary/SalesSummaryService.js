import { SalesModel } from "../../models/sales/SalesModel.js";
import { addDays, format, subDays } from "date-fns";
export const SalesSummaryService = async (req) => {
  try {
    const today = new Date();
    const thirtyDaysAgo = subDays(today, 29);
    let data = await SalesModel.aggregate([
      {
        $match: {
          userEmail: req.email,
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          total: { $sum: "$grandCost" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    let dateArray = [];
    for (let i = 0; i < 30; i++) {
      dateArray.push(format(addDays(thirtyDaysAgo, i), "yyyy-MM-dd"));
    }

    let mergedData = dateArray.map((date) => {
      let found = data.find((d) => d._id === date);
      return {
        _id: date,
        total: found ? found.total : 0,
      };
    });

    return {
      status: "success",
      response: { total: data, last30days: mergedData },
    };
  } catch (error) {
    return { status: "error", response: error.message };
  }
};
