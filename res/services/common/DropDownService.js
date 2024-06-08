export const DropDownService = async (req, model, project) => {
  try {
    let data = await model.aggregate([
      { $match: { userEmail: req.email, status: 1 } },
      {
        $project: project,
      },
    ]);
    return { status: "success", response: data };
  } catch (error) {
    return { status: "error", response: error.message };
  }
};
