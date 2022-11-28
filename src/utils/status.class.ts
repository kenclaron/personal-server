import fs from "fs";
import Status from "../types/status.type";
import Config from "./config.class";

export class StatusHandler {
  private _works: boolean;
  private _cached: boolean;

  private static get() {
    return (JSON.parse(fs.readFileSync(Config.status, "utf-8")) as Status).code;
  }

  public static get works() {
    return this.get() === 200 || this.cached;
  }

  public static get cached() {
    return this.get() === 304;
  }
}

export default StatusHandler;
