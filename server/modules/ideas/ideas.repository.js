class IdeasRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async createIdea({ idUser, title, descr, categorie }) {
    try {
      const [result] = await this.pool.query(
        "INSERT INTO Ideas (idUser, title, descr, categorie) VALUES (?, ?, ?, ?)",
        [idUser, title, descr, categorie]
      );
      const resultId = result.insertId;
      const [rows] = await this.pool.query(
        "SELECT Users.username as Username, Ideas.id, title, descr, categorie, created_at FROM Users JOIN Ideas ON Users.id = Ideas.idUser WHERE Ideas.id = ?",
        [resultId]
      );
      return rows[0];
    } catch (err) {
      console.error(err.message);
      throw new Error("Erreur lors de la création de l'idée");
    }
  }
}

export default IdeasRepository;
