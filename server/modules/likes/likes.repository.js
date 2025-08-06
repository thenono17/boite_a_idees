class LikesRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async hasLiked({ idUser, idIdea }) {
    const [rows] = await this.pool.query(
      "SELECT * FROM Likes WHERE idUser = ? AND idIdea = ?",
      [idUser, idIdea]
    );
    return rows[0];
  }

  async addLike({ idUser, idIdea }) {
    try {
      await this.pool.query(
        "INSERT INTO Likes (idUser, idIdea) VALUES (?, ?)",
        [idUser, idIdea]
      );
      return { message: "Like ajouté" };
    } catch (err) {
      console.error(err.message);
      throw new Error("Erreur lors de l'ajout du like");
    }
  }

  async unLike({ idUser, idIdea }) {
    try {
      await this.pool.query(
        "DELETE FROM Likes WHERE idUser = ? AND idIdea = ?",
        [idUser, idIdea]
      );
      return { message: "Like supprimé" };
    } catch (err) {
      console.error(err.message);
      throw new Error("Erreur lors de la suppression du like");
    }
  }

  async countLikesByIdea(idIdea) {
    try {
      const [rows] = await this.pool.query(
        "SELECT COUNT(*) AS likeCount FROM Likes WHERE idIdea = ?",
        [idIdea]
      );
      return rows[0];
    } catch (err) {
      console.error(err.message);
      throw new Error("Erreur lors de la récupération des likes");
    }
  }

  async getLikesByIdea({ idIdea }) {
    try {
      const [rows] = await this.pool.query(
        "SELECT username FROM Likes JOIN Users ON Users.id = idUser WHERE Likes.idIdea = ?",
        [idIdea]
      );
      return rows;
    } catch (err) {
      console.error(err.message);
      throw new Error("Erreur lors de la récuperation des likes");
    }
  }
}

export default LikesRepository;
