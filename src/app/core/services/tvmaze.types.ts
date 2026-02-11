export type TvMazeSearchResult = {
  score: number;
  show: TvMazeShow;
};

export type TvMazeShow = {
  id: number;
  name: string;
  rating: TvMazeRating | null;
  image: TvMazeImage | null;
  summary: string | null;
};

export type TvMazeRating = {
  average: number | null;
};

export type TvMazeImage = {
  medium: string | null;
  original: string | null;
};
