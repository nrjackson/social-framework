export class SearchItem {
  public type: string;
  public property: string;
  public value: string;
}

export class SearchRelation {
  public fromModel: string;
  public fromProperty: string;
  public fromValue: string;
  public fromAlias: string;
  public relation: string;
  public toModel: string;
  public toProperty: string;
  public toValue: string;
  public toAlias: string;
}
