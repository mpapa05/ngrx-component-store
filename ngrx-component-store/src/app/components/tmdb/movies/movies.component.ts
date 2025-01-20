import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MovieState, MovieStore } from '../store/movie.store';
import { CommonModule } from '@angular/common';
import { Movie } from '../models/movie.model';
import { Observable } from 'rxjs';
import { MovieComponent } from '../movie/movie.component';

@Component({
  selector: 'app-movies',
  imports: [CommonModule, MovieComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MovieStore],
})
export class MoviesComponent implements OnInit{
  movies$: Observable<Movie[]> | undefined;
  currentPage$: Observable<number>;
  totalPages$: Observable<number>;
  constructor(
    private readonly _movieStore: MovieStore,
  ) { 
    this.movies$ = this._movieStore.movies$;
    this.currentPage$ = this._movieStore.currentPage$;
    this.totalPages$ = this._movieStore.totalPages$;
  }
  ngOnInit() {
    const uniqueId = 'movies-' + this.generateUniqueId();
    console.log('movies component uniqueId', uniqueId);
    this._movieStore.setState({
      id: uniqueId,
      page: localStorage.getItem('currentPage') ? parseInt(localStorage.getItem('currentPage') as string) : 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    });
    this._movieStore.loadPage(1);
  }

  private generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }

  next() {
    console.log('movies component next function');
    this._movieStore.nextPage();
    this._movieStore.loadPage(this.currentPage$);
  }

  previous() {
    this._movieStore.previousPage();
    this._movieStore.loadPage(this.currentPage$);
  }
}
