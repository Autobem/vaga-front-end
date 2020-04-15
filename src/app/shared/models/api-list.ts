export interface Results {
  name: string;
  url: string;
}

export interface ApiList {
  count: number;
  next: string;
  previous: string;
  results: Results[];
}
