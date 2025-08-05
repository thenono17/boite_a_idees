class UsersRepository {
  constructor(pool) {
    this.pool = pool;
  }
  async getUserByEmail(email) {
    const [rows] = await this.pool.query(
      "SELECT * FROM Users WHERE email = ?",
      [email]
    );
    return rows[0] || null;
  }

  async register({ username, email, password }) {
    try {
      const result = await this.pool.query(
        "INSERT INTO Users (username, email, password) VALUES (?, ?, ?)",
        [username, email, password]
      );
      return { id: result[0].insertId, username, email };
    } catch (err) {
      console.error(err.message);
      throw new Error("Erreur lors de la création de l'utilisateur");
    }
  }
}

export default UsersRepository;
