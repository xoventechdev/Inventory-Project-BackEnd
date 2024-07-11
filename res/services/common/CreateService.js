export const CreateService = async (req, model) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return {
        status: "error",
        response: "No data found.",
      };
    }

    req.body.userEmail = req.email;
    await model.create(req.body);
    return {
      status: "success",
      response: `Item created successfully.`,
    };
  } catch (error) {
    return { status: "error", response: error };
  }
};
