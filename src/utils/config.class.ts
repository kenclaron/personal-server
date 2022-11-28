import fs from "fs";

const data = JSON.parse(fs.readFileSync(process.env.CONFIG_FILE, "utf8"));

/** Class with pathnames from config */
export class Config {
  static status: string = data.status;
  static logs: string = data.logs;
  static github: string = data.github;
}

export default Config;
