/* eslint-disable no-await-in-loop */
/* eslint-disable class-methods-use-this */

import { IObjectArt } from '../interfaces/ObjectArt';
import ArtService from '../services/ArtService';

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
  ): Promise<{ objectArt: IObjectArt; blackList: number[]; indexes: number[] }> {
    const blackList: number[] = [...initialBlackList];
    let objectArt: IObjectArt = {} as IObjectArt;

    const indexes = await this.getIndexes(initialIndexes);

    while (!objectArt.primaryImage) {
      const indexesFiltered = indexes.filter((index) => !blackList.includes(index));
      const randomized = Math.floor(Math.random() * indexesFiltered.length);
      blackList.push(indexesFiltered[randomized]);
      objectArt = await new ArtService().get(indexesFiltered[randomized]);
    }

    return { objectArt, blackList, indexes };
  }
}
