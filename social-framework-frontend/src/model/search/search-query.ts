export class SearchItem {
  public type: string;
  public property: string;
  public value: string;
  constructor(type:string, property:string, value:string) {
    this.type=type;
    this.property=property;
    this.value=value;
  }
}

export class SearchQuery {
  public sort: string = '';
  public direction: string = 'asc';
  public start: number = 0;
  public limit: number = 0;
  public searchItems: SearchItem[] = [];
}

export class SearchForm {
  public likedByFollowing: boolean = false;
  public likedByMe: boolean = false;
  public createdByFollowing: boolean = false;
  public createdByMe: boolean = false;
  public tag: string = '';
  public tags: string[] = [];
}
