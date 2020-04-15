export interface Results {
  name: string;
  url: string;
}

export interface ApiList {
  count: number;
  next: string;
  previous: string;
  page?: number;
  results?: Results[];
}
