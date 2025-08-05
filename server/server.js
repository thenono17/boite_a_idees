import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import usersRoutes from "./modules/users/users.routes.js";
import buildContainer from "./buildContainer.js";
import errorHandler from "./middleware/handling.error.js";

dotenv.config();
const serveur = express();
const PORT = process.env.PORT;

const container = buildContainer();
const usersController = container.usersController;

serveur.use(express.json());
serveur.use(cookieParser());

serveur.use("/users", usersRoutes(usersController));

serveur.use(errorHandler);

serveur.listen(PORT, () => {
  console.log("Localhost connected", PORT);
});
