import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Movie } from '../models/movie.model';
import { Observable, switchMap, tap } from 'rxjs';
import { TmdbService } from '../../../services/tmdb/tmdb.service';

export interface MovieState {
    id: string;
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};

@Injectable()
export class MovieStore extends ComponentStore<MovieState> {
    constructor(private _tmdbService: TmdbService) {
        super();
    }

    readonly initialPage$ = this.select(state => state.page);
    readonly movies$ = this.select(state => state.results);
    readonly currentPage$ = this.select(state => state.page);
    readonly totalPages$ = this.select(state => state.total_pages);

    readonly loadMovies = this.updater((state, { id, results, page, total_pages }: { id: string, results: Movie[], page: number, total_pages: number }) => {
        console.log('store loadMovies');
        localStorage.setItem('currentPage', page.toString());
        return {
            ...state,
            id: id,
            results: results,
            page: page,
            total_pages,
        };
    });  

    readonly nextPage = this.updater((state) => {
        console.log('store nextPage');
        const nextPage = state.page + 1;
        return nextPage <= state.total_pages ? { ...state, page: nextPage } : state;
    });

    readonly previousPage = this.updater((state) => {
        console.log('store previousPage');
        const previousPage = state.page - 1;
        return previousPage > 0 ? { ...state, page: previousPage } : state;
    });

    readonly loadPage = this.effect<number>((page$: Observable<number>) =>
        page$.pipe(
          switchMap((page: number) => 
            this._tmdbService.getMovies(page.toString()).pipe(
              tap((response: MovieState) => {
                console.log('store loadPage, then this loadMovies with new page',);
                this.loadMovies({
                  id: response.id,
                  results: response.results,
                  page: response.page,
                  total_pages: response.total_pages
                });
              })
            )
          )
        )
    );
}

