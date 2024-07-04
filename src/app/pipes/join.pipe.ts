import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join',
  standalone: true,
})
export class JoinPipe implements PipeTransform {
  transform(values: string[], separator?: string | undefined): string {
    return values.join(separator);
  }
}
