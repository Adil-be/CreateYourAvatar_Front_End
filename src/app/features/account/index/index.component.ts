import { Component, ViewChild } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent {
  opened: boolean = false;

  // @ViewChild(MatSidenavContainer) sidenavContainer: MatSidenavContainer;

  // ngAfterViewInit() {
  //   this.sidenavContainer.scrollable.elementScrolled().subscribe(() => /* react to scrolling */);
  // }
}
