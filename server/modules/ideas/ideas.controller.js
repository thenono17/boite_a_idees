class IdeasController {
  constructor(ideasService) {
    this.ideasService = ideasService;
  }

  async createIdea(req, res, next) {
    const { title, descr, categorie } = req.body;
    const currentId = req.userID;
    console.log(currentId);

    try {
      const newIdeas = await this.ideasService.createIdea(currentId, {
        title,
        descr,
        categorie,
      });
      res.status(201).json({ idea: newIdeas });
    } catch (err) {
      console.log(err);

      next(err);
    }
  }

  async getAllIdeas(req, res) {
    try {
      const ideas = await this.ideasService.getAllIdeas();
      res.status(200).json(ideas);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getIdeaById(req, res, next) {
    const { id } = req.params;
    try {
      const idea = await this.ideasService.getIdeaById(id);
      res.status(200).json(idea);
    } catch (err) {
      next(err);
    }
  }

  async getIdeasByCategorie(req, res, next) {
    const { categorie } = req.params;
    console.log(categorie);

    try {
      const ideas = await this.ideasService.getIdeasByCategorie(categorie);
      res.status(200).json(ideas);
    } catch (err) {
      next(err);
    }
  }

  async updateIdeaById(req, res, next) {
    const update = req.body;
    const currentId = req.userID;
    try {
      const updatedIdea = await this.ideasService.updateIdeaById(
        currentId,
        update
      );
      res.status(200).json({ updatedIdea });
    } catch (err) {
      next(err);
    }
  }

  async deleteIdeaById(req, res, next) {
    const { id } = req.params;
    const currentId = req.userID;
    try {
      const deletedIdea = await this.ideasService.deleteIdeaById(currentId, id);
      res.status(200).json(deletedIdea);
    } catch (err) {
      next(err);
    }
  }
}

export default IdeasController;
