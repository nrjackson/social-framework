import { injectable } from 'inversify';

@injectable()
export class Config {
  public static jwtSession = false;
  public static secret = process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret';
  public static RELATION_CREATE = 'CREATED';
  public static RELATION_LIKE = 'LIKES';
  public static RELATION_TAG = 'HAS_TAG';
  public static RELATION_COMMENT = 'HAS_COMMENT';
  public static RELATION_FOLLOW = 'FOLLOWS';

  public static searchItemMap = {
    'hastag' : {'modelName' : 'Tag', 'relation' : Config.RELATION_TAG},
    'likedby' : {'modelName' : 'User', 'relation' : Config.RELATION_LIKE},
    'createdby' : {'modelName' : 'User', 'relation' : Config.RELATION_CREATE},
  };
}
