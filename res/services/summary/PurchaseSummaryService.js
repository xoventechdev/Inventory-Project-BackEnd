import { PurchaseModel } from "../../models/purchase/PurchaseModel.js";

export const PurchaseSummaryService = async (req) => {
  try {
    let data = await PurchaseModel.aggregate([
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
                total: { $sum: "$grandCost" },
              },
            },
          ],
          last30days: [
            {
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                total: { $sum: "$grandCost" },
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
