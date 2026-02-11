import { Show } from '../models/show.model';
import { TvMazeSearchResult } from './tvmaze.types';

export function mapTvMazeSearchResultToShow(
  result: TvMazeSearchResult,
  fallbackImageUrl: string
): Show {
  const { show } = result;

  return {
    id: show.id,
    title: show.name,
    rating: show.rating?.average ?? null,
    summary: stripHtml(show.summary),
    imageUrl: show.image?.medium ?? show.image?.original ?? fallbackImageUrl
  };
}

export function stripHtml(input: string | null | undefined): string {
  if (!input) {
    return '';
  }

  const doc = new DOMParser().parseFromString(input, 'text/html');
  return doc.body.textContent?.trim() ?? '';
}
