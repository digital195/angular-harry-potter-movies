import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MovieList } from '../../models/movie-list';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { DurationPipe } from '../../pipes/duration.pipe';
import { RouterLink } from '@angular/router';
import { BudgetPipe } from '../../pipes/budget.pipe';

@Component({
  selector: 'app-movie-list-item',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, DurationPipe, RouterLink, BudgetPipe],
  templateUrl: './movie-list-item.component.html',
  styleUrl: './movie-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListItemComponent {
  movie = input.required<MovieList>();
}
