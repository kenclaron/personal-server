import util from "util";

import Logger from "./logger.class";

export class Information {
  static date(message: any, ...items: any[]) {
    const info = [`[${new Date().toISOString()}]`, message, ...items].join(" ");

    console.info(info);
    this.write(info);
  }

  static status(status: number, message: any, ...items: any[]) {
    let type: Type;

    if (status >= 100 && status <= 199) type = Type.INFO;
    else if (status >= 200 && status <= 299) type = Type.SUCCESS;
    else if (status >= 300 && status <= 399) type = Type.SUCCESS;
    else if (status >= 400 && status <= 599) type = Type.ERROR;
    else type = Type.WARNING;

    const info = [type, `[${status}]`, message, ...items].join(" ");

    this.date(info);
  }

  static write(message: string) {
    Logger.write(util.format(message.replaceAll(/\[\d{1,2}m/g, "")) + "\n");
  }
}

export enum Type {
  ERROR = "\x1b[41mERROR\x1b[0m",
  SUCCESS = "\x1b[42mSUCCESS\x1b[0m",
  WARNING = "\x1b[43mWARNING\x1b[0m",
  DEBUG = "\x1b[44mDEBUG\x1b[0m",
  INFO = "\x1b[46mINFO\x1b[0m",
}

export default Information;
