import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/authentication/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject} from 'rxjs/Subject';

import * as faker from 'faker';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  public loading = true;
  public user;

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
  }

  ngOnInit() {
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
