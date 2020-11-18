import {Component, Input} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-input-basic',
  templateUrl: './input-basic.component.html',
  styles: [`.form-control { width: 300px; }`]
})
export class InputBasicComponent {
  public model: any;

  @Input() search: Function;

}