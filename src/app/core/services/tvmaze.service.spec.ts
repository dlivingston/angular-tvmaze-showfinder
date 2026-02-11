import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TvMazeService } from './tvmaze.service';
import { TvMazeSearchResult } from './tvmaze.types';

describe('TvMazeService', () => {
  let service: TvMazeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TvMazeService, provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(TvMazeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('returns an empty array without making a request for whitespace queries', () => {
    let result: unknown;
    service.searchShows('   ').subscribe((shows) => {
      result = shows;
    });

    expect(result).toEqual([]);
    httpMock.expectNone('https://api.tvmaze.com/search/shows?q=');
  });

  it('encodes the query and maps the API response', () => {
    const query = 'game of thrones & more';
    const apiResponse: TvMazeSearchResult[] = [
      {
        score: 12.3,
        show: {
          id: 42,
          name: 'Game of Thrones',
          rating: { average: 9.2 },
          image: { medium: 'medium.jpg', original: 'original.jpg' },
          summary: '<p>Epic <b>fantasy</b> drama.</p>'
        }
      }
    ];

    let mappedResult: unknown;
    service.searchShows(query).subscribe((shows) => {
      mappedResult = shows;
    });

    const request = httpMock.expectOne(
      'https://api.tvmaze.com/search/shows?q=game%20of%20thrones%20%26%20more'
    );
    expect(request.request.method).toBe('GET');
    request.flush(apiResponse);

    expect(mappedResult).toEqual([
      {
        id: 42,
        title: 'Game of Thrones',
        rating: 9.2,
        summary: 'Epic fantasy drama.',
        imageUrl: 'medium.jpg'
      }
    ]);
  });
});
