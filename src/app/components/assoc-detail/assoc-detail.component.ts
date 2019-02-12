import { Component, AfterViewInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PaypalService } from '../../services/paypal/paypal.service';
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
  safeURL: SafeResourceUrl;
  navItem: number;
  team: [
    {
      nombre: 'Félix Ehuan',
      avatar: 'https://www.w3schools.com/howto/img_avatar1.png',
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
      avatar: 'https://www.w3schools.com/howto/img_avatar4.png',
      cargo: 'Dirección de proyectos',
      licenciatura: 'Lic. en Mercadotecnia'
    },
    {
      nombre: 'Alejandro Castillo',
      avatar: 'https://www.w3schools.com/howto/img_avatar4.png',
      cargo: 'Dirección de proyectos',
      licenciatura: 'Lic. en Ingeniería Mecatrónica'
    },
    {
      nombre: 'Félix Ehuan',
      avatar: 'https://www.w3schools.com/howto/img_avatar1.png',
      cargo: 'Dirección de proyectos',
      licenciatura: 'Lic. en Ingeniería Física'
    },
    {
      nombre: 'Félix Ehuan',
      avatar: 'https://www.w3schools.com/howto/img_avatar1.png',
      cargo: 'Dirección de proyectos',
      licenciatura: 'Lic. en Ingeniería Física'
    }
  ]
  constructor(private _sanitizer: DomSanitizer, private renderer: Renderer2,
    paypalS: PaypalService) {
    this.navItem = 0;
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/O3cBZ5X-eGw');
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

  // public onIntersection({ target, visible }: { target: Element; visible: boolean }): void {
  //   this.renderer.addClass(target, visible ? 'active' : 'inactive');
  //   this.renderer.removeClass(target, visible ? 'inactive' : 'active');
  //   console.log(visible);
  // }

  public onIntersection({ target, visible }: { target: Element; visible: boolean }): void {
    // this.renderer.addClass(target, visible ? 'active' : 'inactive');
    // this.renderer.removeClass(target, visible ? 'inactive' : 'active');
    console.log(target.id);
    // switch (target.id) {
    //   case 'resumen':
    //   console.log(this.resumen_li);
    //   this.disable_li(this.resumen_li);
    //   // this.renderer.addClass(this.resumen_li.nativeElement,'active');
    //     break;
    //   case 'beneficiarios':
    //   this.disable_li(this.beneficiarios_li);
    //   // this.renderer.addClass(this.beneficiarios_li.nativeElement, visible ? 'active' : 'inactive');
    //     break;
    //   case 'valor':
    //   this.disable_li(this.valor_li);
    //   // this.renderer.addClass(this.valor_li.nativeElement, visible ? 'active' : 'inactive');
    //     break;
    //   case 'equipo':
    //   this.disable_li(this.equipo_li);
    //   // this.renderer.addClass(this.equipo_li.nativeElement, visible ? 'active' : 'inactive');
    //   // this.renderer.removeClass(this.equipo_li.nativeElement, visible ? 'inactive' : 'active');
    //     break;
    //   case 'galeria':
    //   this.disable_li(this.galeria_li);
    //   // this.renderer.addClass(this.galeria_li.nativeElement, visible ? 'active' : 'inactive');
    //   // this.renderer.removeClass(this.galeria_li.nativeElement, visible ? 'inactive' : 'active');
    //     break;
    //   default:
    //     break;
    // }
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
