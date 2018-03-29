import { injectable } from 'inversify';

@injectable()
export class FacebookAuth {
  public static clientID = '1927971220769787';
  public static clientSecret = '904126d4420ffd7af56d0e9a62672703';
  public static enableProof = false;
}
