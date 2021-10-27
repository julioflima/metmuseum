/* eslint-disable class-methods-use-this */

import { IObjectArt, IObjectArtIndex } from '../interfaces/ObjectArt';
import ApiService from './ApiService';

export default class ArtService extends ApiService {
  constructor() {
    const baseUrl = String(process.env.NEXT_PUBLIC_BASE_URL);

    super({}, baseUrl);
  }

  public async index(): Promise<IObjectArtIndex> {
    return this.api.get('/public/collection/v1/objects');
  }

  public async get(idObject: number): Promise<IObjectArt> {
    return this.api.get(`/public/collection/v1/objects/${idObject}`);
  }
}
