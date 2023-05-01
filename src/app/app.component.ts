import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Examination-Management-System';


  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;




  constructor(private observer:BreakpointObserver,
              private cd:ChangeDetectorRef,
              private route: ActivatedRoute){}

  ngOnInit(): void {
  }

  // check router contain login or not
  public isLogin(): boolean {
    let hasLoginSegment = false;
    this.route.url.pipe(take(1)).subscribe(urlSegments => {
      hasLoginSegment = urlSegments.some(segment => segment.path === 'login');
    });
    return !hasLoginSegment;
    }

  ngAfterViewInit() {

  // check if user login or not to show dashboard
  if(!this.isLogin()){
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



