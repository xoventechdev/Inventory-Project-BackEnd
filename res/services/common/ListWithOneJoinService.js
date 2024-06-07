export const ListWithOneJoinService = async (
  req,
  model,
  searchArray,
  joinStage
) => {
  try {
    let pageNo = Number(req.params.pageNo);
    let perPage = Number(req.params.perPage);
    let searchValue = req.params.searchKeyword;
    let userEmail = req.email;
    let skipRow = (pageNo - 1) * perPage;
    let data;

    if (searchValue !== "0") {
      let SearchQuery = { $or: searchArray };
      data = await model.aggregate([
        { $match: { userEmail: userEmail } },
        joinStage,
        { $match: SearchQuery },
        {
          $facet: {
            Total: [{ $count: "count" }],
            Rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    } else {
      data = await model.aggregate([
        { $match: { userEmail: userEmail } },
        joinStage,
        {
          $facet: {
            Total: [{ $count: "count" }],
            Rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    }

    return { status: "success", data: data };
  } catch (error) {
    return { status: "error", data: error.message };
  }
};
