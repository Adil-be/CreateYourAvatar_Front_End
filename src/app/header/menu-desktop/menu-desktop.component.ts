import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu-desktop',
  templateUrl: './menu-desktop.component.html',
  styleUrls: ['./menu-desktop.component.css']
})
export class MenuDesktopComponent {

  @Output() displayMenu = new EventEmitter<boolean>();
  displayMenuMobile(){
    this.displayMenu.emit(true)
  }

}
