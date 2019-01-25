import { Component, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ScrollSpyService } from 'ngx-scrollspy';
@Component({
  selector: 'app-assoc-detail',
  templateUrl: './assoc-detail.component.html',
  styleUrls: ['./assoc-detail.component.scss']
})
export class AssocDetailComponent implements AfterViewInit {

  safeURL: SafeResourceUrl;
  navItem: number;

  constructor(private _sanitizer: DomSanitizer, private scrollSpyService: ScrollSpyService) {
    this.navItem = 0;
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/O3cBZ5X-eGw');
  }

  ngAfterViewInit() {
    this.scrollSpyService.getObservable('equipo').subscribe((e: any) => {
        console.log('ScrollSpy::equipo: ', e);
    });
}

  public navigate (index: number) {
    this.navItem = index;
    console.log('this.navItem :', this.navItem);
  }
  
  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    // $element.parentNode.scrollTop = $element.offsetTop;
  }
}
