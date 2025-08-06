import express from "express";
import authentification from "../../middleware/authentification.js";

const ideasRoutes = (ideasController) => {
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
  return router;
};

export default ideasRoutes;
