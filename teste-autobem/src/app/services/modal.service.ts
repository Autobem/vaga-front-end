import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PokemonModalComponent } from '../components/main/pokemon-modal/pokemon-modal.component';
import { PokemonDetails, Results } from '../interface/pokemon';
import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public isOpen: boolean = false;
  public pokemon = new Array<Results>();

  bsModalRef: BsModalRef;

  constructor(
    private pokemonService: PokemonService, 
    private ModalService: BsModalService) { 
    
  }

  openModal(pokemon: Results): void {
    this.pokemon = [];
    this.isOpen = true;
    this.pokemonService
      .getPokemonDetails(pokemon.name)
      .subscribe((details: PokemonDetails) => {
        pokemon.details = details;
       this.pokemon.push(pokemon)
       console.log(this.pokemon)
       this.bsModalRef = this.ModalService.show(PokemonModalComponent)
       this.bsModalRef.content.closeBtnName = 'Close';
      });
  }
}
