import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { FieldService } from '../../services/formFields/register-donor.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ FieldService ]
})
export class HomeComponent implements OnInit {
  slides = [
    {img: 'assets/canaco_gris.png'},
    {img: 'assets/coparmex_gris.png'},
    {img: 'assets/ieym_gris.png'},
    {img: 'assets/nacional_gris.png'},
    {img: 'assets/sefoe_gris.png'},
    {img: 'assets/siies_gris.png'},
    {img: 'assets/tec_gris.png'},
  ];
  odsFields: any[];
  constructor(fieldservice: FieldService) { 
    this.odsFields = fieldservice.getSecondFormFields();

  }

  ngOnInit() {
  }

}
