import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-colapse-button',
  templateUrl: './colapse-button.component.html',
  styles: [`.form-control { width: 300px; }`]
})
export class ColapseButtonComponent {
  public model: any;

  @Input() options: any[];
  @Input() search: Function;
  @Input() title: string;

}
