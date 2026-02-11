# Angular TVMaze Show Finder

Small Angular application for searching TV shows via the public TVMaze API.
The project is intentionally focused on clean architecture, reactive data flow with RxJS, and clear UI states.

## Features

- Debounced show search input
- Responsive results grid
- Show cards with poster, title, rating, and summary
- Explicit UI states:
  - Loading
  - Empty results
  - Error
- Fallback handling for missing poster/rating/summary data

## Stack

- Angular 21 (standalone components)
- RxJS
- SCSS
- Vitest via Angular test tooling

## Run locally

```bash
npm install
npm start
```

App runs at `http://localhost:4200`.

## Scripts

- `npm start` - start development server
- `npm run build` - create production build
- `npm run watch` - development build in watch mode
- `npm test` - run unit tests

## Architecture

```text
src/app/
  core/
    models/
      show.model.ts
    services/
      tvmaze.service.ts
      tvmaze.types.ts
      tvmaze.mapper.ts
  features/
    search/
      search.component.ts
    show-card/
      show-card.component.ts
```

### Component responsibilities

- `SearchComponent`: container component; owns input stream and state transitions.
- `ShowCardComponent`: presentational component; renders normalized show data only.
- `TvMazeService`: API boundary; fetches TVMaze data and returns app-domain models.

## Data flow

`FormControl.valueChanges` -> `trim` -> `debounceTime` -> `distinctUntilChanged` -> `switchMap` -> `vm$` rendered with `AsyncPipe`.

## Data boundary notes

- External API types are isolated in `tvmaze.types.ts`.
- App-facing domain model is defined in `show.model.ts`.
- Mapping and normalization are centralized in `tvmaze.mapper.ts`.
- Components consume only normalized `Show` models.

## Testing

Current tests cover:

- Mapper normalization logic (`tvmaze.mapper.spec.ts`)
- Search state transitions and debounce behavior (`search.component.spec.ts`)
- Root app render smoke checks (`app.spec.ts`)

Run tests with:

```bash
npm test
```

## Scope and non-goals

Out of scope for this project:

- Routing
- Authentication
- Pagination
- Global state libraries (NgRx, etc.)
- Backend services
