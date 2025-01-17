import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MovieState, MovieStore } from '../store/movie.store';
import { CommonModule } from '@angular/common';
import { Movie } from '../models/movie.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies',
  imports: [CommonModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesComponent implements OnInit{
  movies$: Observable<Movie[]> | undefined;
  constructor(
    private readonly _movieStore: MovieStore,
  ) { 
    this.movies$ = this._movieStore.movies$;

  }
  ngOnInit() {
    this.movies$ = this._movieStore.movies$;
  }
}
