import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { transitions } from './_animations/route.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    transitions
  ]
})
export class AppComponent {

  title = 'Pokesite';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
