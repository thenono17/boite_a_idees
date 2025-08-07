import express from "express";
import authentification from "../../middleware/authentification.js";

const likesRoutes = (likesController) => {
  const router = express.Router();
  router.post("/", authentification, (req, res, next) =>
    likesController.addLike(req, res, next)
  );
  router.delete("/", authentification, (req, res, next) =>
    likesController.unLike(req, res, next)
  );
  router.get("/count", (req, res, next) =>
    likesController.countLikesByIdea(req, res, next)
  );
  router.get("/", (req, res, next) =>
    likesController.getLikesByIdea(req, res, next)
  );

  return router;
};

export default likesRoutes;
