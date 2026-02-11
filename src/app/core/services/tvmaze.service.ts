import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Show } from '../models/show.model';
import { mapTvMazeSearchResultToShow } from './tvmaze.mapper';
import { TvMazeSearchResult } from './tvmaze.types';

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
      map((results) => results.map((result) => mapTvMazeSearchResultToShow(result, this.fallbackImage)))
    );
  }
}
