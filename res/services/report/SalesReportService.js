import { SalesModel } from "../../models/sales/SalesModel.js";

export const SalesReportService = async (req) => {
  try {
    let data = await SalesModel.aggregate([
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
                total: {
                  $sum: {
                    $subtract: [
                      {
                        $add: [
                          { $ifNull: ["$grandCost", 0] },
                          { $ifNull: ["$shippingCost", 0] },
                          { $ifNull: ["$vatTax", 0] },
                          { $ifNull: ["$otherCost", 0] },
                        ],
                      },
                      { $ifNull: ["$discount", 0] },
                    ],
                  },
                },
              },
            },
          ],
          data: [
            {
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                total: {
                  $sum: {
                    $subtract: [
                      {
                        $add: [
                          { $ifNull: ["$grandCost", 0] },
                          { $ifNull: ["$shippingCost", 0] },
                          { $ifNull: ["$vatTax", 0] },
                          { $ifNull: ["$otherCost", 0] },
                        ],
                      },
                      { $ifNull: ["$discount", 0] },
                    ],
                  },
                },
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
