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

  public static DIRECTION_TO = 'to';
  public static DIRECTION_FROM = 'from';

  public static searchItemMap = {
    'hastag' : {'modelName' : 'Tag', 'relation' : Config.RELATION_TAG, 'direction' : Config.DIRECTION_FROM},
    'likedby' : {'modelName' : 'User', 'relation' : Config.RELATION_LIKE, 'direction' : Config.DIRECTION_TO},
    'createdby' : {'modelName' : 'User', 'relation' : Config.RELATION_CREATE, 'direction' : Config.DIRECTION_TO},
  };
}
