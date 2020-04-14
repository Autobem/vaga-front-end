import { Component, OnInit} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { bounce } from '../_animations/landing.animation';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [
    bounce
  ]
})
export class LandingComponent implements OnInit {

  objectKeys = Object.keys;
  types = { fire: false, water: false, grass: false, electric: false };
  whosClicked = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 650px)'])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  }

  isHover() {
    for (const property in this.types) {
      if (this.types[property]) {
        return true;
      }
    }
    return false;
  }

  focus() {
    const btn: HTMLElement = document.querySelector('.btn-whos');
    btn.focus();
  }
}
