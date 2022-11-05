import logatim from 'logatim';

export const LoggerLevels = {
  TRACE: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
};
export class Logger {
  public static setLevel(level?: string): void {
    const logLevel = level ? (LoggerLevels[level] as number) : LoggerLevels.TRACE;
    logatim.setLevel(logLevel);
  }

  public static getLevel(): void {
    logatim.getLevel();
  }

  /**
   * Show info for endusers
   * @param msg []
   */
  public static info(...msg: unknown[]): void {
    logatim.info(msg);
  }

  // public static styledInfo(...msg: unknown[]): void {
  //   // logatim.cyan.bgBlack.bold.info(msg);
  //   // logatim.white.bgBlack.bold.info(msg);
  //   // logatim.red.bgBlack.bold.info(msg);
  //   // logatim.yellow.bgBlack.bold.info(msg);
  //   // logatim.blue.bgBlack.bold.info(msg);
  //   // logatim.green.bgBlack.bold.info(msg);
  // }

  public static trace(...msg: unknown[]): void {
    logatim.trace(msg);
  }

  public static debug(...msg: unknown[]): void {
    logatim.debug(msg);
  }

  public static warn(...msg: unknown[]): void {
    logatim.warn(msg);
  }

  public static error(...msg: unknown[]): void {
    logatim.error(msg);
  }
}
