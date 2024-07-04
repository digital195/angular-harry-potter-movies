import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'budget',
  standalone: true,
})
export class BudgetPipe implements PipeTransform {
  transform(budget: string): string {
    return `$${budget} million`;
  }
}
