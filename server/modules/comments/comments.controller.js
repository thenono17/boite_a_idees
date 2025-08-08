class CommentsController {
  constructor(commentsService) {
    this.commentsService = commentsService;
  }

  async createComment(req, res, next) {
    const idIdea = req.idIdea;
    const currentId = req.userID;
    const { descr } = req.body;
    try {
      const newComment = await this.commentsService.createComment(currentId, {
        descr,
        idIdea,
      });
      res.status(201).json(newComment);
    } catch (err) {
      next(err);
    }
  }

  async getCommentsByIdea(req, res, next) {
    const idIdea = req.idIdea;
    try {
      const comments = await this.commentsService.getCommentsByIdea({ idIdea });
      res.status(200).json(comments);
    } catch (err) {
      next(err);
    }
  }

  async updateCommentByPk(req, res, next) {
    const idIdea = req.idIdea;
    const idUser = req.userID;
    const update = req.body;
    try {
      const updatedComment = await this.commentsService.updateCommentByPk(
        update,
        { idUser, idIdea }
      );
      res.status(200).json(updatedComment);
    } catch (err) {
      next(err);
    }
  }

  async deleteCommentByPk(req, res, next) {
    const idIdea = req.idIdea;
    const idUser = req.userID;
    try {
      const deletedComment = await this.commentsService.deleteCommentByPk({
        idUser,
        idIdea,
      });
      res.status(200).json(deletedComment);
    } catch (err) {
      next(err);
    }
  }
}

export default CommentsController;
