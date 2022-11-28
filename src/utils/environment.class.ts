import dotenv from "dotenv";

export class Environment {
  static start() {
    dotenv.config({
      path:
        process.env.NODE_ENV === "production"
          ? ".env.production.local"
          : process.env.NODE_ENV === "development"
          ? ".env.development.local"
          : ".env",
    });

    return true;
  }
}

export default Environment;
