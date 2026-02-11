import { TestBed } from '@angular/core/testing';
import { Subject, of } from 'rxjs';
import { vi } from 'vitest';
import { Show } from '../../core/models/show.model';
import { TvMazeService } from '../../core/services/tvmaze.service';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  const sampleShow: Show = {
    id: 1,
    title: 'The Office',
    rating: 8.9,
    summary: 'A workplace mockumentary.',
    imageUrl: 'https://example.com/office.jpg'
  };

  let searchShowsMock: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    vi.useFakeTimers();
    searchShowsMock = vi.fn();

    await TestBed.configureTestingModule({
      imports: [SearchComponent],
      providers: [
        {
          provide: TvMazeService,
          useValue: {
            searchShows: searchShowsMock
          }
        }
      ]
    }).compileComponents();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('emits idle state for an empty query', () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const component = fixture.componentInstance;
    const states: string[] = [];

    component.vm$.subscribe((vm) => states.push(vm.state));

    vi.advanceTimersByTime(300);

    expect(states.at(-1)).toBe('idle');
    expect(searchShowsMock).not.toHaveBeenCalled();
  });

  it('emits loading then results for a successful search', () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const component = fixture.componentInstance;
    const searchResponse$ = new Subject<Show[]>();
    const states: string[] = [];

    searchShowsMock.mockReturnValue(searchResponse$.asObservable());
    component.vm$.subscribe((vm) => states.push(vm.state));

    component.searchControl.setValue('office');
    vi.advanceTimersByTime(300);

    expect(searchShowsMock).toHaveBeenCalledTimes(1);
    expect(searchShowsMock).toHaveBeenCalledWith('office');
    expect(states.at(-1)).toBe('loading');

    searchResponse$.next([sampleShow]);
    searchResponse$.complete();
    vi.runOnlyPendingTimers();

    expect(states.at(-1)).toBe('results');
  });

  it('emits loading then empty for an empty result set', () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const component = fixture.componentInstance;
    const searchResponse$ = new Subject<Show[]>();
    const states: string[] = [];

    searchShowsMock.mockReturnValue(searchResponse$.asObservable());
    component.vm$.subscribe((vm) => states.push(vm.state));

    component.searchControl.setValue('unknown series');
    vi.advanceTimersByTime(300);

    expect(states.at(-1)).toBe('loading');

    searchResponse$.next([]);
    searchResponse$.complete();
    vi.runOnlyPendingTimers();

    expect(states.at(-1)).toBe('empty');
  });

  it('emits loading then error when the request fails', () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const component = fixture.componentInstance;
    const searchResponse$ = new Subject<Show[]>();
    const states: string[] = [];

    searchShowsMock.mockReturnValue(searchResponse$.asObservable());
    component.vm$.subscribe((vm) => states.push(vm.state));

    component.searchControl.setValue('failing query');
    vi.advanceTimersByTime(300);

    expect(states.at(-1)).toBe('loading');

    searchResponse$.error(new Error('network'));
    vi.runOnlyPendingTimers();

    expect(states.at(-1)).toBe('error');
  });

  it('debounces rapid input to a single request', () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const component = fixture.componentInstance;

    searchShowsMock.mockReturnValue(of([sampleShow]));
    component.vm$.subscribe();

    component.searchControl.setValue('o');
    component.searchControl.setValue('of');
    component.searchControl.setValue('office');
    vi.advanceTimersByTime(299);
    expect(searchShowsMock).toHaveBeenCalledTimes(0);

    vi.advanceTimersByTime(1);
    expect(searchShowsMock).toHaveBeenCalledTimes(1);
    expect(searchShowsMock).toHaveBeenCalledWith('office');
  });

  it('trims input before requesting search results', () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const component = fixture.componentInstance;

    searchShowsMock.mockReturnValue(of([sampleShow]));
    component.vm$.subscribe();

    component.searchControl.setValue('  office  ');
    vi.advanceTimersByTime(300);

    expect(searchShowsMock).toHaveBeenCalledTimes(1);
    expect(searchShowsMock).toHaveBeenCalledWith('office');
  });
});
