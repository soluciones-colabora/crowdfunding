import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { FieldService } from '../../services/formFields/register-donor.service';
import { ProjectService } from '../../services/database/Project/project.service';
import { Observable, of } from 'rxjs';

interface Project {
  title?: string;
  description?: string;

  timeRemaining?: number;
  goal?: number;
  amountcollected?: number;
  percentage?: number;
  numberdonors?: number;
  rating?: number;

  uid?:          any;
  createdOn?:    Date;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ FieldService ]
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('inicio') inicio: ElementRef;
  @ViewChild('apoya') apoya: ElementRef;
  @ViewChild('campaign') campaign: ElementRef;
  @ViewChild('carousel') carousel: ElementRef;
  slides = [
    {img: 'assets/banner/aspy_gris.png'},
    {img: 'assets/banner/cce_gris.png'},
    {img: 'assets/banner/cemefi_gris.png'},
    {img: 'assets/banner/comey_gris.png'},
    {img: 'assets/banner/comunalia_gris.png'},
    {img: 'assets/banner/fechac_gris.png'},
    {img: 'assets/banner/gobierno_gris.png'},
    {img: 'assets/banner/inegi_gris.png'},
    {img: 'assets/banner/junta_gris.png'},
    {img: 'assets/banner/merida_gris.png'},
    {img: 'assets/banner/segey_gris.png'},
    {img: 'assets/banner/sgg_gris.png'},
  ];
  odsFields: any[];
  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;
  projects$: Observable<Project[]>;
  constructor(fieldservice: FieldService,private renderer: Renderer2, projectService: ProjectService) { 
    this.odsFields = fieldservice.getSecondFormFields();
    this.projects$ = projectService.getData();
  }



  ngOnInit() {
        this.myStyle = {
          'width': '100%',
          'height': '100%',
          'z-index': 12
      };
    this.myParams = {
          particles: {
              number: {
                  value: 80,
              },
              color: {
                  value: '#fff'
              },
              shape: {
                  type: 'circle',
              },
      }
    };
  }

  ngOnDestroy() {
    // Inicio
    // this.renderer.removeClass(this.inicio.nativeElement, 'fadeInLeft');
    // this.renderer.addClass(this.inicio.nativeElement, 'fadeOutLeft');
    // setTimeout(() => {
    //   this.renderer.removeClass(this.apoya.nativeElement, 'fadeInRight');
    //   this.renderer.addClass(this.apoya.nativeElement, 'fadeOutRight');
      
    // }, 600);
    // // Apoya
    // // Campañas
    // this.renderer.removeClass(this.campaign.nativeElement, 'fadeInUp');
    // this.renderer.addClass(this.campaign.nativeElement, 'fadeOutUp');
    // // Carousel
    // this.renderer.removeClass(this.carousel.nativeElement, 'fadeIn');
    // this.renderer.addClass(this.carousel.nativeElement, 'fadeOut');
    // // this.renderer.removeClass(this.apoya.nativeElement, 'fadeIn');
    // // this.renderer.addClass(this.apoya.nativeElement, 'fadeOut');
    
  }
}



