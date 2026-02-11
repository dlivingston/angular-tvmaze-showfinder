import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { catchError, debounceTime, distinctUntilChanged, map, of, startWith, switchMap } from 'rxjs';
import { Show } from '../../core/models/show.model';
import { TvMazeService } from '../../core/services/tvmaze.service';
import { ShowCardComponent } from '../show-card/show-card.component';

type ViewState = 'idle' | 'loading' | 'error' | 'empty' | 'results';

type ViewModel = {
  query: string;
  state: ViewState;
  results: Show[];
};

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, ShowCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  readonly searchControl = new FormControl('', { nonNullable: true });

  readonly vm$ = this.searchControl.valueChanges.pipe(
    startWith(this.searchControl.value),
    map((value) => value.trim()),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((query) => {
      if (!query) {
        return of<ViewModel>({ query, state: 'idle', results: [] });
      }

      return this.tvMazeService.searchShows(query).pipe(
        map((results) => {
          if (results.length === 0) {
            return { query, state: 'empty', results };
          }

          return { query, state: 'results', results };
        }),
        startWith({ query, state: 'loading', results: [] }),
        catchError(() => of({ query, state: 'error', results: [] }))
      );
    })
  );

  constructor(private readonly tvMazeService: TvMazeService) {}
}
