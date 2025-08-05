import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;

class UsersService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getUserByEmail(email) {
    return await this.userRepository.getUserByEmail(email);
  }

  async register({ username, email, password }) {
    if (!username || !email || !password) {
      throw new Error("ArgumentRequired");
    }
    try {
      const user = await this.getUserByEmail(email);
      if (user) {
        throw new Error("DataAlreadyExist");
      }
      const hashPassword = await bcrypt.hash(password, saltRounds);
      const newUser = this.userRepository.register({
        username,
        email,
        password: hashPassword,
      });
      return newUser;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async logIn({ email, password }) {
    if (!email || !password) {
      throw new Error("ArgumentRequired");
    }
    try {
      const user = await this.getUserByEmail(email);
      if (!user) {
        throw new Error("IncorrectData");
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("IncorrectData");
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return { token, user: { username: user.username, email: user.email } };
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default UsersService;
