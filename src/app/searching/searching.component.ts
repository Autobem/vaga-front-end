import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SearchingFectherService } from './searching-fetcher.service';
import { Observable, of } from 'rxjs';
import { Results, ApiList } from '../shared/models/api-list';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.scss']
})


export class SearchingComponent implements OnInit {

  ceil = Math.ceil;

  searchForm: FormGroup;

  itemPerPage: number;

  typeList: Observable<string[]>;
  resultList: Observable<Results[]>;

  pagination: Observable<ApiList> = this.service.getPagination();
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 650px)'])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private service: SearchingFectherService) { }

  ngOnInit(): void {
    this.typeList = this.service.fethTypes();
    this.resultList = this.service.pokemonList();
    this.searchForm = this.formBuilder.group({
      poketype: [''],
      pokename: [''],
    });
    this.itemPerPage = this.service.itemPerPage;
  }

  paginate(url) {
    this.resultList = this.service.pokeListPaginated(url);
  }

  search() {
    const poketype = this.searchForm.get('poketype').value;
    const pokename = this.searchForm.get('pokename').value;

    if (!!poketype && poketype.length > 0) {
      this.resultList = this.service.fetchByTypes(poketype);
    } else {
      if (!!pokename) {
        this.resultList = this.service.fetchByNameOrNumber(pokename);
      } else {
        this.resultList = this.service.pokemonList();
      }
    }
  }

}



