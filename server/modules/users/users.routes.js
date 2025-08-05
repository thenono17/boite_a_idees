import express from "express";

const usersRoutes = (usersController) => {
  const router = express.Router();

  router.post("/", (req, res, next) =>
    usersController.register(req, res, next)
  );

  router.post("/login", (req, res, next) =>
    usersController.logIn(req, res, next)
  );
  return router;
};

export default usersRoutes;
