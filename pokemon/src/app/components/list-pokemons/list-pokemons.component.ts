import { Component, OnInit } from '@angular/core';
import { ListPokemonsService } from './service/list-pokemons.service';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ab-list-pokemons',
  templateUrl: './list-pokemons.component.html',
  styleUrls: ['./list-pokemons.component.css']
})
export class ListPokemonsComponent implements OnInit {

  pokemons: Array<any> = [];
  types: Array<any> = [];

  pagination: any = {
    totalItems: 0,
    itemsPerPage: 20,
    previous: null,
    current: 1,
    next: null
  };
  form: FormGroup;

  constructor(private service: ListPokemonsService, fb: FormBuilder) {
    this.pokemons = [];
    this.form = fb.group({
      name: ['', Validators.required],
      type: ['normal'],
      filter: ['all']
    })

    this.form.valueChanges.subscribe(r => {
      console.log(r)
    });
  }

  ngOnInit() {
    this.service.listTypes().subscribe(((result:any) => {
      this.types = result.results;
    }))
  }

  findAll(page) {
    console.log('Aguarde...');
    this.service.listAll(page).subscribe((data: any) => {
      this.pagination.totalItems = data.count;
      this.pagination.next = data.next;
      this.pagination.previous = data.previous;

      this.pokemons = [];
      data.results.map((p) => {
        this.service.findByUrl(p.url).subscribe(result => {
          this.pokemons.push(result);

          this.pokemons.sort(function(a,b) {
            return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
        });

        });
      });
    });
  }

  findByType() {
    console.log('Aguarde...');
    this.service.listByTypes(this.form.controls.type.value).subscribe((data: any) => {

      this.pokemons = [];
      data.pokemon.map((p) => {
        this.service.findByUrl(p.pokemon.url).subscribe(result => {
          this.pokemons.push(result);

          this.pokemons.sort(function(a,b) {
            return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
        });

        });
      });
    });
  }

  changePage(page, pageIncrement) {
    this.findAll(page);
    this.pagination.current += pageIncrement
  }

  

}
