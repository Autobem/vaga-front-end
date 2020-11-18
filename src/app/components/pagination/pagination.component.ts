import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {


  @Input() page: number;
  @Input() totalPages: number;
  @Input() PageChange: Function;
  @Output() pageChange = new EventEmitter<any>();


}
