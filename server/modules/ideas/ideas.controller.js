class IdeasController {
  constructor(ideasService) {
    this.ideasService = ideasService;
  }

  async createIdea(req, res, next) {
    const { idUser, title, descr, categorie } = req.body;
    try {
      const newIdeas = await this.ideasService.createIdea({
        idUser,
        title,
        descr,
        categorie,
      });
      res.status(201).json({ idea: newIdeas });
    } catch (err) {
      next(err);
    }
  }
}

export default IdeasController;
