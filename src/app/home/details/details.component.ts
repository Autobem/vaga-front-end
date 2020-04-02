import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';


import { ServiceService } from '../service.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  id: string;
  bool: boolean;

  constructor(
    private location: Location,
    private activateRoute: ActivatedRoute,
    private service: ServiceService
  ) { }

  ngOnInit(): void {
    this.activateRoute.paramMap
    .subscribe((params) => {
      const id = params.get('id');
      if ( id ) {
        this.id = id;
        this.bool = true;
        this.findPokemonById(this.id);
      }
    });
  }

  findPokemonById(id: string){
    /*this.service.findPokemonById(id)
      .subscribe(
        resp => {},
        error => {}
        )*/
  }

  goBack() {
    this.location.back();
  }

}
