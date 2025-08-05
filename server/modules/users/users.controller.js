class UsersController {
  constructor(userServices) {
    this.userServices = userServices;
  }

  async register(req, res, next) {
    const { username, email, password } = req.body;
    try {
      const User = await this.userServices.register({
        username,
        email,
        password,
      });
      return res.status(201).json({ User });
    } catch (err) {
      next(err);
    }
  }

  async logIn(req, res, next) {
    const { email, password } = req.body;
    try {
      const { token, user } = await this.userServices.logIn({
        email,
        password,
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.ENV === "production",
        sameSite: "Strict",
        expires: new Date(Date.now() + 36000),
      });
      res.status(200).json({ user });
    } catch (err) {
      next(err);
    }
  }
}

export default UsersController;
