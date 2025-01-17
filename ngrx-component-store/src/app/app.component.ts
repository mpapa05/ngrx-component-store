import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { MoviesContainerComponent } from './components/tmdb/store/movies-container.component';

@Component({
  selector: 'app-root',
  imports: [
    MoviesContainerComponent, 
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ngrx-component-store';
}
