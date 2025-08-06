class IdeasService {
  constructor(ideasRepository) {
    this.ideasRepository = ideasRepository;
  }

  async createIdea({ idUser, title, descr, categorie }) {
    if (!idUser || !title || !descr || !categorie) {
      throw new Error("ArgumentRequired");
    }
    try {
      if (
        categorie !== "mobilité" &&
        categorie !== "visuel" &&
        categorie !== "web"
      ) {
        throw new Error("IncorrectData");
      }
      return await this.ideasRepository.createIdea({
        idUser,
        title,
        descr,
        categorie,
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default IdeasService;
