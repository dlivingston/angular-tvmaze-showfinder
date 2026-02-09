# Project Context: Angular TVMaze Show Finder

## Overview

This project is a small Angular application built to demonstrate modern
Angular architecture, RxJS-based data flow, and clean UI state
management.

The app allows users to search for TV shows using the public TVMaze API
and view results in a responsive card-based layout.

The scope is intentionally modest and focused on code quality,
structure, and reactive patterns rather than feature complexity.

------------------------------------------------------------------------

## Goals

-   Demonstrate modern Angular (standalone) component architecture
-   Use RxJS streams for data flow and state management
-   Implement clear UI states:
    -   Loading
    -   Empty results
    -   Error
-   Produce clean, idiomatic, and maintainable TypeScript/Angular code
-   Deliver a small, polished, portfolio-quality project

------------------------------------------------------------------------

## Core Features

1.  Search input
    -   Text-based search for TV shows
    -   Debounced input using RxJS
2.  Results display
    -   Responsive grid of show cards
    -   Each card includes:
        -   Poster image (with fallback)
        -   Show title
        -   Rating (if available)
        -   Short summary
3.  UI states
    -   Loading indicator while searching
    -   Empty state when no results are found
    -   Error state for failed requests

------------------------------------------------------------------------

## Technical Constraints

-   Angular standalone components (no NgModules)
-   Client-side rendering only (no SSR or SSG)
-   Keep scope within \~45--120 minutes of development
-   Avoid over-engineering (no routing, global state libraries, etc.)

------------------------------------------------------------------------

## Architecture

Planned folder structure:

src/app/ core/ services/ tvmaze.service.ts

features/ search/ search.component.ts show-card/ show-card.component.ts

shared/ (optional reusable UI components or utilities)

### Responsibilities

SearchComponent - Smart/container component - Handles search input -
Manages RxJS streams - Exposes a view model (vm\$) to the template

ShowCardComponent - Presentational component - Displays show
information - No business logic

TvMazeService - Handles API requests - Transforms raw API responses into
app-friendly models

------------------------------------------------------------------------

## RxJS Data Flow (High-Level)

search input ↓ FormControl.valueChanges ↓ debounceTime ↓
distinctUntilChanged ↓ switchMap (API request) ↓ map to view model ↓
vm\$ observable (used in template with async pipe)

------------------------------------------------------------------------

## API

TVMaze search endpoint: https://api.tvmaze.com/search/shows?q={query}

Response includes: - Show name - Poster image - Rating - Summary (HTML)

The service should: - Strip HTML from summaries - Provide fallback
images - Handle missing ratings safely

------------------------------------------------------------------------

## Code Quality Expectations

-   Clear component boundaries
-   Readable, idiomatic TypeScript
-   Proper RxJS operator usage
-   Avoid manual subscriptions when possible
-   Use async pipe in templates
-   Remove dead code and console logs
-   Provide a simple README with run instructions

------------------------------------------------------------------------

## Non-Goals (Out of Scope)

-   Routing
-   Authentication
-   Pagination
-   Global state libraries (NgRx, etc.)
-   Complex styling systems
-   Backend services

------------------------------------------------------------------------

## How to Run

npm install npm start

Then open: http://localhost:4200

------------------------------------------------------------------------

## Purpose

This project is intended to: - Demonstrate frontend architecture and
reactive patterns - Serve as a take-home assessment - Function as a
reusable portfolio sample
