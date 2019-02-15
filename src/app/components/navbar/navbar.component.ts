import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() user: any;
  @Input() drawer: any;

  profile_drawer = true;


  constructor(public authService: AuthService, private router: Router) {
    console.log('user :', this.user);
   }

  ngOnInit() {
  }

  async logOut() {
    await this.authService.signOut();
    this.drawer.toggle();
  }

}
