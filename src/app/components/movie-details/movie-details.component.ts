import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MovieListItemComponent } from '../movie-list-item/movie-list-item.component';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { DurationPipe } from '../../pipes/duration.pipe';
import { JoinPipe } from '../../pipes/join.pipe';
import { BudgetPipe } from '../../pipes/budget.pipe';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    AsyncPipe,
    MovieListItemComponent,
    NgForOf,
    RouterLink,
    NgIf,
    DurationPipe,
    JoinPipe,
    BudgetPipe,
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailsComponent {
  private readonly movieService = inject(MovieService);

  movieId = input.required<string>();

  protected readonly movie$ = toObservable(this.movieId).pipe(
    switchMap((movieId) => this.movieService.getMovie$(movieId)),
  );
}
