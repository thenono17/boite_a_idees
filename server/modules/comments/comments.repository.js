class CommentsRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async hasCommented({ idUser, idIdea }) {
    const [rows] = await this.pool.query(
      "SELECT * FROM Comments WHERE idUser = ? AND idIdea = ?",
      [idUser, idIdea]
    );
    return rows[0];
  }

  async createComment({ descr, idUser, idIdea }) {
    try {
      await this.pool.query(
        "INSERT INTO Comments(descr, idUser, idIdea) VALUES (?, ?, ?)",
        [descr, idUser, idIdea]
      );
      const [rows] = await this.pool.query(
        "SELECT Users.username AS username, Ideas.title AS title, Ideas.descr AS sujet, Comments.descr AS comments, Comments.created_at AS ctreated_at FROM Users JOIN Comments ON Users.id = Comments.idUser JOIN Ideas ON Ideas.id = Comments.idIdea WHERE Comments.idUser = ? AND Comments.idIdea = ?",
        [idUser, idIdea]
      );
      return rows[0];
    } catch (err) {
      console.error(err.message);
      throw new Error("Erreur lors de la créations du commentaire");
    }
  }

  async getCommentsByIdea({ idIdea }) {
    try {
      const [rows] = await this.pool.query(
        "SELECT Users.username AS username, Ideas.title AS title, Ideas.descr AS sujet, Comments.descr AS comments, Comments.created_at AS ctreated_at FROM Users JOIN Comments ON Users.id = Comments.idUser JOIN Ideas ON Ideas.id = Comments.idIdea WHERE Comments.idIdea = ?",
        [idIdea]
      );
      return rows;
    } catch (err) {
      console.error(err.message);
      throw new Error("Erreur lors de la récuperation du commentaire");
    }
  }

  async getCommentByPk({ idUser, idIdea }) {
    try {
      const [rows] = await this.pool.query(
        "SELECT Users.username AS username, Ideas.title AS ideaTitle, Comments.descr AS comment FROM Comments JOIN Users ON Users.id = Comments.idUser JOIN Ideas ON Ideas.id = Comments.idIdea WHERE Comments.idUser = ? AND Comments.idIdea = ?",
        [idUser, idIdea]
      );

      return rows[0];
    } catch (err) {
      console.error(err.message);
      throw new Error("Erreur lors de la récupération du commentaire.");
    }
  }

  async updateCommentByPk(update, { idUser, idIdea }) {
    try {
      const keys = Object.keys(update);
      const values = Object.values(update);
      const setKeys = keys.map((key) => `${key} = ?`).join(", ");
      await this.pool.query(
        `UPDATE Comments SET ${setKeys} WHERE idUser = ? AND idIdea = ?`,
        [...values, idUser, idIdea]
      );
      const [rows] = await this.pool.query(
        "SELECT Users.username AS username, Ideas.title AS title, Ideas.descr AS sujet, Comments.descr AS comments, Comments.created_at AS ctreated_at FROM Users JOIN Comments ON Users.id = Comments.idUser JOIN Ideas ON Ideas.id = Comments.idIdea WHERE Comments.idUser = ? AND Comments.idIdea = ?",
        [idUser, idIdea]
      );
      return rows[0];
    } catch (err) {
      console.error(err.message);
      throw new Error("Erreur lors de la mise à jour du commentaire");
    }
  }

  async deleteCommentByPk({ idUser, idIdea }) {
    try {
      await this.pool.query(
        "DELETE FROM Comments WHERE idUser = ? AND idIdea = ?",
        [idUser, idIdea]
      );
      return { message: "Commentaire supprimé" };
    } catch (err) {
      console.error(err.message);
      throw new Error("Erreur lors de la suppression du commentaire");
    }
  }
}

export default CommentsRepository;
