import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  styleUrls: ['./menu-mobile.component.css']
})
export class MenuMobileComponent {

  @Output() hideMenu = new EventEmitter<boolean>();
  hideMenuMobile(){
    this.hideMenu.emit(false);
  }
}
