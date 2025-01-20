import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieState } from '../../components/tmdb/store/movie.store';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private baseUrl = 'https://api.themoviedb.org/3';
  private bearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNThiNDEwNjYyZjA2YmJjZWVlNDk5ZGViZGY3OTA5NyIsIm5iZiI6MTY0ODIwMjY5MS4zOTYsInN1YiI6IjYyM2Q5M2MzZDM5OWU2MDA1Y2E5ZDBkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nz28rXZVlS9xZ43T5j0hcHoanM8DjjwheSc_P4sShkg';

  constructor(private http: HttpClient) { }

  getMovies(page: string = '1'): Observable<MovieState> {
    // let pageNumber = page ? page : '1';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.bearerToken}`,
      'Accept': 'application/json'
    });
    return this.http.get<MovieState>(`${this.baseUrl}/discover/movie?page=${page}`, { headers });
  }

  getTVShows(): Observable<MovieState> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.bearerToken}`,
      'Accept': 'application/json'
    });
    return this.http.get<MovieState>(`${this.baseUrl}/discover/tv`, { headers });
  }
}