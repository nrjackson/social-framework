import { SearchItem } from "./search-item";

export class SearchQuery {
    public sort: string;
    public direction: string;
    public start: number;
    public limit: number;
    public searchItems: SearchItem[];
  }
  