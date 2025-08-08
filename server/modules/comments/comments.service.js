class CommentsService {
  constructor(commentsRepository, ideasService) {
    this.commentsRepository = commentsRepository;
    this.ideasService = ideasService;
  }

  async hasCommented({ idUser, idIdea }) {
    return await this.commentsRepository.hasCommented({ idUser, idIdea });
  }

  async createComment(currentId, { descr, idIdea }) {
    if (!descr || !idIdea || !currentId) {
      throw new Error("ArgumentRequired");
    }
    const idUser = currentId;
    try {
      const idea = await this.ideasService.getIdeaById(idIdea);
      if (!idea) {
        throw new Error("DataNotFound");
      }
      const isCommented = await this.hasCommented({ idUser, idIdea });
      if (isCommented) {
        throw new Error("DataAlreadyExist");
      }

      return await this.commentsRepository.createComment({
        descr,
        idUser,
        idIdea,
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getCommentsByIdea({ idIdea }) {
    if (!idIdea) {
      throw new Error("ArgumentRequired");
    }
    try {
      const idea = await this.ideasService.getIdeaById(idIdea);
      if (!idea) {
        throw new Error("DataNotFound");
      }
      return await this.commentsRepository.getCommentsByIdea({ idIdea });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getCommentByPk({ idUser, idIdea }) {
    return await this.commentsRepository.getCommentByPk({ idUser, idIdea });
  }

  async updateCommentByPk(update, { idUser, idIdea }) {
    if (!idUser || !idIdea || !update || Object.keys(update).length === 0) {
      throw new Error("ArgumentRequired");
    }
    try {
      const comment = await this.getCommentByPk({ idUser, idIdea });
      if (!comment) {
        throw new Error("DataNotFound");
      }
      return await this.commentsRepository.updateCommentByPk(update, {
        idUser,
        idIdea,
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deleteCommentByPk({ idUser, idIdea }) {
    if (!idUser || !idIdea) {
      throw new Error("ArgumentRequired");
    }
    try {
      const comment = await this.getCommentByPk({ idUser, idIdea });
      if (!comment) {
        throw new Error("DataNotFound");
      }
      return await this.commentsRepository.deleteCommentByPk({
        idUser,
        idIdea,
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default CommentsService;
