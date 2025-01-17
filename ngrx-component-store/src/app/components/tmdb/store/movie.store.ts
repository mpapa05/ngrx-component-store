import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Movie } from '../models/movie.model';

export interface MovieState {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};

const defaultState: MovieState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
};

@Injectable()
export class MovieStore extends ComponentStore<MovieState> {
    constructor() {
        super(defaultState);
    }

    readonly movies$ = this.select(state => state.results);

    readonly loadMovies = this.updater((state, movies: Movie[]) => {
        return {
            ...state,
            results: movies
        };
    });    

}

