import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/login/Services/auth.service';
import { StorageServiceService } from 'src/app/login/Services/storage-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private storageService:StorageServiceService,
              private authService:AuthService ) { }

  @Input()sidenav!:MatSidenav;

ngOnInit(): void {

}
@Output() toggleSidebar = new EventEmitter<void>();

  onToggleSidenav() {
    this.toggleSidebar.emit();
  }
  logout(){
    const token = this.storageService.getToken();
    this.authService.logout();
  }
}
