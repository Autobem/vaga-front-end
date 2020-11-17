import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { PokemonDetails } from 'src/app/interface/pokemon';
import { ModalService } from 'src/app/services/modal.service';

import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {

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


