import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inSale',
})
export class InSalePipe implements PipeTransform {
  transform(value: boolean): unknown {
    return value ? 'in Sale' : 'not on sale';
  }
}
