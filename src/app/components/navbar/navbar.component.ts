import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() user: any;
  profile_drawer = true;


  constructor(public authService: AuthService) {
    console.log('user :', this.user);
   }

  ngOnInit() {
  }

}
