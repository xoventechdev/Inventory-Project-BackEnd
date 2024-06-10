export const ReportService = async (req, model) => {
  try {
    let data = await model.aggregate([
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
                total: { $sum: "$total" },
              },
            },
          ],
          data: [
            {
              $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "product",
              },
            },
            { $unwind: "$product" },
            {
              $lookup: {
                from: "brands",
                localField: "product.brandId",
                foreignField: "_id",
                as: "brand",
              },
            },
            { $unwind: "$brand" },
            {
              $lookup: {
                from: "categories",
                localField: "product.categoryId",
                foreignField: "_id",
                as: "category",
              },
            },
            { $unwind: "$category" },
          ],
        },
      },
    ]);
    return { status: "success", response: data };
  } catch (error) {
    return { status: "error", response: error.message };
  }
};
