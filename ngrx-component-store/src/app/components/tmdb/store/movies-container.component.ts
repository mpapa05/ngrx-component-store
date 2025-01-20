import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../../services/tmdb/tmdb.service';
import { MovieState, MovieStore } from './movie.store';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from '../movies/movies.component';
import { Movie } from '../models/movie.model';
import { map } from 'rxjs';

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
        public _movieStore: MovieStore
    ) { }

    ngOnInit() {
        
    }
}