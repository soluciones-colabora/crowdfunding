import { Component, AfterViewInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PaypalService } from '../../services/paypal/paypal.service';
import { Router, ActivatedRoute } from '@angular/router';

import { CampaignService } from '../../services/database/Campaign/campaign.service';
import { Campaign } from '../../interfaces/campaign.interface';
import { Observable } from 'rxjs';

import { map, take, tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-assoc-detail',
  templateUrl: './assoc-detail.component.html',
  styleUrls: ['./assoc-detail.component.scss']
})
export class AssocDetailComponent implements AfterViewInit {
  @ViewChild('resumen_li') resumen_li: ElementRef;
  @ViewChild('beneficiarios_li') beneficiarios_li: ElementRef;
  @ViewChild('valor_li') valor_li: ElementRef;
  @ViewChild('equipo_li') equipo_li: ElementRef;
  @ViewChild('galeria_li') galeria_li: ElementRef;
  @ViewChild('paypal') paypal: ElementRef;
  visible_flag: boolean = false;
  safeURL: SafeResourceUrl;
  navItem: number;
  team = [
    {
      nombre: 'Félix Ehuan',
      avatar: 'https://www.w3schools.com/howto/img_avatar.png',
      cargo: 'Dirección de proyectos',
      licenciatura: 'Lic. en Ingeniería Física'
    },
    {
      nombre: 'Mariana Pérez',
      avatar: 'https://www.w3schools.com/howto/img_avatar2.png',
      cargo: 'Dirección de proyectos',
      licenciatura: 'Lic. en Diseño Gráfico'
    },
    {
      nombre: 'Gabriela Alzina',
      avatar: 'https://www.w3schools.com/w3images/avatar2.png',
      cargo: 'Dirección de proyectos',
      licenciatura: 'Lic. en Mercadotecnia'
    },
    {
      nombre: 'Alejandro Castillo',
      avatar: 'https://www.w3schools.com/w3images/avatar6.png',
      cargo: 'Dirección de proyectos',
      licenciatura: 'Lic. en Ingeniería Mecatrónica'
    },
    {
      nombre: 'Félix Ehuan',
      avatar: 'https://www.w3schools.com/w3images/avatar5.png',
      cargo: 'Dirección de proyectos',
      licenciatura: 'Lic. en Ingeniería Física'
    }
  ];
  slides = [
    {img: 'assets/canaco_gris.png'},
    {img: 'assets/coparmex_gris.png'},
    {img: 'assets/ieym_gris.png'},
    {img: 'assets/nacional_gris.png'},
    {img: 'assets/sefoe_gris.png'},
    {img: 'assets/siies_gris.png'},
    {img: 'assets/tec_gris.png'},
  ];
  campaign$: Observable<Campaign>;
  timeRemaining: string;

  constructor(
    private _sanitizer: DomSanitizer,
    private renderer: Renderer2,
    paypalS: PaypalService,
    private activatedRoute: ActivatedRoute,
    public campaignSrvc: CampaignService
    ) {
    this.navItem = 0;
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/O3cBZ5X-eGw');
    this.activatedRoute.params.subscribe(params => {
      if ( params['id'] ) {
        this.campaign$ = this.campaignSrvc.getCampaign(params['id']).valueChanges();
        // .pipe(
        //   take(1),
        //   tap(campaign => {
        //     this.timeRemaining = this.campaignSrvc.getTimeRemaining(campaign);
        //     console.log('this.timeRemaining :', this.timeRemaining);

        //   })
        // );
      }
    });
  }

  ngAfterViewInit() { }

  public navigate (index: number) {
    this.navItem = index;
    console.log('this.navItem :', this.navItem);
  }

  scrollToElement($element): void {
    console.log($element.id);
    // $element.scrollIntoView();
    $element.scrollIntoView({behavior: "smooth", block: "start"});
    // $element.scrollTop = 0;
    // let myDiv = document.getElementById($element.id);

      // myDiv.scrollTop = 0;
  }

  tooglePaypal() {
    if (this.visible_flag) { // visible
      this.renderer.removeClass(this.paypal.nativeElement, 'fadeInUp');
      this.renderer.addClass(this.paypal.nativeElement, 'fadeOutDown');
      setTimeout(() => {
        this.renderer.removeClass(this.paypal.nativeElement, 'visible');
      }, 600);
    } else { // no visible
      this.renderer.removeClass(this.paypal.nativeElement, 'fadeOutDown');
      this.renderer.addClass(this.paypal.nativeElement, 'visible');
        this.renderer.addClass(this.paypal.nativeElement, 'fadeInUp');
    }
    this.visible_flag = !this.visible_flag;
  }
  public onIntersection({ target, visible }: { target: Element; visible: boolean }): void {
    console.log(target.id);
  }

   private disable_li(element:ElementRef) {
      this.renderer.removeClass(this.resumen_li.nativeElement, 'active');
      this.renderer.removeClass(this.beneficiarios_li.nativeElement, 'active');
      this.renderer.removeClass(this.valor_li.nativeElement, 'active');
      this.renderer.removeClass(this.equipo_li.nativeElement, 'active');
      this.renderer.removeClass(this.galeria_li.nativeElement, 'active');
      this.renderer.addClass(element.nativeElement,'active');

  }

}
