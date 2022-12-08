const userIsCreator = (baseModel) => {
  return async (request, response, next) => {
    try {
      const data = await baseModel.findById(request.params);
      if (!data) {
        return response.status(400).json({ erro: 'informação não localizada' });
      }
      if (request.CurrentUser._id !== data.creator) {
        return response
          .status(401)
          .json({ erro: 'usuário não pode realizar esta requisição' });
      }
      request.currentData = data;
      next();
    } catch (err) {
      console.log(err);
      return response.status(401).json({ erro: err });
    }
  };
};
export default userIsCreator;
