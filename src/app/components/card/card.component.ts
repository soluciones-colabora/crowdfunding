import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  // @Input() category = 'none';
  @Input() campaign = {
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

  random_url: string;

  constructor(private sanitizer: DomSanitizer) {
    // console.log('this.campaign :', this.campaign);
    // if (this.campaign.logo != 'assets/cancer.png') {
    //   this.random_number = Math.ceil(Math.random() * 10);
    //   this.random_url = `/${this.random_number}/`;
    // } else {
    //   this.random_url = "";
    // }
    this.randomCategory();
  }

  ngOnInit() {
  }

  // randomPhotoUrl(category: string) {
  //   switch (category) {
  //     case 'city':
  //     this.random_number = Math.ceil(Math.random() * 10);
  //     this.random_url = `/city/${this.random_number}/`;
  //       break;
  //     case 'poverty':
  //     this.random_number = Math.ceil(Math.random() * 10);
  //     this.random_url = `/food/${this.random_number}/`;
  //       break;
  //     case 'wildlife':
  //     this.random_number = Math.ceil(Math.random() * 10);
  //     this.random_url = `/animals/${this.random_number}/`;
  //       break;
  //     default:
  //     this.random_url = "";
  //       break;
  //   }
  // }

  randomCategory() {
   const number = Math.ceil(Math.random() * 5);
   const random_number = Math.ceil(Math.random() * 10);
   let category: string;
    switch (number) {
      case 1:
        category = 'city';
        break;
      case 2:
        category = 'food';
        break;
      case 3:
        category = 'people';
        break;
      case 4:
        category = 'nature';
        break;
      case 5:
        category = 'animals';
        break;
        default:
        category = 'animals';
        break;
    }
    this.random_url = `/${category}/${random_number}/`;
  }

}
