export const CreateService = async (req, model) => {
  try {
    const nameMatch = { $regex: req.body.name, $options: "i" };
    let checkExits = await model.aggregate([
      { $match: { userEmail: req.email, name: nameMatch } },
    ]);
    if (checkExits.length > 0) {
      return { status: "error", response: "This is already exists." };
    }
    req.body.userEmail = req.email;
    await model.create(req.body);
    return {
      status: "success",
      response: `Item created successfully.`,
    };
  } catch (error) {
    return { status: "error", response: error.message };
  }
};
