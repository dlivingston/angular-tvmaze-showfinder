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

## Disclaimer

This project is only intended to meet the requirements specified. No warranties, either express or implied, are hereby given. All information is supplied as is, without guarantee. The user assumes all responsibility for damages resulting from the use of this application, including (but not limited to) frustration, disgust, headaches, nausea, indigestion, system abends, disk head-crashes, general malfeasance, floods, fires, shark attack, nerve gas, locust infestation, cyclones, hurricanes, tsunamis, local electromagnetic disruptions, hydraulic brake system failure, invasion, low sperm count, hashing collisions, abnormal wear and tear of friction surfaces, cosmic radiation, inadvertent destruction of sensitive electronic components, amoebic dysentery, windstorms, the Riders of Nazgul, decreased resale value on your home, infuriated chickens, malfunctioning mechanical or electrical devices, premature activation of the distant early warning system, peasant uprisings, halitosis, artillery bombardment, explosions, cave-ins, and/or frogs falling from the sky. 
