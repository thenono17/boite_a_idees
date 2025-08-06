import express from "express";
import authentification from "../../middleware/authentification.js";

const ideasRoutes = (ideasController) => {
  const router = express.Router();
  router.post("/", (req, res, next) =>
    ideasController.createIdea(req, res, next)
  );

  return router;
};

export default ideasRoutes;
