import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
        { title: 'Clientes', cols: 2, rows: 1, imgUrl: '../../../assets/images/clients.png', subtitle: 'Vea, cree, edite y elimine los clientes actuales de la empresa. Además, cree nuevas solicitudes y vea los estados actuales de cada una', url: '/clients' },
        { title: 'Bancos', cols: 2, rows: 1, imgUrl: '../../../assets/images/2.png', subtitle: 'Listado de bancos activos', url: '' },
        { title: 'Entidades', cols: 2, rows: 1, imgUrl: '../../../assets/images/4.png', subtitle: 'Administre la lista de entidades activas', url: '' },
        { title: 'Actividades', cols: 2, rows: 1, imgUrl: '../../../assets/images/3.png', subtitle: 'Gestione la lista de activides', url: '' },
        { title: 'Relaciones', cols: 2, rows: 1, imgUrl: '../../../assets/images/clients.png', subtitle: 'Establezca las relaciones correspondientes entre los distintos actores', url: '' }
        ];
      }

      return [
        { title: 'Clientes', cols: 2, rows: 1, imgUrl: '../../../assets/images/clients.png', subtitle: 'Vea, cree, edite y elimine los clientes actuales de la empresa. Además, cree nuevas solicitudes y vea los estados actuales de cada una', url: '/clients' },
        { title: 'Bancos', cols: 1, rows: 1, imgUrl: '../../../assets/images/2.png', subtitle: 'Listado de bancos activos', url: '' },
        { title: 'Entidades', cols: 1, rows: 2, imgUrl: '../../../assets/images/4.png', subtitle: 'Administre la lista de entidades activas', url: '' },
        { title: 'Actividades', cols: 1, rows: 1, imgUrl: '../../../assets/images/3.png', subtitle: 'Gestione la lista de activides', url: '' },
        { title: 'Relaciones', cols: 2, rows: 1, imgUrl: '../../../assets/images/clients.png', subtitle: 'Establezca las relaciones correspondientes entre los distintos actores', url: '' }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router) {}

  navigateTo( url: string ): void {

    if(!url) {
      return;
    }

    // this.router.navigateByUrl(url);

  }
}
