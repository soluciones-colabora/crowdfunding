import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/authentication/auth.service';
import { takeUntil, filter } from 'rxjs/operators';
import { Subject} from 'rxjs/Subject';

import * as faker from 'faker';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer: any;
  private ngUnsubscribe = new Subject();
  public loading = true;
  public user;
  opened = false;
  navStart: Observable<NavigationStart>;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor (
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    private router: Router
  ) {
    console.log('faker :', faker);
    this.navStart = this.router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>;
   
  }

  ngOnInit() {
    this.navStart.subscribe(() => {
      this.opened = !this.opened;
      if (this.opened == true) {
        this.opened = false;
      }
      console.log(this.opened);
      
    });
    this.authService.user.pipe(takeUntil(this.ngUnsubscribe)).subscribe((user) => {
      this.loading = false;
      this.user = user;
      if (this.user) {
        // Display photo of user depending on its role...
        if (!this.user.photoURL && this.user.logo) {
          this.user.photoURL =  this.user.logo;
        } else if (!this.user.photoURL) {
          this.user.photoURL = 'https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg';
        }
      }

      // if (!user && this.router.url !== '/login') { this.router.navigate(['/index']); }
      // if (!user) { this.router.navigate(['/index']); }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
