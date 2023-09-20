import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, lengh: number): unknown {
    return value.length > lengh ? `${value.slice(0, lengh - 3)} ...` : value;
  }
}
