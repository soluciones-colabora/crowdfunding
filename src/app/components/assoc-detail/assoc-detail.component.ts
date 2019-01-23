import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-assoc-detail',
  templateUrl: './assoc-detail.component.html',
  styleUrls: ['./assoc-detail.component.scss']
})
export class AssocDetailComponent implements OnInit {

  safeURL: SafeResourceUrl;
  navItem: number;

  constructor(private _sanitizer: DomSanitizer) {
    this.navItem = 0;
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/O3cBZ5X-eGw');
  }

  ngOnInit() {
  }

  public navigate (index: number) {
    this.navItem = index;
    console.log('this.navItem :', this.navItem);
  }

}
