class IdeasService {
  constructor(ideasRepository) {
    this.ideasRepository = ideasRepository;
  }

  async createIdea(currentId, { idUser, title, descr, categorie }) {
    if (!idUser || !title || !descr || !categorie) {
      throw new Error("ArgumentRequired");
    }
    if (idUser.toString() !== currentId.toString()) {
      throw new Error("Unauthorized");
    }
    try {
      if (
        categorie !== "mobilité" &&
        categorie !== "visuel" &&
        categorie !== "web"
      ) {
        throw new Error("IncorrectData");
      }
      return await this.ideasRepository.createIdea({
        idUser,
        title,
        descr,
        categorie,
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getAllIdeas() {
    try {
      return await this.ideasRepository.getAllIdeas();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getIdeaById(id) {
    if (!id) {
      throw new Error("ArgumentRequired");
    }
    try {
      return await this.ideasRepository.getIdeaById(id);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getIdeasByCategorie(categorie) {
    if (!categorie) {
      throw new Error("ArgumentRequired");
    }
    try {
      return await this.ideasRepository.getIdeasByCategorie(categorie);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async updateIdeaById(currentId, { id, update }) {
    if (!id) {
      throw new Error("DataNotFound");
    }
    if (!update || Object.keys(update).length === 0) {
      throw new Error("ArgumentRequired");
    }
    try {
      const idea = await this.getIdeaById(id);
      if (!idea) {
        throw new Error("DataNotFound");
      }
      if (idea.idUser.toString() !== currentId.toString()) {
        throw new Error("Unauthorized");
      }
      const updatedIdea = await this.ideasRepository.updateIdeaById(id, update);
      return updatedIdea;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deleteIdeaById(currentId, id) {
    if (!id) {
      throw new Error("DataNotFound");
    }
    try {
      const idea = await this.getIdeaById(id);
      if (!idea) {
        throw new Error("DataNotFound");
      }
      if (idea.idUser.toString() !== currentId.toString()) {
        throw new Error("Unauthorized");
      }
      return await this.ideasRepository.deleteIdeaById(id);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default IdeasService;
