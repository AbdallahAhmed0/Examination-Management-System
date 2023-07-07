import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { StorageServiceService } from './login/Services/storage-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Examination-Management-System';


  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;


isLogin:boolean = false;

  constructor(private observer:BreakpointObserver,
              private cd:ChangeDetectorRef,
              private route: ActivatedRoute,
              private storageService:StorageServiceService){}

  ngOnInit(): void {
    this.storageService.loggedIn$.subscribe((isLoggedIn: boolean) => {
      // Handle the login status change
      this.isLogin =isLoggedIn;
    });
    this.storageService.startExpirationTimer()

  }

  ngAfterViewInit() {
  // check if user login or not to show dashboard
  if(this.isLogin){
      this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode='over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
      this.cd.detectChanges();
  }

  }



}



