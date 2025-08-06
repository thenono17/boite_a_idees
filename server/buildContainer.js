import getPool from "./config/mariadb.js";
import UsersRepository from "./modules/users/users.repository.js";
import UsersService from "./modules/users/users.service.js";
import UsersController from "./modules/users/users.controller.js";
import IdeasRepository from "./modules/ideas/ideas.repository.js";
import IdeasService from "./modules/ideas/ideas.service.js";
import IdeasController from "./modules/ideas/ideas.controller.js";

const buildContainer = () => {
  const pool = getPool();

  const usersRepository = new UsersRepository(pool);
  const ideasRepository = new IdeasRepository(pool);
  const usersService = new UsersService(usersRepository);
  const ideasService = new IdeasService(ideasRepository);
  const usersController = new UsersController(usersService);
  const ideasController = new IdeasController(ideasService);

  return { usersController, ideasController };
};

export default buildContainer;
