import { injectable } from 'inversify';

@injectable()
export class FacebookAuth {
  public static clientID = '123456789';
  public static clientSecret = '123456789abcdefg';
  public static enableProof = false;
}
