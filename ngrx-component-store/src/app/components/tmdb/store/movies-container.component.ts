import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../../services/tmdb/tmdb.service';
import { MovieState, MovieStore } from './movie.store';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from '../movies/movies.component';
import { Movie } from '../models/movie.model';

@Component({
    selector: 'component-store-movies-container',
    imports: [CommonModule, MoviesComponent],
    templateUrl: './movies-container.component.html',
    styleUrl: './movies-container.component.scss',
    providers: [MovieStore],
})

export class MoviesContainerComponent implements OnInit {
    constructor(
        private _tmdbService: TmdbService, 
        private _movieStore: MovieStore
    ) { }

    ngOnInit() {
        this._tmdbService.getMovies().subscribe({
            next: (movieState: MovieState) => {
                const movies = movieState.results;
                this._movieStore.loadMovies(movies);
                console.log(movies);
            },
            error: (error: any) => {
                console.log(error);
            }
        });
    }
}