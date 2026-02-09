import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export type Show = {
  id: number;
  title: string;
  rating: number | null;
  summary: string;
  imageUrl: string;
};

type TvMazeSearchResult = {
  show: {
    id: number;
    name: string;
    rating: { average: number | null };
    image: { medium: string | null; original: string | null } | null;
    summary: string | null;
  };
};

@Injectable({ providedIn: 'root' })
export class TvMazeService {
  private readonly baseUrl = 'https://api.tvmaze.com/search/shows';
  private readonly fallbackImage =
    'https://static.tvmaze.com/images/no-img/no-img-portrait-text.png';

  constructor(private readonly http: HttpClient) {}

  searchShows(query: string): Observable<Show[]> {
    const trimmed = query.trim();
    if (!trimmed) {
      return of([]);
    }

    const url = `${this.baseUrl}?q=${encodeURIComponent(trimmed)}`;
    return this.http.get<TvMazeSearchResult[]>(url).pipe(
      map((results) =>
        results.map(({ show }) => ({
          id: show.id,
          title: show.name,
          rating: show.rating?.average ?? null,
          summary: this.stripHtml(show.summary),
          imageUrl: show.image?.medium ?? show.image?.original ?? this.fallbackImage
        }))
      )
    );
  }

  private stripHtml(input: string | null | undefined): string {
    if (!input) {
      return '';
    }

    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.body.textContent?.trim() ?? '';
  }
}
