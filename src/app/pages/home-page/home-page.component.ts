import { Component, OnInit, HostListener } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  
  title = 'pokemon';
  config: any;
  fullpage_api: any;
  hash: any;

  @HostListener('window:hashchange', ['$event'])
  hashChangeHandler(e) {
    this.hash = window.location.hash
    console.log(window.location.hash);

    if (this.hash == "#top") {
      this.navigationService.visitedPokedex = false;
    }

  }

 
  constructor(public navigationService: NavigationService) {

    this.hash =  '#top';
    this.config = {
      anchors: ['top', 'features', 'info',],
      menu: '#menu',
      // fullpage callbacks
      afterResize: () => {
      },
      afterLoad: (origin, destination, direction) => {
      }
    };
  
  

  }

  ngOnInit(): void {

  }


  getRef(fullPageRef) {
    this.fullpage_api = fullPageRef;
  }
  
}
