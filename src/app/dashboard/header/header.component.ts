import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/login/Services/auth.service';
import { StorageService } from 'src/app/login/Services/storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName:string='';
  constructor(private authService:AuthService,
              private storageService:StorageService) { }

  @Input()sidenav!:MatSidenav;

ngOnInit(): void {
  this.userName = this.storageService.getUser().username;
}
@Output() toggleSidebar = new EventEmitter<void>();

  onToggleSidenav() {
    this.toggleSidebar.emit();
  }
  logout(){
    this.authService.logout();
  }
}
