import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-pokemon-modal',
  templateUrl: './pokemon-modal.component.html',
  styleUrls: ['./pokemon-modal.component.css']
})
export class PokemonModalComponent implements OnInit {

  constructor(
    public modal: ModalService, 
    private modalRef: BsModalRef
    ) { }

  ngOnInit(): void {
  }

  close() {
    this.modalRef.hide();
}

}


