import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieList } from '../models/movie-list';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly httpClient = inject(HttpClient);

  getMovies$(): Observable<MovieList[]> {
    return this.httpClient.get<MovieList[]>('/movies');
  }

  getMovie$(movieId: string): Observable<Movie> {
    return this.httpClient.get<Movie>(`/movies/${movieId}`);
  }
}
