import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movie',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent {
  @Input() movie!: Movie;
  constructor() { }

}
