class LikesController {
  constructor(likesService) {
    this.likesService = likesService;
  }
  async addLike(req, res, next) {
    const { idIdea } = req.body;
    const idUser = req.userID;
    try {
      const result = await this.likesService.addLike({ idUser, idIdea });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  async unLike(req, res, next) {
    const { idIdea } = req.body;
    const idUser = req.userID;
    try {
      console.log(idIdea);

      console.log(idUser);

      const result = await this.likesService.unlike({ idUser, idIdea });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async countLikesByIdea(req, res, next) {
    const { idIdea } = req.params;
    try {
      const count = await this.likesService.countLikesByIdea(idIdea);
      res.status(200).json(count);
    } catch (err) {
      next(err);
    }
  }

  async getLikesByIdea(req, res, next) {
    const { idIdea } = req.params;
    try {
      const likes = await this.likesService.getLikesByIdea({ idIdea });
      res.status(200).json(likes);
    } catch (err) {
      next(err);
    }
  }
}

export default LikesController;
