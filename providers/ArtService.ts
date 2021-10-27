/* eslint-disable no-await-in-loop */
/* eslint-disable class-methods-use-this */

import { IObjectArt } from '../interfaces/ObjectArt';
import ArtService from '../services/ArtService';
import TimeUtil from '../utils/Time';

export default class ArtProvider {
  private async getIndexes(initialIndexes: number[] = []): Promise<number[]> {
    if (!initialIndexes.length) {
      const { objectIDs: indexes } = await new ArtService().index();
      return indexes;
    }

    return initialIndexes;
  }

  public async getObject(
    initialBlackList: number[] = [],
    initialIndexes: number[] = []
  ): Promise<{ objectArt: IObjectArt; blacklist: number[]; indexes: number[] }> {
    try {
      const blacklist: number[] = [...initialBlackList];
      let objectArt: IObjectArt = {} as IObjectArt;

      const indexes = await this.getIndexes(initialIndexes);

      // This was added because some objects were not returning an valid image.
      while (!objectArt.primaryImage) {
        const indexesFiltered = indexes.filter((index) => !blacklist.includes(index));
        const randomized = Math.floor(Math.random() * indexesFiltered.length);
        blacklist.push(indexesFiltered[randomized]);
        objectArt = await new ArtService().get(indexesFiltered[randomized]);
      }

      return { objectArt, blacklist, indexes };
    } catch (error) {
      console.error(error);
      await TimeUtil.delay(2000);
      return this.getObject(initialBlackList, initialIndexes);
    }
  }
}
