import express from "express";
import authentification from "../../middleware/authentification.js";

const commentsRoutes = (commentsController) => {
  const router = express.Router();

  router.post("/", authentification, (req, res, next) =>
    commentsController.createComment(req, res, next)
  );
  router.get("/", (req, res, next) =>
    commentsController.getCommentsByIdea(req, res, next)
  );
  router.put("/", authentification, (req, res, next) =>
    commentsController.updateCommentByPk(req, res, next)
  );
  router.delete("/", authentification, (req, res, next) =>
    commentsController.deleteCommentByPk(req, res, next)
  );

  return router;
};

export default commentsRoutes;
