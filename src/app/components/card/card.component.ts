import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { url } from 'inspector';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() project = {
    title: 'Una vida digna con oportunidades',
    description: `Adquisición de una camioneta para transportar a los niños a las escuelas,
    poder recoger donaciones que nos otorgan.Lorem ipsum dolor sit amet`,
    logo: 'assets/cancer.png',
    timeRemaining: 10,
    goal: 2500,
    amountcollected: 1875,
    percentage: 20,
    numberdonors: 50
  };


  constructor(private sanitizer: DomSanitizer) {
    console.log('this.project :', this.project);
  }

  ngOnInit() {
  }

}
