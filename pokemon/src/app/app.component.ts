import { Pokemon } from './pokemon.model';

import { PokemonService } from './pokemon.service';
import { Component, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //PAGINATION
  collectionSize;
  pageSize = 10;
  page = 1;
  //LISTA DE POKEMONS
  pokemons: Pokemon[] = [];
  pokemonForm: FormGroup;
  //MODAL
  pokemon: Pokemon;

  constructor(
    private pokemonService: PokemonService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  private buildForm() {
    this.pokemonForm = this.formBuilder.group({
      name: [null]
    });
  }

  private getAll() {
    this.pokemonService.getAll()
      .subscribe(
        (result) => {
          this.pokemons = [];
          result.forEach(e => {
            this.pokemonService.getByNameOrId(e.name)
              .subscribe(
                result => {
                  this.pokemons.push(result);
                  this.collectionSize = this.pokemons.length;
                }
              )
          })
        }
      );
  }

  /**
   * Faz a fuiltragem no array de pokemons
   * @param text
   */
  search(text: string) {
    if (text) {
      this.pokemons = this.pokemons.filter(pokemon => {
        const term = text.toLowerCase();
        return pokemon.name.toLowerCase().includes(term);
      });
      this.collectionSize = this.pokemons.length;
    } else {
      this.getAll();
    }

  }

  /**
   * Rotina do botão pesquisar da tabela
   */
  pesquisar() {
    this.search(this.pokemonForm.controls['name'].value)
  }

  ngOnInit() {
    this.buildForm();
    this.getAll();
  }

  closeResult = '';

  open(content, id) {
    this.pokemonService.getByNameOrId(id).subscribe(
      (result) => {
        this.pokemon = result;
        console.log(this.pokemon)
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }
    )

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
