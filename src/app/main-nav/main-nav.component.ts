import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/authentication/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject} from 'rxjs/Subject';


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
  ) { }

  ngOnInit() {
    this.authService.user.pipe(takeUntil(this.ngUnsubscribe)).subscribe((user) => {
      this.loading = false;
      this.user = user;
      console.log('user :', user);
      // if (!user && this.router.url !== '/login') { this.router.navigate(['/index']); }
      // if (!user) { this.router.navigate(['/index']); }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
