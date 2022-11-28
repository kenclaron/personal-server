import fs from "fs";
import path from "path";
import Config from "./config.class";
import { Information, Type } from "./information.class";

!fs.existsSync(process.cwd() + "/" + Config.logs) &&
  fs.mkdirSync(process.cwd() + "/" + Config.logs);

const filename =
  new Date().toISOString().slice(0, 19).replace(/:/g, "-") + ".log";

export const Logger = fs.createWriteStream(
  path.join(process.cwd(), Config.logs, filename),
  { flags: "w" }
);

console.error = function (...data: any[]) {
  Information.date(
    JSON.stringify(data).toLowerCase().includes("warning")
      ? Type.WARNING
      : Type.ERROR,
    data
  );
};

export default Logger;
