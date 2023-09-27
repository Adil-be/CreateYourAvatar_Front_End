import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class PaginatorIntlService extends MatPaginatorIntl {
  override getRangeLabel = (page: number, pageSize: number, lenght: number) => {
    return `Page ${page + 1} of ${Math.ceil(lenght / pageSize)}`;
  };
}
