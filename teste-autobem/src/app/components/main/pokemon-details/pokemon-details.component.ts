import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, mergeMap, tap } from 'rxjs/operators';
import { PokemonDetails } from 'src/app/interface/pokemon';
import { ModalService } from 'src/app/services/modal.service';

import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
@ViewChild('childModal', { static: false }) childModal: ModalDirective;



  pokemon: any = '';
  pokemonImg = '';
  pokemonType = [];

  constructor(
    public modal: ModalService, private modalRef: BsModalRef
    ) { }


  ngOnInit(): void {
  }

  close() {
    this.modalRef.hide();
}

}


