class LikesService {
  constructor(likesRepository, ideasService) {
    this.likesRepository = likesRepository;
    this.ideasService = ideasService;
  }

  async hasLiked({ idUser, idIdea }) {
    return await this.likesRepository.hasLiked({ idUser, idIdea });
  }

  async addLike({ idUser, idIdea }) {
    if (!idUser || !idIdea) {
      throw new Error("ArgumentRequired");
    }
    try {
      const idea = await this.ideasService.getIdeaById(idIdea);
      if (!idea) {
        throw new Error("DataNotFound");
      }
      const isLiked = await this.hasLiked({ idUser, idIdea });
      if (isLiked) {
        throw new Error("DataAlreadyExist");
      }
      return this.likesRepository.addLike({ idUser, idIdea });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async unlike({ idUser, idIdea }) {
    if (!idUser || !idIdea) {
      throw new Error("ArgumentRequired");
    }
    try {
      const idea = await this.ideasService.getIdeaById(idIdea);
      const isLiked = await this.hasLiked({ idUser, idIdea });
      if (!idea || !isLiked) {
        throw new Error("DataNotFound");
      }
      return await this.likesRepository.unLike({ idUser, idIdea });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async countLikesByIdea(idIdea) {
    if (!idIdea) {
      throw new Error("ArgumentRequired");
    }
    try {
      const idea = await this.ideasService.getIdeaById(idIdea);
      if (!idea) {
        throw new Error("DataNotFound");
      }
      return await this.likesRepository.countLikesByIdea(idIdea);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getLikesByIdea({ idIdea }) {
    if (!idIdea) {
      throw new Error("ArgumentRequired");
    }
    try {
      const idea = await this.ideasService.getIdeaById(idIdea);
      if (!idea) {
        throw new Error("DataNotFound");
      }
      return await this.likesRepository.getLikesByIdea({ idIdea });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default LikesService;
