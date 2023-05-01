import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( ) { }

  @Input()sidenav!:MatSidenav;

ngOnInit(): void {

}
@Output() toggleSidebar = new EventEmitter<void>();

  onToggleSidenav() {
    this.toggleSidebar.emit();
  }

}
