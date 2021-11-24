import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent implements OnInit {

  @Input()
  public pokemon:any

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
  }

  voltar():void {
    this.activeModal.close();
  }
}
