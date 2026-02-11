import { mapTvMazeSearchResultToShow, stripHtml } from './tvmaze.mapper';
import { TvMazeSearchResult } from './tvmaze.types';

describe('tvmaze.mapper', () => {
  it('maps a search result into a Show model', () => {
    const result: TvMazeSearchResult = {
      score: 10,
      show: {
        id: 1,
        name: 'The Example Show',
        rating: { average: 8.3 },
        image: { medium: 'medium.jpg', original: 'original.jpg' },
        summary: '<p>Hello <b>world</b></p>'
      }
    };

    const mapped = mapTvMazeSearchResultToShow(result, 'fallback.jpg');

    expect(mapped).toEqual({
      id: 1,
      title: 'The Example Show',
      rating: 8.3,
      summary: 'Hello world',
      imageUrl: 'medium.jpg'
    });
  });

  it('uses fallback values for missing image, rating, and summary', () => {
    const result: TvMazeSearchResult = {
      score: 5,
      show: {
        id: 2,
        name: 'No Data Show',
        rating: null,
        image: null,
        summary: null
      }
    };

    const mapped = mapTvMazeSearchResultToShow(result, 'fallback.jpg');

    expect(mapped).toEqual({
      id: 2,
      title: 'No Data Show',
      rating: null,
      summary: '',
      imageUrl: 'fallback.jpg'
    });
  });

  it('strips html safely', () => {
    expect(stripHtml('<div>Alpha <em>Beta</em></div>')).toBe('Alpha Beta');
    expect(stripHtml(null)).toBe('');
  });
});
