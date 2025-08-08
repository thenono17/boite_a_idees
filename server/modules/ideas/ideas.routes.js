import express from "express";
import authentification from "../../middleware/authentification.js";
import commentsRoutes from "../comments/comments.routes.js";
import likesRoutes from "../likes/likes.routes.js";

const ideasRoutes = (ideasController, commentsController, likesController) => {
  const router = express.Router();
  router.post("/", authentification, (req, res, next) =>
    ideasController.createIdea(req, res, next)
  );
  router.get("/", (req, res) => ideasController.getAllIdeas(req, res));
  router.get("/:id", (req, res, next) =>
    ideasController.getIdeaById(req, res, next)
  );
  router.get("/categorie/:categorie", (req, res, next) =>
    ideasController.getIdeasByCategorie(req, res, next)
  );
  router.put("/update/:id", authentification, (req, res, next) =>
    ideasController.updateIdeaById(req, res, next)
  );
  router.delete("/delete/:id", authentification, (req, res, next) =>
    ideasController.deleteIdeaById(req, res, next)
  );

  router.use(
    "/:idIdea/comments",
    (req, res, next) => {
      req.idIdea = req.params.idIdea;
      next();
    },
    commentsRoutes(commentsController)
  );

  router.use(
    "/:idIdea/likes",
    (req, res, next) => {
      req.idIdea = req.params.idIdea;
      next();
    },
    likesRoutes(likesController)
  );
  return router;
};

export default ideasRoutes;
