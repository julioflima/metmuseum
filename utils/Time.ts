/* eslint-disable class-methods-use-this */

export default class TimeUtil {
  public static async delay(timeInMiliseconds: number): Promise<void> {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, timeInMiliseconds)
    );
  }
}
