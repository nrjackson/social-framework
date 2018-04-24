import { injectable } from 'inversify';

const devAuthUrl = 'http://localhost:3000';
const facebookClientId = '1927971220769787';

export interface IConfig {
  getAuthUrl(): string;
  getFacebookClientId(): string;
}

@injectable()
export class Config {
  public static getAuthUrl(): string {return devAuthUrl}
  public static getFacebookClientId(): string {return facebookClientId}
}
