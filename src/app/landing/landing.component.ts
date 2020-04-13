import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  lightBg = false;
  pikachuHover = false;
  sqrtlHover = false;
  bulbaHover = false;
  charHover = false;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 650px)'])
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  }
}
