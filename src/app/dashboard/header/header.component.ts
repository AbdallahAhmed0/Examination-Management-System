import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/login/Services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService ) { }

  @Input()sidenav!:MatSidenav;

ngOnInit(): void {

}
@Output() toggleSidebar = new EventEmitter<void>();

  onToggleSidenav() {
    this.toggleSidebar.emit();
  }
  logout(){
    this.authService.logout();
  }
}
