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
        "SELECT Users.username as username, Ideas.id, title, descr, categorie, created_at FROM Users JOIN Ideas ON Users.id = Ideas.idUser WHERE Ideas.id = ?",
        [resultId]
      );
      return rows[0];
    } catch (err) {
      console.error(err.message);
      throw new Error("Erreur lors de la création de l'idée");
    }
  }

  async getAllIdeas() {
    try {
      const [rows] = await this.pool.query(
        "SELECT Users.username AS username, Ideas.id AS idea_id, title, descr, categorie, updated_at FROM Users JOIN Ideas ON Users.id = Ideas.idUser "
      );
      const grouped = {};

      rows.map((row) => {
        if (!grouped[row.username]) {
          grouped[row.username] = {
            username: row.username,
            ideas: [],
          };
        }
        if (row.idea_id) {
          grouped[row.username].ideas.push({
            idea_id: row.idea_id,
            title: row.title,
            descr: row.descr,
            updatedAt: row.updated_at,
          });
        }
      });
      return grouped;
    } catch (err) {
      console.error(err.message);
      throw new Error("Erreur lors de récuperation des idées");
    }
  }

  async getIdeaById(id) {
    try {
      const [rows] = await this.pool.query(
        "SELECT Ideas.idUser, Users.username AS username, Ideas.id AS idea_id, title, descr, categorie, updated_at FROM Users JOIN Ideas ON Users.id = Ideas.idUser WHERE Ideas.id = ?",
        [id]
      );
      return rows[0];
    } catch (err) {
      console.error(err.message);
      throw new Error("Erreur lors de la récuperation de l'idée");
    }
  }

  async getIdeasByCategorie(categorie) {
    try {
      const [rows] = await this.pool.query(
        "SELECT Users.username AS username, Ideas.id AS idea_id, title, descr, categorie, updated_at FROM Users JOIN Ideas ON Users.id = Ideas.idUser WHERE categorie = ?",
        [categorie]
      );
      console.log(rows);
      return rows;
    } catch (err) {
      console.error(err.message);
      throw new Error("Erreur lors de la récuperation des idées");
    }
  }

  async updateIdeaById(id, update) {
    try {
      const keys = Object.keys(update);
      const values = Object.values(update);
      const setKeys = keys.map((key) => `${key} = ?`).join(", ");
      await this.pool.query(`UPDATE Ideas SET ${setKeys} WHERE id = ?`, [
        ...values,
        id,
      ]);
      const [rows] = await this.pool.query(
        "SELECT Users.username AS username, Ideas.id AS idea_id, title, descr, categorie, updated_at FROM Ideas JOIN Users ON Users.id = Ideas.idUser WHERE Ideas.id = ?",
        [id]
      );
      return rows[0];
    } catch (err) {
      console.error(err.message);
      throw new Error("Erreur lors de la mise à jour de l'idée");
    }
  }

  async deleteIdeaById(id) {
    try {
      await this.pool.query("DELETE FROM Ideas WHERE id = ?", [id]);
      return { message: "Idée supprimé" };
    } catch (err) {
      console.error(err.message);
      throw new Error("Erreur lors de la suppression de l'idée");
    }
  }
}

export default IdeasRepository;
