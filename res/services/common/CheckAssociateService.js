export const CheckAssociateService = async (associateData, associateModel) => {
  try {
    let data = await associateModel.aggregate([{ $match: associateData }]);
    return data.length > 0;
  } catch (error) {
    return false;
  }
};
