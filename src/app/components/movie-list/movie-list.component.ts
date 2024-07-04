import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieListItemComponent } from '../movie-list-item/movie-list-item.component';
import { AsyncPipe, NgForOf } from '@angular/common';
import { combineLatest, map, Observable, shareReplay, startWith } from 'rxjs';
import { MovieList } from '../../models/movie-list';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MovieListItemComponent, AsyncPipe, NgForOf, ReactiveFormsModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent {
  private readonly movieService = inject(MovieService);

  private readonly movies$ = this.movieService
    .getMovies$()
    .pipe(shareReplay({ refCount: true, bufferSize: 1 }));

  protected readonly filterForm: FormGroup<{
    title: FormControl<string | null>;
    releaseYear: FormControl<number | null>;
  }> = new FormGroup({
    title: new FormControl<string | null>(null),
    releaseYear: new FormControl<number | null>(null),
  });

  protected readonly filteredMovies$: Observable<MovieList[]> = combineLatest([
    this.movies$,
    this.filterForm.valueChanges.pipe(startWith(this.filterForm.value)),
  ]).pipe(
    map(([movies, filter]) => {
      if (!filter.title && !filter.releaseYear) {
        return movies;
      }

      const filterTitle = (filter.title ?? '').toLowerCase();
      const filterReleaseYear = (
        filter.releaseYear ? filter.releaseYear.toString() + '' : ''
      ).toLowerCase();

      return movies.filter((movie) => {
        const title = movie.title.toLowerCase();
        const releaseYear = movie.release_date.toLowerCase().slice(0, 4);

        return (
          ((title && title.includes(filterTitle)) || !title) &&
          ((filterReleaseYear && releaseYear.includes(filterReleaseYear)) || !filterReleaseYear)
        );
      });
    }),
  );
}
