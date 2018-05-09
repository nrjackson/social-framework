import { injectable } from 'inversify';

export class Relation {
  public static CREATE = 'CREATED';
  public static LIKE = 'LIKES';
  public static TAG = 'HAS_TAG';
  public static COMMENT = 'HAS_COMMENT';
  public static FOLLOW = 'FOLLOWS';
}
